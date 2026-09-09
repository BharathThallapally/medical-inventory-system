# 💊 Medical Inventory System

A full-stack web application for managing medicines, monitoring inventory levels, and identifying expiry-related alerts.

The system provides a simple interface for adding, updating, viewing, and managing medicines while automatically highlighting low-stock, expiring, and expired medicines.

## 🌐 Live Demo

**Live Application:**  
https://medical-inventory-frontend-xlw0.onrender.com

**Backend API:**  
https://medical-inventory-system-cemq.onrender.com

**GitHub Repository:**  
https://github.com/BharathThallapally/medical-inventory-system

---

## ✨ Features

### 💊 Medicine Management

- Add new medicines
- View all medicines
- Update medicine information
- Delete medicines
- Track medicine quantity
- Track batch numbers
- Track manufacturers
- Track categories
- Track dosage and price
- Track expiry dates

### 📊 Dashboard

The dashboard provides an overview of:

- Total medicines
- Expired medicines
- Medicines expiring within 30 days
- Low-stock medicines

### 🔔 Smart Reminders

The system identifies:

- Low-stock medicines
- Medicines expiring soon
- Already expired medicines

### 🔐 Data & Validation

- Required-field validation
- Quantity validation
- Price validation
- Unique batch-number protection
- Environment variables for sensitive configuration
- CORS protection for frontend/backend communication

---

## 🛠️ Tech Stack

### Frontend

- React
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
- MySQL-compatible SQL
- MySQL2

### Deployment

- GitHub
- Render
- TiDB Cloud

---

## 🏗️ Project Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │       + Vite        │
                    └──────────┬──────────┘
                               │
                         REST API / Axios
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Node.js + Express │
                    │      Backend API     │
                    └──────────┬──────────┘
                               │
                            mysql2
                               │
                               ▼
                    ┌─────────────────────┐
                    │     TiDB Cloud      │
                    │ MySQL-Compatible DB │
                    └─────────────────────┘
####
---

## 📁 Project Structure

```text
medical-inventory-system/
│
├── backend/
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
│   ├── public/
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
├── .env.example
├── .gitignore
└── README.md
