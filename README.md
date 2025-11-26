NASA APOD Explorer

This project is a full-stack application that fetches NASA's Astronomy Picture of the Day (APOD) using a custom-built backend service and displays it through a responsive frontend UI.

It includes:

1. A REST-compliant backend with caching

2. A React-based frontend for viewing APOD images

3. Secure handling of API keys

4. Local development support for both backend and frontend

Backend Features : -

1. Fetches APOD data from NASA API

2. In-memory caching with TTL + max size

3. Secure .env environment variable loading

4. RESTful endpoints:

     GET /api/apod/today

     GET /api/apod/:date

     GET /api/apod?start=YYYY-MM-DD&end=YYYY-MM-DD

     GET /api/apod?count=N

5. Centralized error handler

6. Runs locally via Node.js

Backend Setup
cd backend
npm install

Create a .env file:
NASA_API_KEY=YOUR_KEY
PORT=5000
CACHE_TTL=3600
CACHE_SIZE=100

Start backend:
npm start

Frontend Features : - 

1. View today's APOD

2. Search APOD by date

3. View a range of APODs

4. Browse recent images

5. Responsive UI

Frontend Setup
cd frontend
npm install
npm run dev

Set API root (optional) in .env:
VITE_API_ROOT=http://localhost:5000/api/apod

Running Full Project : - 
Open two terminals:

Terminal 1 (Backend):
cd backend
npm start

Terminal 2 (Frontend):
cd frontend
npm run dev

Visit:
http://localhost:5173
