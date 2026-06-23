# 🚀 AI-Powered Code Review Assistant

A full-stack web application that provides intelligent code reviews using Google Gemini AI (100% FREE!). Built as a portfolio project demonstrating modern web development, AI integration, and database management.

![Status](https://img.shields.io/badge/Status-Working-brightgreen)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)
![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB)
![AI](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-4285F4)
![Database](https://img.shields.io/badge/Database-SQL%20Server-CC2927)

---

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

- **🤖 AI-Powered Code Review** - Leverages Google Gemini 2.5 Flash for intelligent analysis
- **🐛 Bug Detection** - Identifies logical errors and potential issues
- **🔒 Security Analysis** - Detects vulnerabilities and security risks
- **⚡ Performance Optimization** - Suggests improvements for better performance
- **⭐ Quality Scoring** - Rates code quality from 0-100
- **✨ Auto-fix Suggestions** - Provides corrected code versions
- **📝 Monaco Editor** - VS Code-like editing experience in the browser
- **🌐 Multi-language Support** - Python, JavaScript, Java, C#, TypeScript, and more
- **📊 Review History** - Stores all reviews in SQL Server database
- **🎨 Dark/Light Theme** - Beautiful theme toggle with smooth transitions
- **💾 Persistent Preferences** - Remembers your theme choice
- **🎨 Modern UI** - Beautiful Tailwind CSS design with responsive layout

---

## 🚀 Quick Start

### Prerequisites
- Python 3.12+
- Node.js 18+
- SQL Server Express (or any SQL Server instance)
- Google Gemini API Key ([Get Free Key](https://aistudio.google.com/app/apikey))

### Installation

**1. Clone the repository**
```bash
git clone <your-repo-url>
cd code-review-assistant
```

**2. Setup Backend**
```bash
cd backend
pip install -r requirements.txt
```

**3. Configure Environment Variables**

Create `backend/.env`:
```env
# Google Gemini API (FREE!)
GEMINI_API_KEY=your_api_key_here

# SQL Server Configuration
DB_SERVER=your_server_name
DB_NAME=CodeReviewDB
DB_USERNAME=
DB_PASSWORD=
```

**4. Create Database**
- Open SQL Server Management Studio
- Connect to your SQL Server instance
- Run the script in `backend/create_database.sql`

**5. Setup Frontend**
```bash
cd frontend
npm install
```

### Running the Application

**Option 1: Using Batch Files (Windows)**
1. Double-click `start_backend.bat`
2. Double-click `start_frontend.bat`
3. Open http://localhost:5174

**Option 2: Manual Start**

Terminal 1 - Backend:
```bash
cd backend
python -m uvicorn main:app --reload
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Monaco Editor** - VS Code editor in browser
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Python 3.12** - Programming language
- **FastAPI** - High-performance web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **pyodbc** - SQL Server database driver
- **Uvicorn** - ASGI server
- **python-dotenv** - Environment variable management

### AI & Database
- **Google Gemini 2.5 Flash** - Free AI model for code analysis
- **SQL Server Express** - Database for review storage
- **Windows Authentication** - Secure database access

---

## 📁 Project Structure

```
project-root/
├── backend/
│   ├── main.py                 # FastAPI application entry point
│   ├── database.py             # Database connection and session
│   ├── create_database.sql     # Database schema
│   ├── models/
│   │   └── review_model.py     # SQLAlchemy models
│   ├── schemas/
│   │   └── review_schema.py    # Pydantic schemas
│   ├── services/
│   │   ├── gemini_service.py   # Google Gemini AI integration
│   │   └── code_parser.py      # Language detection & validation
│   ├── routes/
│   │   └── review.py           # API endpoints
│   ├── requirements.txt        # Python dependencies
│   └── .env                    # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CodeEditor.jsx  # Monaco editor component
│   │   │   ├── ReviewPanel.jsx # Review results display
│   │   │   └── IssueBadge.jsx  # Severity badges
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Main review page
│   │   │   └── History.jsx     # Review history page
│   │   ├── services/
│   │   │   └── api.js          # API client
│   │   ├── App.jsx             # Root component
│   │   └── main.jsx            # Entry point
│   ├── package.json            # Node dependencies
│   └── vite.config.js          # Vite configuration
│
├── start_backend.bat           # Windows batch file for backend
├── start_frontend.bat          # Windows batch file for frontend
└── README.md                   # This file
```

---

## ⚙️ Configuration

### Backend Configuration (`backend/.env`)

```env
# Google Gemini API Key (Get free key from https://aistudio.google.com)
GEMINI_API_KEY=your_gemini_api_key

# SQL Server Configuration
DB_SERVER=PRIYADHARSHINI\SQLEXPRESS    # Your SQL Server instance
DB_NAME=CodeReviewDB                    # Database name
DB_USERNAME=                            # Leave empty for Windows Auth
DB_PASSWORD=                            # Leave empty for Windows Auth
```

### Frontend Configuration

The frontend is configured to connect to `http://localhost:8000/api` by default. If your backend runs on a different port, update `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

---

## 📡 API Documentation

### Review Code Endpoint

**POST** `/api/review`

Request:
```json
{
  "code": "def add(a, b):\n    return a - b",
  "language": "python"
}
```

Response:
```json
{
  "bugs": [
    {
      "line": 2,
      "severity": "warning",
      "description": "Function named 'add' performs subtraction",
      "fix": "Change 'a - b' to 'a + b'"
    }
  ],
  "security": [],
  "performance": [],
  "quality": {
    "score": 70,
    "readability": "Good function naming but implementation doesn't match",
    "maintainability": "Simple function, easy to maintain"
  },
  "summary": "Function has a logical bug where operation doesn't match name",
  "fixed_code": "def add(a, b):\n    return a + b"
}
```

### Other Endpoints

- **GET** `/api/history` - Get review history
- **GET** `/api/history/{id}` - Get specific review
- **DELETE** `/api/history/{id}` - Delete review
- **GET** `/api/stats` - Get statistics

Full API documentation available at: http://localhost:8000/docs

---

## 🖼️ Screenshots

### Main Review Interface
```
┌─────────────────────────────────────────────────────┐
│  AI Code Review Assistant                           │
├─────────────────────┬───────────────────────────────┤
│                     │                               │
│  CODE EDITOR        │    REVIEW RESULTS             │
│  (Monaco)           │                               │
│                     │  🐛 Bugs: 3                   │
│  1  def add(a, b):  │  🔒 Security: 0               │
│  2    return a - b  │  ⚡ Performance: 1             │
│                     │  ⭐ Quality: 70/100           │
│  [Language: Python] │                               │
│                     │  Summary: Function has...     │
│  [Review Code]      │                               │
│                     │  [View Fixed Code]            │
└─────────────────────┴───────────────────────────────┘
```

---

## 🐛 Troubleshooting

### Backend won't start

**Error**: `ModuleNotFoundError: No module named 'fastapi'`

**Solution**:
```bash
cd backend
pip install -r requirements.txt
```

### Database connection error

**Error**: `Cannot connect to SQL Server`

**Solution**:
1. Verify SQL Server is running
2. Check server name in `.env` file
3. For Windows Auth, leave `DB_USERNAME` and `DB_PASSWORD` empty
4. Run `backend/create_database.sql` to create database

### Frontend won't start

**Error**: `npm ERR! missing script: dev`

**Solution**:
```bash
cd frontend
npm install
npm run dev
```

### Gemini API error

**Error**: `404 NOT_FOUND - model not found`

**Solution**:
- Ensure you're using `gemini-2.5-flash` in `backend/services/gemini_service.py`
- Verify your API key in `backend/.env`
- Check API key has Gemini access at https://aistudio.google.com

### CORS error

**Error**: `Access to fetch blocked by CORS policy`

**Solution**:
- Verify frontend URL in `backend/main.py` CORS configuration
- Ensure backend is running on port 8000
- Restart both backend and frontend

---

## 📝 Development

### Running Tests

Backend tests:
```bash
cd backend
python test_api_endpoint.py
```

### Adding New Languages

1. Update language detection in `backend/services/code_parser.py`
2. Add language to frontend dropdown in `frontend/src/pages/Home.jsx`
3. Update Monaco Editor language support

### Changing AI Model

To use a more powerful model, edit `backend/services/gemini_service.py`:

```python
# For faster responses (current)
model='gemini-2.5-flash'

# For more detailed analysis
model='gemini-2.5-pro'
```

---

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set build command: `cd frontend && npm run build`
4. Set output directory: `frontend/dist`

### Backend Deployment (Railway)
1. Push code to GitHub
2. Connect repository to Railway
3. Add environment variables in Railway dashboard
4. Set start command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`

### Database (Azure SQL)
1. Create Azure SQL Database (free tier available)
2. Update connection string in `.env`
3. Run migration scripts

---

## 📄 License

This project is created as a portfolio project for educational purposes.

---

## 👤 Author

**Your Name**
- Portfolio: [your-portfolio.com]
- GitHub: [@yourusername]
- LinkedIn: [Your LinkedIn]

---

## 🎉 Acknowledgments

- Google Gemini AI for providing free API access
- Monaco Editor for the excellent code editor
- FastAPI for the amazing Python framework
- Tailwind CSS for beautiful styling

---

## 📊 Project Status

✅ **Current Status**: Fully Operational

- [x] Backend API with FastAPI
- [x] Frontend UI with React
- [x] Google Gemini AI integration (FREE!)
- [x] SQL Server database
- [x] Code review functionality
- [x] History storage
- [x] Multi-language support
- [x] Quality scoring
- [x] Auto-fix suggestions
- [x] Dark/Light theme toggle
- [x] Documentation
- [ ] User authentication (future)
- [ ] Real-time streaming (future)
- [ ] File upload (future)
- [ ] Export reports (future)

---

**Built with ❤️ using React, FastAPI, and Google Gemini AI**

**Status**: ✅ Working | **Last Updated**: June 23, 2026
