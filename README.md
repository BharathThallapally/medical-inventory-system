# 💊 Medical Inventory Management System

A full-stack web application designed to simplify **medicine inventory management, stock monitoring, and expiry tracking**.

The application provides a centralized interface for managing medicines, monitoring stock levels, tracking expiry dates, and identifying inventory-related alerts in real time.

> 🚀 Built as a practical full-stack project to gain hands-on experience with **React, Node.js, Express.js, REST APIs, MySQL-compatible databases, and cloud deployment**.

---

## 🌐 Live Demo

### 🚀 Live Application
https://medical-inventory-frontend-xlw0.onrender.com

### ⚙️ Backend API
https://medical-inventory-system-cemq.onrender.com

### 💻 GitHub Repository
https://github.com/BharathThallapally/medical-inventory-system

---

## 📸 Project Overview

The Medical Inventory Management System provides a simple dashboard for managing medicines and monitoring important inventory information.

### Dashboard

The dashboard provides an overview of:

- 💊 Total medicines
- 📦 Low-stock medicines
- ⚠️ Medicines expiring soon
- 🚨 Expired medicines

### Medicine Inventory

Users can:

- Add medicines
- View medicines
- Search medicines
- Update medicine information
- Delete individual medicines
- Monitor medicine quantities
- Track batch numbers
- Track manufacturers
- Track categories
- Track dosage
- Track prices
- Track expiry dates

---

## ✨ Key Features

### 💊 Medicine Management

Complete CRUD functionality for medicine inventory.

- ➕ Add new medicines
- 👀 View all medicines
- 🔎 Search medicines
- ✏️ Update medicine information
- 🗑️ Delete individual medicines
- 📦 Track available quantity
- 🏷️ Track batch numbers
- 🏭 Track manufacturers
- 📂 Track medicine categories
- 💉 Track dosage information
- 💰 Track medicine prices
- 📅 Track expiry dates

---

### 📊 Inventory Dashboard

The dashboard provides a quick overview of inventory health.

| Metric | Description |
|---|---|
| 💊 Total Medicines | Total medicines available in inventory |
| 📦 Low Stock | Medicines with quantity at or below the low-stock threshold |
| ⚠️ Expiring Soon | Medicines approaching their expiry date |
| 🚨 Expired | Medicines that have already expired |

---

### 🔔 Inventory Alerts

The system automatically identifies important inventory conditions.

#### 🔴 Low Stock Alert

Highlights medicines with low available quantities.

#### 🟠 Expiring Soon Alert

Identifies medicines that are approaching their expiry date.

#### 🚨 Expired Alert

Identifies medicines that have already passed their expiry date.

---

### 🔍 Medicine Search

The inventory includes a search feature that allows users to quickly find medicines using:

- Medicine name
- Manufacturer
- Batch number
- Category

---

### 🛡️ Validation & Data Protection

The application includes backend validation to help maintain reliable inventory data.

- Required-field validation
- Quantity validation
- Price validation
- Unique batch-number protection
- Environment variables for configuration
- CORS protection
- Database-level operations using parameterized SQL queries

---

## 🛠️ Technology Stack

### Frontend

- ⚛️ React
- ⚡ Vite
- 🔗 Axios
- 🎨 CSS
- JavaScript

### Backend

- 🟢 Node.js
- 🚂 Express.js
- 🔗 REST API
- 🌐 CORS

### Database

- 🗄️ TiDB Cloud
- 🐬 MySQL-compatible SQL
- 🔌 MySQL2

### Development & Deployment

- 🐙 Git
- 🐙 GitHub
- 🚀 Render
- ☁️ TiDB Cloud

---

## 🏗️ System Architecture

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
