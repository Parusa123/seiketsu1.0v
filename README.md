# 🧹 Seiketsu
## Smart Dustbin Locator & Reporting System

<p align="center">
  <i>Inspired by the Japanese principle of Seiketsu (清潔) — cleanliness, order, and consistency</i>
</p>

---

## 🌱 Main Goal

**Seiketsu** is a lightweight full-stack web application focused on improving public cleanliness by solving a practical usability problem.

Many people already want to dispose of waste properly, but often:
- public dustbins are hard to locate  
- bins are overflowing or damaged  
- there is no simple way to report the issue  

Seiketsu does not try to change behavior.  
Instead, it **reduces friction** by making the correct action easier and faster.

This project is intentionally designed as a **small, realistic, desk-scale system**, suitable for solo development, learning, and open-source contribution.

---

## 🎯 Project Goals

- 📍 Help users locate nearby public dustbins  
- 🗑️ Enable reporting of overflowing / missing / damaged bins  
- 📸 Capture image + location as proof  
- 🧩 Keep the system simple, fast, and practical  

---

## 🔲 High-Level System Block Diagram

```text
+-------------+        +-------------+        +--------------+
|   User      | -----> |  Frontend   | -----> |   Backend    |
| (Browser)   |        | (Web App)   |        | (Express.js) |
+-------------+        +-------------+        +--------------+
                                               |
                                               v
                                        +--------------+
                                        |   MongoDB    |
                                        | (Reports DB) |



Application Workflow:---------------------------


+-------------+
|   User      |
+-------------+
        |
        v
+--------------------+
| Open Web App       |
+--------------------+
        |
        v
+--------------------+
| Get User Location  |
| (Geolocation API)  |
+--------------------+
        |
        v
+--------------------+
| Show Nearby Bins   |
| on Map             |
+--------------------+
        |
        v
+--------------------+
| Report Bin Issue   |
| (Photo + Type)     |
+--------------------+
        |
        v
+--------------------+
| Backend API        |
| (POST /reports)   |
+--------------------+
        |
        v
+--------------------+
| MongoDB Storage    |
+--------------------+



🛠️ Technology Stack
Frontend

HTML, CSS, JavaScript

Map API (Google Maps / OpenStreetMap)

Backend

Node.js

Express.js

Database

MongoDB (Atlas)

Other Tools

REST APIs

Cloud image hosting (Cloudinary / Firebase Storage)



🧭 Development Roadmap
Phase 1 — Planning

Define MVP scope

Decide report data model

Choose map provider


Phase 2 — Frontend

Build minimal UI

Integrate map

Display static dustbin markers

Enable geolocation


Phase 3 — Backend

Setup Express server

Connect MongoDB

Create report schema

Build REST endpoints


Phase 4 — Integration

Connect frontend to backend

Submit reports from UI

Fetch reports and show markers


Phase 5 — Polish

Improve mobile responsiveness

Add loading & success states

UI and UX cleanup


Phase 6 — Deployment

Frontend → Netlify / GitHub Pages

Backend → Render / Railway

Database → MongoDB Atla
