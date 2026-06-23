from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv
from urllib.parse import quote_plus

load_dotenv()

# SQL Server connection configuration
DB_SERVER = os.getenv("DB_SERVER", "localhost")
DB_NAME = os.getenv("DB_NAME", "CodeReviewDB")
DB_USERNAME = os.getenv("DB_USERNAME", "")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")

# Build connection string based on authentication type
if DB_USERNAME and DB_PASSWORD:
    # SQL Server Authentication
    encoded_password = quote_plus(DB_PASSWORD)
    encoded_username = quote_plus(DB_USERNAME)
    DATABASE_URL = (
        f"mssql+pyodbc://{encoded_username}:{encoded_password}@{DB_SERVER}/"
        f"{DB_NAME}?driver=ODBC+Driver+17+for+SQL+Server"
    )
else:
    # Windows Authentication (Trusted Connection)
    DATABASE_URL = (
        f"mssql+pyodbc://{DB_SERVER}/"
        f"{DB_NAME}?driver=ODBC+Driver+17+for+SQL+Server&Trusted_Connection=yes"
    )

# Create engine
engine = create_engine(
    DATABASE_URL,
    echo=True,  # Set to False in production
    pool_pre_ping=True,  # Verify connections before using
)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency for routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
