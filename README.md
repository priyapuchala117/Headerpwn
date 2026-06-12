# Headerpwn - HTTP Security Header Analyzer & Fuzzer

Headerpwn is a modern, web-based tool designed to scan, analyze, and fuzz HTTP security headers for target URLs. It grades websites (from A+ to F) based on their security headers, provides detailed recommendations, visualizes security metrics using interactive charts, and allows exporting detailed PDF reports.

The project is structured with a **FastAPI backend** for high-performance header scanning and a **React frontend** powered by Material UI, Tailwind CSS, Recharts, and GSAP animations.

---

## 🚀 Features
- **Comprehensive Scans:** Analyzes critical security headers like CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and CORS.
- **Grading System:** Instantly evaluates security posture and assigns an overall grade.
- **Detailed Recommendations:** Provides descriptions, security risks, and suggested fixes for missing or misconfigured headers.
- **Interactive Dashboard:** Beautiful charts (Score Gauges, Risk Pies, and Trend Areas) showing history and status.
- **PDF Report Export:** Generates comprehensive PDF security reports.
- **Modern UI:** Supports smooth transitions, micro-animations, and Dark/Light theme modes.

---

## 📁 Project Directory Structure
```text
Headerpwn/
├── backend/                  # FastAPI backend service
│   ├── api/                  # API routers and endpoints
│   │   └── routes.py         # Main routes (scan, report, history)
│   ├── config/               # Configuration settings
│   ├── fuzzer/               # Header fuzzing logic
│   ├── reports/              # PDF generation utilities
│   ├── scanner/              # Header checking and grading rules
│   ├── main.py               # Backend server entrypoint
│   └── requirements.txt      # Python dependencies
├── src/                      # React frontend source
│   ├── components/           # UI Components (Dashboard, Charts, Navbar, Forms, etc.)
│   ├── theme.js              # Theme configurations (Light/Dark mode)
│   ├── App.js / App.css      # Core frontend files
│   └── index.js / index.css  # Frontend entrypoint and styles
├── public/                   # Frontend public static assets
├── package.json              # Node.js dependencies and scripts
├── tailwind.config.js        # Tailwind CSS styling configuration
└── README.md                 # Project documentation
```

---

## 🛠️ Local Development Setup

Follow these steps to run both the backend and frontend servers locally.

### 1. Prerequisites
- **Python** (version 3.8 or higher)
- **Node.js** (LTS version recommended)
- **npm** (comes packaged with Node.js)

### 2. Setup & Run the Backend
1. Open a terminal and navigate to the project root directory.
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - **Windows (CMD/PowerShell):**
     ```powershell
     venv\Scripts\activate
     ```
   - **macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```
4. Install python dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
5. Run the FastAPI development server:
   ```bash
   uvicorn backend.main:app --reload
   ```
   *The backend will now be running at `http://127.0.0.1:8000`.*

### 3. Setup & Run the Frontend
1. Open a new terminal in the project root directory.
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   *The frontend will open automatically in your browser at `http://localhost:3000`.*

---

## 🌐 Deployment Instructions

When preparing the application for production deployment, make sure to configure integration points between the frontend and backend.

### 1. Backend Deployment (FastAPI)
The backend can be deployed to platforms such as **Render**, **Railway**, **Heroku**, or any virtual server/container service (Docker).

- **Deployment Command:**
  ```bash
  uvicorn backend.main:app --host 0.0.0.0 --port $PORT
  ```
- **CORS Policy Configuration:**
  In `backend/main.py`, update the `CORSMiddleware` allowed origins to include your deployed frontend URL so the frontend can securely request scan data:
  ```python
  app.add_middleware(
      CORSMiddleware,
      allow_origins=["https://your-deployed-frontend-url.com"],
      allow_credentials=True,
      allow_methods=["*"],
      allow_headers=["*"],
  )
  ```

### 2. Frontend Deployment (React)
The frontend builds into standard static HTML/JS/CSS files, which can be deployed to static hosting providers like **Vercel**, **Netlify**, **GitHub Pages**, or **AWS S3**.

- **Build Command:**
  ```bash
  npm run build
  ```
- **Output Directory:** `build/` (upload the contents of this directory to your hosting provider)

### 3. Connecting Frontend to the Deployed Backend
The API URLs are currently defined in three files. When deploying, replace `http://localhost:8000` (or `http://127.0.0.1:8000`) with your live deployed backend URL:

1. **[HeaderForm.jsx](file:///d:/Headerpwn/New%20folder/New%20folder/src/components/HeaderForm.jsx#L9):**
   ```javascript
   const res = await fetch("https://your-deployed-backend.com/api/scan", {
   ```
2. **[ReportSection.jsx](file:///d:/Headerpwn/New%20folder/New%20folder/src/components/ReportSection.jsx#L59):**
   ```javascript
   const response = await fetch('https://your-deployed-backend.com/api/scan/report', {
   ```
3. **[HistoryPage.jsx](file:///d:/Headerpwn/New%20folder/New%20folder/src/components/HistoryPage.jsx#L47):**
   ```javascript
   const response = await fetch('https://your-deployed-backend.com/api/scan/report', {
   ```

*(Alternatively, you can modify these fetches to check `process.env.REACT_APP_API_URL` to toggle between production and development APIs dynamically).*
