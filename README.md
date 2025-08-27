# 🛍️ Mini E‑Commerce (React + Vite + Tailwind + Redux)

Frontend-only mini shop using the public **Fake Store API**. Polished with Tailwind, Redux Toolkit, routing, caching, and toast notifications.

## ✨ Features
- Product listing with **search** + **category filter**
- Product detail (image, price, rating) + **Add to Cart** (qty 1–5)
- Cart page with **qty 1–10**, remove, subtotals, and **grand total**
- Checkout with **validation** (name, email, address) + confirmation
- **localStorage caching** of products and cart
- **Redux Toolkit** for global state
- **react-hot-toast** notifications

## ▶️ Run locally
```bash
npm install
npm run dev
```
Then open the shown local URL (e.g., http://localhost:5173).

## 📦 Build
```bash
npm run build
npm run preview
```

## 🚀 Deploy
- **Vercel**: Import from Git repo, framework auto-detect (Vite), Deploy.
- **Netlify**: Build command: `vite build`, Publish dir: `dist`.
