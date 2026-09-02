from flask import Flask, jsonify, request
from flask_cors import CORS
from database import get_connection
import os

app = Flask(__name__)
CORS(app)


# --------------------------------------------------
# HOME
# --------------------------------------------------

@app.route("/")
def home():
    return jsonify({
        "message": "Blue Carbon Registry Backend is running"
    })


# --------------------------------------------------
# CREATE REQUIRED EVIDENCE COLUMNS
# --------------------------------------------------

def setup_evidence_table():

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            ALTER TABLE evidence
            ADD COLUMN IF NOT EXISTS file_name VARCHAR(255)
        """)

        cursor.execute("""
            ALTER TABLE evidence
            ADD COLUMN IF NOT EXISTS file_type VARCHAR(100)
        """)

        cursor.execute("""
            ALTER TABLE evidence
            ADD COLUMN IF NOT EXISTS file_path TEXT
        """)

        conn.commit()

        cursor.close()
        conn.close()

        print("Evidence table checked successfully.")

    except Exception as error:
        print("Evidence table setup error:", error)


# --------------------------------------------------
# GET ALL PROJECTS
# --------------------------------------------------

@app.route("/api/projects", methods=["GET"])
def get_projects():

    try:

        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute("""
            SELECT *
            FROM projects
            ORDER BY id DESC
        """)

        projects = cursor.fetchall()

        cursor.close()
        connection.close()

        return jsonify(projects)

    except Exception as error:

        return jsonify({
            "error": str(error)
        }), 500


# --------------------------------------------------
# REGISTER PROJECT
# --------------------------------------------------

@app.route("/api/projects", methods=["POST"])
def create_project():

    try:

        data = request.json

        project_name = data["project_name"]
        location = data["location"]
        ecosystem_type = data["ecosystem_type"]
        area_hectares = data["area_hectares"]
        start_date = data["start_date"]
        status = data["status"]

        # Default owner
        owner = data.get("owner", "Admin")

        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute("""
            INSERT INTO projects
            (
                name,
                location,
                ecosystem,
                area,
                start_date,
                "owner",
                status
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (
            project_name,
            location,
            ecosystem_type,
            area_hectares,
            start_date,
            owner,
            status
        ))

        project_id = cursor.fetchone()[0]

        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({
            "message": "Project registered successfully!",
            "project_id": project_id
        }), 201

    except Exception as error:

        return jsonify({
            "error": str(error)
        }), 500


# --------------------------------------------------
# ADD MRV RECORD
# --------------------------------------------------

@app.route("/api/mrv", methods=["POST"])
def add_mrv():

    try:

        data = request.json

        conn = get_connection()
        cursor = conn.cursor()

        query = """
            INSERT INTO mrv_records
            (
                project_id,
                monitoring_date,
                measurement_method,
                mangrove_area,
                tree_count,
                average_tree_diameter,
                biomass,
                carbon_stock,
                co2_equivalent,
                verification_status
            )
            VALUES
            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """

        values = (
            data["project_id"],
            data["monitoring_date"],
            data["measurement_method"],
            data["mangrove_area"],
            data["tree_count"],
            data["average_tree_diameter"],
            data["biomass"],
            data["carbon_stock"],
            data["co2_equivalent"],
            data.get("verification_status", "Pending")
        )

        cursor.execute(query, values)

        mrv_id = cursor.fetchone()[0]

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message": "MRV record added successfully",
            "id": mrv_id
        }), 201

    except Exception as error:

        return jsonify({
            "error": str(error)
        }), 500


# --------------------------------------------------
# UPLOAD EVIDENCE
# --------------------------------------------------

@app.route("/api/evidence/upload", methods=["POST"])
def upload_evidence():

    try:
        project_id = request.form.get("project_id")
        evidence_type = request.form.get("evidence_type", "project_document")
        description = request.form.get("description", "")

        file = request.files.get("file")

        if not project_id:
            return jsonify({
                "error": "Project ID is required"
            }), 400

        if not file:
            return jsonify({
                "error": "File is required"
            }), 400

        # Create uploads folder
        upload_folder = "uploads"
        os.makedirs(upload_folder, exist_ok=True)

        # Save uploaded file
        file_path = os.path.join(
            upload_folder,
            file.filename
        )

        file.save(file_path)

        # Database connection
        conn = get_connection()
        cursor = conn.cursor()

        # Insert according to the actual evidence table columns
        cursor.execute("""
            INSERT INTO evidence
            (
                project_id,
                evidence_type,
                file_reference,
                description
            )
            VALUES (%s, %s, %s, %s)
            RETURNING id
        """, (
            project_id,
            evidence_type,
            file.filename,
            description
        ))

        evidence_id = cursor.fetchone()[0]

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message": "Evidence uploaded successfully",
            "id": evidence_id
        }), 201

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# --------------------------------------------------
# START BACKEND
# --------------------------------------------------

if __name__ == "__main__":

    # Check evidence table before starting server
    setup_evidence_table()

    app.run(
        debug=True,
        port=5000
    )
