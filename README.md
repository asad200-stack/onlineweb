# 🛒 Professional E-commerce System

نظام متجر إلكتروني احترافي مع لوحة تحكم إدارية كاملة.

## 🚀 Quick Deploy on Railway

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for Railway"
git push
```

### Step 2: Create Railway Project
1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository

### Step 3: Configure Settings
- **Settings → Builder:** Set to `NIXPACKS` (not Docker!)
- **Variables → New Variable:**
  ```
  NODE_ENV = production
  ```

### Step 4: Wait for Build
Railway will automatically:
- Install dependencies
- Build the client
- Start the server

### Step 5: Get Your Link
- Settings → Domains → Generate Domain

---

## 🔑 Admin Login

- **URL:** `/admin/login`
- **Username:** `web`
- **Password:** `web12345`

⚠️ Change password after first login!

---

## ✨ Features

- ✅ Modern UI (Ishtari-style)
- ✅ Product Management
- ✅ Shopping Cart
- ✅ Wishlist
- ✅ Search & Filters
- ✅ Multi-language (AR/EN)
- ✅ Admin Dashboard
- ✅ WhatsApp Integration
- ✅ Product Carousel
- ✅ SEO Optimized

---

## 📁 Project Structure

```
├── client/          # React Frontend
├── server/          # Express Backend
├── railway.json     # Railway config
└── package.json     # Root dependencies
```

---

## 🛠️ Local Development

```bash
# Install all dependencies
npm run install-all

# Run development server
npm run dev
```

Server: `http://localhost:5000`
Client: `http://localhost:3000`

---

## 📝 Requirements

- Node.js 18+
- npm

---

## 📄 License

MIT

---

## 🎉 Ready to Deploy!

Your project is ready for Railway deployment! 🚀

