import psycopg2
import os

def get_connection():
    database_url = os.environ.get("DATABASE_URL")
    return psycopg2.connect(database_url)