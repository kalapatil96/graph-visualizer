# Graph Visualizer Project

## Overview

This project displays a hierarchical tree using D3.js in a Vue 3 frontend, with data served from an Express backend. Users can click on nodes to view details and deselect them if needed.

## Tech Stack

Frontend: Vue 3, D3.js

Backend: Node.js, Express

Data: Neo4j database

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

1. Go to the backend folder:

   cd backend

2. Create `.env.local` file with the following variables:

    PORT=3000 # Node server port
    NEO4J_URI=bolt://localhost:7687 # Neo4j connection URI
    NEO4J_USERNAME=neo4j # Neo4j username
    NEO4J_PASSWORD=yourpassword # Neo4j password

3. Install dependencies:

    npm install

4. Start the server:

    node index.js
    or using nodemon:
    nodemon index.js

Server will run at: [http://localhost:3000](http://localhost:3000)
API endpoint: [http://localhost:3000/api/graph](http://localhost:3000/api/graph)

### Frontend

1. Go to the frontend folder:

    cd frontend

2. Create a `.env.local` file with the following variables:

    VITE_API_BASE_URL=http://localhost:3000/api # Base URL of the backend API

3. Install dependencies:

    npm install

4. Start the frontend:

    npm run dev

Frontend will run at the port shown in the terminal (usually [http://localhost:5173](http://localhost:5173))

## Using the App

Open the frontend URL in your browser.
The tree graph loads automatically from the backend.
Click on any node to see its details in the sidebar.
Click the deselect button to clear selection.

## Production Deployment

The app is hosted on Azure and can be accessed at:
https://graph-visualizer-demo-dpatezf7agbeg6hh.centralindia-01.azurewebsites.net

Note: The backend and frontend are served together. Neo4j database credentials are set via environment variables in Azure App Service and are not included in the repository.

## Notes

The data is read from Neo4j database.
Backend has CORS enabled for easy frontend fetching.
Code is structured to be readable and easy to extend.
Styling can be customized in frontend/src/components/Graph.vue.
