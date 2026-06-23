# AI Code Review Frontend

React + Vite frontend for the AI-Powered Code Review Assistant.

## Tech Stack

- **React 18** with Vite for fast development
- **Tailwind CSS** for styling
- **Monaco Editor** - VS Code editor in browser
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization
- **Axios** - API calls
- **React Router** - Navigation

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will be available at http://localhost:5173

### 3. Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` directory.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── CodeEditor.jsx      # Monaco editor with file upload
│   │   ├── ReviewPanel.jsx     # Display review results
│   │   ├── IssueBadge.jsx      # Severity badges
│   │   └── DiffViewer.jsx      # (Future: Side-by-side diff)
│   ├── pages/
│   │   ├── Home.jsx            # Main review page
│   │   └── History.jsx         # Review history dashboard
│   ├── services/
│   │   └── api.js              # Axios API client
│   ├── App.jsx                 # Router setup
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Features

### ✅ Implemented

1. **Code Editor**
   - Monaco Editor with syntax highlighting
   - Support for 15+ languages
   - File upload (.js, .py, .java, etc.)
   - Paste from clipboard
   - Auto language detection from file extension

2. **AI Review Display**
   - Overall quality score (0-100)
   - Tabbed interface: Overview, Bugs, Security, Performance, Fixed Code
   - Issue severity badges (Critical/Warning/Info)
   - Copy fixed code to clipboard
   - Line number references

3. **Review History**
   - View all past reviews
   - Filter by programming language
   - Statistics dashboard
   - Score trend chart
   - Delete reviews
   - View review details in modal

4. **UI/UX**
   - Dark theme (VS Code inspired)
   - Purple accent color (#7C3AED)
   - Responsive split-panel layout
   - Loading states
   - Error handling

### 🚧 Future Enhancements

- Real-time streaming (SSE)
- Side-by-side diff viewer
- Export review as PDF
- Code comparison before/after
- Syntax highlighting in review panel
- User authentication
- Save favorite code snippets

## API Integration

The frontend connects to the FastAPI backend at `http://localhost:8000/api`

### Endpoints Used

- `POST /api/review` - Submit code for review
- `GET /api/history` - Get review history
- `GET /api/history/{id}` - Get specific review
- `DELETE /api/history/{id}` - Delete review
- `GET /api/stats` - Get statistics

## Environment Configuration

To change the API URL, edit `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
npm run build
vercel --prod
```

3. Set environment variable in Vercel dashboard:
   - `VITE_API_URL` = your backend URL (e.g., https://your-backend.railway.app/api)

### Alternative Platforms

- **Netlify**: `npm run build` then drag `dist` folder
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3 + CloudFront**: Upload `dist` folder

## Troubleshooting

**Monaco Editor not loading:**
- Clear browser cache
- Check console for CDN errors
- Ensure good internet connection

**API connection errors:**
- Verify backend is running on port 8000
- Check CORS settings in backend
- Verify API URL in api.js

**Build errors:**
- Delete `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Update Node.js to latest LTS version

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Minimum: ES2020 support required

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License - See LICENSE file for details
