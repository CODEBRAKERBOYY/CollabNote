# 📝 Collab Note – Real-Time Collaborative Notes App

A full-stack **real-time collaborative notes application** built with **React**, **Node.js**, and **Socket.io**.  
The app allows multiple users to edit notes simultaneously, with automatic synchronization, Markdown support, and secure authentication.

---

## 💡 Project Overview

**Collab Note** enables users to create, edit, and share notes in real-time — ideal for teams, students, or developers.  
The system uses **WebSocket** communication to sync updates across all connected clients instantly, while **JWT-based authentication** ensures secure access.

Although not yet deployed, the entire system has been **successfully tested via Postman** and **local environment APIs**.

---

## 🔧 Key Features

- ⚙️ **Real-Time Collaboration:**  
  Multiple users can edit the same note simultaneously via **Socket.io** (<200ms latency).

- 🔐 **Authentication & Authorization:**  
  Secure **JWT-based login system** with role-based access and permissions.

- 💾 **RESTful API Backend:**  
  Built with **Express.js** and **MongoDB**, tested locally through **Postman**.

- 📝 **Rich Text & Markdown Support:**  
  Supports Markdown rendering and auto-save functionality.

- 🧱 **Scalable Architecture:**  
  Modular backend with clean routes, controllers, and models for easy deployment.

---

## 🧠 Tech Stack

| Layer | Technologies Used |
|-------|--------------------|
| **Frontend** | React, Vite, React Router |
| **Backend** | Node.js, Express.js, Socket.io |
| **Database** | MongoDB (Mongoose ORM) |
| **Auth** | JSON Web Tokens (JWT) |
| **Testing** | Postman, Jest (optional) |

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/CODEBRAKERBOYY/CollabNote.git
cd CollabNote
```

### Install-Dependencies
```bash
cd server
npm install
```
### Frontend
```bash
cd ../client
npm install
```
### Run the App
```bash
cd server
npm start
```
### Start frontend
```bash
cd ../client
npm run dev
```

 ### API Testing (Postman)
```bash
POST /api/auth/register
POST /api/auth/login
GET /api/notes
POST /api/notes
PUT /api/notes/:id
DELETE /api/notes/:id
```
### Folder Structure
```bash
CollabNote/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   │   ├── Note.js
│   │   └── User.js
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── .env
│
├── collabnote-frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```
##  Future Enhancements

- Deploy on **Render** or **Vercel** for live collaboration 🌍  
- Add **Google OAuth** login for secure authentication 🔐  
- Implement **offline editing** & **autosave** 📝  
- Integrate **version history** for collaborative notes 📚  










