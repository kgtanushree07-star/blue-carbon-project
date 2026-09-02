import { useState } from "react";

function Evidence() {
  const [projectId, setProjectId] = useState("");
  const [evidenceType, setEvidenceType] = useState("project_document");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!projectId || !file) {
      setMessage("Please enter Project ID and select a file.");
      return;
    }

    const formData = new FormData();

    formData.append("project_id", projectId);
    formData.append("evidence_type", evidenceType);
    formData.append("description", description);
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/evidence/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(
          "Evidence uploaded successfully! ID: " + data.id
        );

        setProjectId("");
        setEvidenceType("project_document");
        setDescription("");
        setFile(null);
      } else {
        setMessage("Error: " + data.error);
      }
    } catch (error) {
      setMessage(
        "Backend connection failed. Make sure Flask is running."
      );
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <h1>📁 Project Evidence</h1>

      <p>Upload project photos and MRV documents.</p>

      <form onSubmit={handleUpload}>

        {/* Project ID */}
        <label>Project ID</label>
        <br />

        <input
          type="number"
          placeholder="Enter Project ID"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          required
        />

        <br />
        <br />

        {/* Evidence Type */}
        <label>Evidence Type</label>
        <br />

        <select
          value={evidenceType}
          onChange={(e) => setEvidenceType(e.target.value)}
          required
        >
          <option value="project_document">
            Project Document
          </option>

          <option value="biomass_survey">
            Biomass Survey
          </option>

          <option value="mangrove_photo">
            Mangrove Photo
          </option>

          <option value="mrv_report">
            MRV Report
          </option>
        </select>

        <br />
        <br />

        {/* Description */}
        <label>Description</label>
        <br />

        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />
        <br />

        {/* File */}
        <label>Choose File</label>
        <br />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <br />
        <br />

        <button type="submit">
          Upload Evidence
        </button>
      </form>

      {message && <h3>{message}</h3>}
    </div>
  );
}

export default Evidence;