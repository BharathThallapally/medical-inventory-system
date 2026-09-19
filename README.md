# 💊 Medical Inventory System

A full-stack web application for managing medicines, monitoring inventory levels, and identifying expiry-related issues.

The system provides a simple interface to add, view, update, search, and delete medicines while displaying inventory statistics and alerts for low-stock, expiring, and expired medicines.

---

## 🌐 Live Demo

### 🚀 Live Application

https://medical-inventory-frontend-xlw0.onrender.com

### ⚙️ Backend API

https://medical-inventory-system-cemq.onrender.com

### 💻 GitHub Repository

https://github.com/BharathThallapally/medical-inventory-system

---

## ✨ Features

### 💊 Medicine Management

The application supports complete medicine management functionality:

- ➕ Add medicines
- 👀 View medicines
- ✏️ Update medicine details
- 🗑️ Delete individual medicines
- 🔎 Search medicines
- Track medicine name
- Track manufacturer
- Track batch number
- Track category
- Track dosage
- Track price
- Track quantity
- Track expiry date

---

### 📊 Dashboard

The dashboard provides an overview of the current medicine inventory.

It displays:

- 💊 Total medicines
- 📦 Low-stock medicines
- ⚠️ Medicines expiring soon
- 🚨 Expired medicines

---

### 🔔 Inventory Alerts

The system identifies important inventory conditions and displays alerts.

#### 🔴 Low Stock

Medicines with a quantity of **10 or fewer units** are identified as low stock.

#### 🟠 Expiring Soon

Medicines that are going to expire within **30 days** are displayed as expiring soon.

#### 🚨 Expired

Medicines whose expiry date has passed are displayed as expired.

#### ✅ No Alerts

When there are no low-stock, expiring, or expired medicines, the system displays a no-alert message.

---

### 🔎 Search

Medicines can be searched using:

- Medicine name
- Manufacturer
- Batch number
- Category

---

### 🛡️ Data Validation

The backend validates medicine information before performing database operations.

The system includes validation for:

- Medicine information
- Quantity
- Price
- Batch number
- Medicine ID

Invalid medicine IDs are rejected during delete operations, and the system returns appropriate error responses when a medicine cannot be found.

---

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript
- Vite
- Axios
- CSS

### Backend

- Node.js
- Express.js
- REST API
- CORS

### Database

- TiDB Cloud
- MySQL-compatible database
- MySQL2

### Development & Deployment

- Git
- GitHub
- Render
- TiDB Cloud

---

## 🏗️ Project Architecture

```text
                    ┌─────────────────────┐
                    │        User         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │       + Vite        │
                    └──────────┬──────────┘
                               │
                         Axios / REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Node.js + Express │
                    │      Backend API    │
                    └──────────┬──────────┘
                               │
                             mysql2
                               │
                               ▼
                    ┌─────────────────────┐
                    │     TiDB Cloud      │
                    │ MySQL-Compatible DB │
                    └─────────────────────┘
📂Project Structure
medical-inventory-system/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── dashboardController.js
│   │   ├── medicineController.js
│   │   └── reminderController.js
│   │
│   ├── database/
│   │   └── init.js
│   │
│   ├── routes/
│   │   ├── dashboardRoutes.js
│   │   ├── medicineRoutes.js
│   │   └── reminderRoutes.js
│   │
│   ├── server.js
│   ├── testConnection.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── AddMedicine.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── api.js
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── docs/
│
├── .env.example
├── .gitignore
└── README.md

What I Learned

Through this project, I gained practical experience in:

Building React applications

Managing React state

Using React components

Integrating frontend with REST APIs

Using Axios for API requests

Building Express.js APIs

Implementing CRUD operations

Working with SQL databases

Connecting Node.js with MySQL-compatible databases

Handling asynchronous operations

Implementing frontend and backend validation

Handling API errors

Using environment variables

Using Git and GitHub

Deploying applications using Render

Connecting a deployed frontend with a deployed backend

Most importantly, this project hel ped me understand how the different layers of a full-stack application work together:
Frontend
   ↓
REST API
   ↓
Backend
   ↓
Database
   ↓
Backend Response
   ↓
Frontend Update

🧑‍💻Developer

Bharath Thallapally

B.Tech - Computer Science and Engineering

This project was developed as part of my hands-on learning journey in full-stack web development.

🔗Project Links

🌐Live Application:

https://medical-inventory-frontend-xlwO.onrender.com

Backend API:

https://medical-inventory-system-cemq.onrender.com

💻GitHub Repository:

https://github.com/BharathThallapally/medical

-inventory-system 7

Repository

If you find this project useful, feel free to explore the re pository and follow my development journey.