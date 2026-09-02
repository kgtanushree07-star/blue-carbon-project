import psycopg2

def get_connection():
    connection = psycopg2.connect(
        host="localhost",
        port="5432",
        database="blue_carbon_db",
        user="postgres"
    )

    return connection