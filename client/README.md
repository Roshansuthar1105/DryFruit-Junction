
# 🍬 DryFruit Junction Admin Dashboard

A modern, responsive admin dashboard built with **React**, **Tailwind CSS**, and **Vite**, designed to manage users, orders, and contact submissions for the DryFruit Junction sweets e-commerce platform.

## 🚀 Features

- 👥 Manage Users (roles, permissions)
- 📦 Manage Orders (status updates)
- 💬 View & respond to Contact Submissions
- 🌈 Responsive UI with Tailwind and glassmorphism
- 🔒 Admin-only route protection

## 🛠️ Tech Stack

- React + Vite
- Tailwind CSS
- Lucide Icons
- Axios for API calls
- Context API (Auth, Cart, Favorites)

## 📁 Folder Structure

```
src/
│
├── components/         # Reusable components (Header, Sidebar, etc)
├── context/            # Auth, Cart, Favorites Context
├── pages/              # Admin pages like Dashboard, Users, Orders, Contacts
└── App.jsx             # Main app with routes
```

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/sweet-delights-admin.git
cd sweet-delights-admin
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

## 📦 Build

```bash
npm run build
```

## 🔐 Environment Variables

Create a `.env` file:

```
VITE_API_BASE_URL=https://your-backend-api.com
```

## 🧑‍💻 Admin Credentials

To access admin panel, log in with a user that has `"role": "admin"`.

## 📄 License

MIT

---

Crafted with 💖 by the DryFruit Junction Team
