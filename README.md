# Product CRUD API

Node.js + Express + Sequelize + SQLite

## Local Setup

```bash
npm install
node seed.js    # populate with 5 sample products
npm start       # starts on http://localhost:3000
```

## Deploy to Render (free)

1. Push this repo to GitHub
2. Go to [dashboard.render.com](https://dashboard.render.com) → New → Web Service
3. Connect your GitHub repo
4. Render auto-detects `render.yaml` — or manually set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Click **Create Web Service**

Your API will be live at `https://your-app.onrender.com` in ~2 minutes.

> **Note:** SQLite data is ephemeral on Render's free tier (lost on restart). For persistent storage, switch to PostgreSQL.

## Endpoints

### GET all products
```bash
curl http://localhost:3000/api/products
```

### GET product by ID
```bash
curl http://localhost:3000/api/products/1
```

### POST create product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Coffee Mug","description":"Ceramic 12oz mug","price":12.99,"category":"Home"}'
```

### PUT update product
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":69.99}'
```

### DELETE product
```bash
curl -X DELETE http://localhost:3000/api/products/1
```
