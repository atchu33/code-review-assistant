# AI Code Review Backend

FastAPI backend for the AI-Powered Code Review Assistant.

## Setup Instructions

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Set Up SQL Server Database

**Option A: Local SQL Server**
- Install SQL Server Express (free) from Microsoft
- Install SQL Server Management Studio (SSMS)
- Run the `create_database.sql` script in SSMS

**Option B: Azure SQL Database**
- Create a free Azure SQL Database
- Connect using Azure Data Studio
- Run the `create_database.sql` script

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
ANTHROPIC_API_KEY=sk-ant-xxxxx
DB_SERVER=localhost
DB_NAME=CodeReviewDB
DB_USERNAME=sa
DB_PASSWORD=YourStrong@Password
```

### 4. Verify ODBC Driver

Make sure you have the ODBC Driver installed:

**Windows:**
- Download from: https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server
- Install "ODBC Driver 17 for SQL Server"

**Linux:**
```bash
curl https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list | sudo tee /etc/apt/sources.list.d/mssql-release.list
sudo apt-get update
sudo ACCEPT_EULA=Y apt-get install -y msodbcsql17
```

**macOS:**
```bash
brew tap microsoft/mssql-release https://github.com/Microsoft/homebrew-mssql-release
brew update
brew install msodbcsql17
```

### 5. Run the Server

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- API: http://localhost:8000
- Docs: http://localhost:8000/docs
- Health: http://localhost:8000/health

## API Endpoints

### Review Code
- **POST** `/api/review` - Get complete code review
- **POST** `/api/review/stream` - Stream code review (SSE)

### History
- **GET** `/api/history` - Get review history (with pagination and filtering)
- **GET** `/api/history/{review_id}` - Get specific review
- **DELETE** `/api/history/{review_id}` - Delete review
- **GET** `/api/stats` - Get statistics

## Project Structure

```
backend/
├── main.py                 # FastAPI app entry point
├── database.py            # SQLAlchemy setup
├── routes/
│   ├── review.py          # Review endpoints
│   └── history.py         # History endpoints
├── services/
│   ├── ai_service.py      # Claude API integration
│   └── code_parser.py     # Language detection
├── models/
│   └── review_model.py    # SQLAlchemy models
├── schemas/
│   └── review_schema.py   # Pydantic schemas
└── requirements.txt       # Dependencies
```

## Testing

Test the API with curl:

```bash
# Health check
curl http://localhost:8000/health

# Review code
curl -X POST http://localhost:8000/api/review \
  -H "Content-Type: application/json" \
  -d '{
    "code": "def hello():\n    print(\"Hello World\")",
    "language": "python"
  }'

# Get history
curl http://localhost:8000/api/history
```

## Deployment

**Railway:**
1. Create a Railway account
2. Create a new project from GitHub repo
3. Add environment variables in Railway dashboard
4. Deploy automatically on push

## Troubleshooting

**Database Connection Issues:**
- Verify SQL Server is running
- Check firewall settings
- Test connection with SSMS/Azure Data Studio
- Verify ODBC driver is installed

**Claude API Errors:**
- Verify API key is valid
- Check API usage limits
- Ensure network connectivity

**Import Errors:**
- Make sure you're in the backend directory
- Verify all dependencies are installed
- Try: `pip install -r requirements.txt --upgrade`
