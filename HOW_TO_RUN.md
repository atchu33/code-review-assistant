# 🚀 How to Run This Project

## Quick Start (Every Time You Want to Use the App)

### Option 1: Use the Batch Files (Easiest - Windows)

Just **double-click** these two files in order:

1. **`start_backend.bat`** - Starts the backend server
2. **`start_frontend.bat`** - Starts the frontend (if not already running)

Then open: **http://localhost:5174** in your browser

---

### Option 2: Manual Start (Works on All Platforms)

#### Step 1: Start Backend
```bash
# Open Terminal 1
cd backend
python -m uvicorn main:app --reload
```

Keep this terminal open!

#### Step 2: Start Frontend
```bash
# Open Terminal 2 (new terminal)
cd frontend
npm run dev
```

Keep this terminal open too!

#### Step 3: Open Browser
Go to: **http://localhost:5174**

---

## 📋 What You Need Running

For the app to work, you need **2 servers** running:

### ✅ Backend Server
- **Terminal:** Running `uvicorn main:app --reload`
- **Port:** 8000
- **URL:** http://localhost:8000
- **What it does:** Handles Claude AI requests and database

### ✅ Frontend Server  
- **Terminal:** Running `npm run dev`
- **Port:** 5174
- **URL:** http://localhost:5174
- **What it does:** Shows the web interface

---

## 🛑 How to Stop the Project

### To Stop Backend:
- Go to the backend terminal
- Press **Ctrl + C**

### To Stop Frontend:
- Go to the frontend terminal  
- Press **Ctrl + C**

---

## 🔄 How to Restart

If something goes wrong:

### Restart Backend:
```bash
cd backend
python -m uvicorn main:app --reload
```

### Restart Frontend:
```bash
cd frontend
npm run dev
```

---

## 📂 Project Structure

```
project/
├── backend/              # Python FastAPI server
│   ├── main.py          # Entry point
│   ├── .env             # Your API keys (keep secret!)
│   └── ...
├── frontend/            # React frontend
│   ├── src/
│   └── ...
├── start_backend.bat    # Quick start for backend
└── HOW_TO_RUN.md       # This file
```

---

## ✅ Checklist Before Running

Make sure you have:

- [ ] **Claude API key** in `backend/.env`
- [ ] **SQL Server** installed and running
- [ ] **Database created** (CodeReviewDB)
- [ ] **Python packages** installed (`pip install -r requirements.txt`)
- [ ] **Node packages** installed (`npm install` in frontend folder)

---

## 🐛 Troubleshooting

### Backend won't start?

**Error: "uvicorn not found"**
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

**Error: "Database connection failed"**
- Make sure SQL Server is running
- Check `backend/.env` has correct settings

**Error: "Invalid API key"**
- Check `backend/.env` has your Claude API key
- Get key from: https://console.anthropic.com

### Frontend won't start?

**Error: "npm not found"**
- Install Node.js from: https://nodejs.org

**Error: "Dependencies missing"**
```bash
cd frontend
npm install
npm run dev
```

### Frontend shows "Failed to review code"?

- Make sure **backend is running** on port 8000
- Check browser console (F12) for errors
- Verify both servers are running

---

## 💡 Pro Tips

### Check if servers are running:

**Backend:**
- Open: http://localhost:8000
- Should show: `{"message": "AI Code Review API", "status": "running"}`

**Frontend:**
- Open: http://localhost:5174
- Should show: Your app interface

### View API Documentation:
- Open: http://localhost:8000/docs
- Interactive Swagger docs for testing API

---

## 🎯 Daily Workflow

1. **Start the app:**
   ```bash
   # Terminal 1
   cd backend && python -m uvicorn main:app --reload
   
   # Terminal 2
   cd frontend && npm run dev
   ```

2. **Use the app:**
   - Open http://localhost:5174
   - Paste code
   - Click "Review Code"
   - View AI analysis

3. **When done:**
   - Press Ctrl+C in both terminals
   - Close browser tabs

---

## 🔧 Advanced Commands

### Restart just the backend:
```bash
# In backend terminal, press Ctrl+C, then:
python -m uvicorn main:app --reload
```

### Rebuild frontend:
```bash
cd frontend
npm run build
```

### Test backend API:
```bash
cd backend
python test_connection.py
```

### View backend logs:
- Already visible in the backend terminal
- Watch for errors and requests

---

## 📱 Access from Other Devices (Same Network)

### Find your IP address:

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" (e.g., 192.168.1.100)

**Mac/Linux:**
```bash
ifconfig
```

### Update frontend to use your IP:

Edit `frontend/src/services/api.js`:
```javascript
const API_BASE_URL = 'http://YOUR_IP:8000/api';
```

Then access from other devices:
```
http://YOUR_IP:5174
```

---

## 🚀 Production Deployment

When ready to deploy online:

### Frontend (Vercel - Free):
```bash
cd frontend
npm run build
vercel --prod
```

### Backend (Railway - Free Tier):
1. Push code to GitHub
2. Connect Railway to your repo
3. Add environment variables
4. Deploy automatically

### Database (Azure SQL - Free Tier):
- Create Azure SQL Database
- Update connection string in `.env`

---

## 📚 Important Files

### Must NOT commit to Git:
- `backend/.env` (has your API keys!)
- `node_modules/`
- `__pycache__/`

### Can safely commit:
- All `.py` files
- All `.jsx` files
- `package.json`
- `requirements.txt`

---

## ⚡ Quick Commands Reference

| Task | Command |
|------|---------|
| Start backend | `cd backend && python -m uvicorn main:app --reload` |
| Start frontend | `cd frontend && npm run dev` |
| Stop server | `Ctrl + C` |
| Test config | `cd backend && python test_connection.py` |
| Install backend deps | `cd backend && pip install -r requirements.txt` |
| Install frontend deps | `cd frontend && npm install` |
| View API docs | Open http://localhost:8000/docs |
| View app | Open http://localhost:5174 |

---

## 🎉 You're Ready!

Your AI Code Review Assistant is set up and ready to use!

**Need help?** Check these files:
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Complete setup
- [BACKEND_CONFIGURATION_GUIDE.md](BACKEND_CONFIGURATION_GUIDE.md) - Backend config
- [FINAL_CHECKLIST.md](FINAL_CHECKLIST.md) - Step-by-step checklist

---

**Happy Coding! 🚀**
