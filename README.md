# Graph Visualizer Project

## Overview

This project displays a hierarchical tree using D3.js in a Vue 3 frontend, with data served from an Express backend. Users can click on nodes to view details and deselect them if needed.

## Tech Stack

Frontend: Vue 3, D3.js

Backend: Node.js, Express

Data: JSON file (data.json), which can later be replaced with MongoDB or another database

## Project Structure

graph-visualizer/
├─ backend/       # Express backend
│   ├─ controllers/
│   ├─ routes/
│   ├─ data.json
│   └─ index.js
└─ frontend/      # Vue frontend
├─ src/
│   ├─ components/
│   ├─ App.vue
│   └─ main.js
├─ public/
└─ vite.config.js

## How to Run

### Backend

Go to the backend folder:

cd backend

Install dependencies:

npm install

Start the server:

node index.js
or using nodemon:
nodemon index.js

Server will run at: [http://localhost:3000](http://localhost:3000)
API endpoint: [http://localhost:3000/api/graph](http://localhost:3000/api/graph)

### Frontend

Go to the frontend folder:

cd frontend

Install dependencies:

npm install

Start the frontend:

npm run dev

Frontend will run at the port shown in the terminal (usually [http://localhost:5173](http://localhost:5173))

## Using the App

Open the frontend URL in your browser.
The tree graph loads automatically from the backend.
Click on any node to see its details in the sidebar.
Click the deselect button to clear selection.

## Notes

Currently, the data is read from data.json, but it can later be replaced with a database.
Backend has CORS enabled for easy frontend fetching.
Code is structured to be readable and easy to extend.
Styling can be customized in frontend/src/components/Graph.vue.
