# 🚀 Graph-Based Job Recommendation System

An intelligent, full-stack recommendation engine designed to bridge the gap between candidates and relevant career opportunities using graph data modeling. By analyzing complex relationships between user profiles, skills, and job requirements, the system delivers precise and context-aware job matches.

---

## 📌 Key Highlights

- **Graph-Powered Matching:** Represents candidates, skill sets, and job postings as interconnected nodes, unlocking high-relevance semantic matches beyond simple keyword filtering.
- **Full-Stack Architecture:** Built with a decoupled frontend and backend for high maintainability and scalability.
- **Interactive UI:** Fast, reactive user interface with authentication and dashboard routing.
- **Configurable Environments:** Secure credential management using environment variables.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Vite, Modern CSS3 |
| **Backend** | Node.js, Express.js (REST API) |
| **Database** | Graph Database (CognoDB / Bolt Protocol) |
| **Version Control** | Git, GitHub |

---

## 📁 Repository Structure

```text
Job-Recommendation/
├── job-reco-frontend/      # React + Vite client-side application
│   ├── src/
│   │   ├── components/    # Reusable UI views (LoginPage, Dashboards)
│   │   ├── main.jsx       # App bootstrap & routing
│   │   └── index.css      # Core styles & layout rules
│   ├── package.json
│   └── vite.config.js
├── job-reco-backend/       # Express API & graph query engine
│   ├── server.js          # Server entrypoint & route handlers
│   ├── package.json
│   └── .env.example       # Template for environment keys
└── README.md



#Quickstart Guide

1. Clone the Repository
```git clone [https://github.com/AdilMishbah/Job-Recommendation.git](https://github.com/AdilMishbah/Job-Recommendation.git)
    cd Job-Recommendation


2. Backend Setup
Navigate into the backend directory and install dependencies:
```cd job-reco-backend
   npm install

```cp .env.example .env
Ensure your .env contains the required keys:

Code snippet
```PORT=5000
   FRONTEND_ORIGIN=http://localhost:5173
   COGNODB_URL=bolt+s://<your-database-host>
   COGNODB_USER=<your-username>
   COGNODB_PASSWORD=<your-password>

Start the backend server:

npm start


3. Frontend Setup
Open a new terminal tab, navigate to the frontend directory, and run the development server:
```cd job-reco-frontend
npm install
npm run dev


Open your browser and navigate to:
```http://localhost:5173


👨‍💻 Author
**Adil Mishbah**

GitHub: @AdilMishbah
