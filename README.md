<div align="center">

<img src="public/favicon.svg" alt="MediSupply Logo" width="80" height="80" />

# 💊 MediSupply — Doctor Supplier Portal

**A premium, full-featured prescription management dashboard for medical suppliers.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_App-6366F1?style=for-the-badge)](https://fazilwithcruxi.github.io/doc_sup_app)
[![GitHub Pages](https://img.shields.io/badge/Deployed_on-GitHub_Pages-222?style=for-the-badge&logo=github)](https://fazilwithcruxi.github.io/doc_sup_app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vite.dev)

</div>

---

## 🌐 Live Demo

### 👉 [https://fazilwithcruxi.github.io/doc_sup_app](https://fazilwithcruxi.github.io/doc_sup_app)

> **Login with any Supplier ID and password** to explore the full dashboard.

---

## ✨ About

**MediSupply** is a sleek, dark-mode-first web portal built for **medical suppliers** to manage patient prescriptions efficiently. It bridges the gap between medical suppliers and patients — allowing suppliers to dispatch medication details, pricing, and dosage information that patients can directly access at checkout.

This app is part of a **full-stack healthcare ecosystem** including a patient-facing prescription app and a Node.js + PostgreSQL backend.

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🔐 **Secure Login** | Supplier authentication with a polished login screen |
| 📊 **Analytics Dashboard** | Live KPI cards (patients, revenue, prescriptions) + interactive area chart |
| 👥 **Patient Queue** | Browse, search, and manage all assigned patients |
| 💊 **Prescription Builder** | Detailed form to create and dispatch prescriptions |
| 📋 **Prescription Viewer** | Read-only view of completed prescription profiles |
| ✅ **Real-time State Updates** | Instant UI updates when prescriptions are submitted |
| 🌗 **Dark / Light Mode** | Smooth theme toggle across the entire application |
| 📱 **Responsive Layout** | Fully adaptive for widescreen and tablet viewports |
| 🎞️ **Smooth Animations** | Powered by Framer Motion for premium micro-interactions |

---

## 🖼️ Screenshots

<table>
  <tr>
    <td align="center"><b>Login Portal</b></td>
    <td align="center"><b>Analytics Dashboard</b></td>
  </tr>
  <tr>
    <td align="center"><i>Glassmorphic login card with supplier ID auth</i></td>
    <td align="center"><i>KPI cards + weekly prescription area chart</i></td>
  </tr>
  <tr>
    <td align="center"><b>Patient Queue</b></td>
    <td align="center"><b>Prescription Builder</b></td>
  </tr>
  <tr>
    <td align="center"><i>Split-view patient list with status badges</i></td>
    <td align="center"><i>Rich form with medicine, pricing & dosage fields</i></td>
  </tr>
</table>

---

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 8
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (custom design system)
- **Deployment**: GitHub Pages

---

## 📦 Getting Started

```bash
# Clone the repository
git clone https://github.com/Fazilwithcruxi/doc_sup_app.git
cd doc_sup_app

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🚢 Deploying to GitHub Pages

```bash
npm run deploy
```

This command will:
1. Build the production bundle via `tsc && vite build`
2. Push the `dist/` folder to the `gh-pages` branch automatically

---

## 🏗️ Project Structure

```
doc_sup_app/
├── public/
│   ├── favicon.svg          # App logo / icon
│   └── icons.svg
├── src/
│   ├── App.tsx              # Main application component
│   ├── index.css            # Global design system & styles
│   ├── main.tsx             # React entry point
│   └── assets/
├── vite.config.ts
└── package.json
```

---

## 🔗 Related Projects

| Project | Description |
|---|---|
| [doc_patient](https://github.com/Fazilwithcruxi) | Patient-facing prescription & payment app |
| [doc_backend](https://github.com/Fazilwithcruxi) | Node.js + PostgreSQL API backend |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/Fazilwithcruxi">Fazilwithcruxi</a>
</div>
