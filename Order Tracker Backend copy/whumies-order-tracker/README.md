# 📦 Whumies Order Tracker API

A secure and lightweight backend service to **track Shopify orders** using order number + customer verification (phone/email).

Built for **Whumies**, this API enables customers to easily check their order details, payment info, and tracking status.

---

## 🚀 Live Deployment

This application is deployed on **Railway**

📧 Deployment Account: **[whumiesstore@gmail.com](mailto:whumiesstore@gmail.com)**
📧 Live URL: **[https://whumies-order-tracker-production.up.railway.app/api/track-order](https://whumies-order-tracker-production.up.railway.app/api/track-order)**

---

## 🧠 Features

- 🔍 Track orders using:
  - Order Number (required)
  - Mobile Number OR Email (for verification)

- 🔐 Secure input validation & sanitization
- ⚡ Rate limiting to prevent abuse
- 🌐 Shopify GraphQL integration
- 📦 Fetch:
  - Order details
  - Products
  - Payment method
  - Shipping address
  - Tracking info

- 🛡️ Production-ready middleware (Helmet, CORS, Logging)

---

## 🏗️ Project Structure

```
whumies-order-tracker/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   └── utils/
├── package.json
└── .env
```

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- Shopify Admin GraphQL API
- Railway (Deployment)

---

## 🔑 Environment Variables

Create a `.env` file in the root:

```env
PORT=3000

SHOPIFY_SHOP=your-store-name
SHOPIFY_CLIENT_ID=your-client-id
SHOPIFY_CLIENT_SECRET=your-client-secret

SHOPIFY_API_VERSION=2026-04
ALLOWED_ORIGIN=https://your-frontend-domain.com
```

---

## 📡 API Endpoints

### 1. Health Check

```
GET /health
```

Response:

```json
{
  "ok": true
}
```

---

### 2. Track Order

```
POST /api/track-order
```

#### Request Body

```json
{
  "orderNumber": "#wh12345",
  "mobileNumber": "9876543210",
  "email": "optional@example.com"
}
```

> You must provide **either mobile number OR email**

---

#### Success Response

```json
{
  "success": true,
  "order": {
    "orderNumber": "wh12345",
    "customerEmail": "...",
    "customerPhone": "...",
    "customerAddress": {},
    "paymentMethod": "...",
    "totalAmount": {},
    "products": [],
    "tracking": [],
    "fulfillmentStatus": "...",
    "financialStatus": "..."
  }
}
```

---

#### Error Responses

```json
{
  "success": false,
  "message": "Invalid order number."
}
```

```json
{
  "success": false,
  "message": "No matching order found."
}
```

---

## 🛡️ Security Features

- Input sanitization (XSS-safe)
- Strict request validation
- Rate limiting (30 requests / 15 min)
- Helmet security headers
- Controlled CORS access

---

## 🔄 Shopify Integration

- Uses **GraphQL Admin API**
- Auth handled via **OAuth client credentials**
- Smart matching logic:
  - Exact order match preferred
  - Phone normalization (handles +91, etc.)
  - Email fallback verification

---

## 🧪 Testing Endpoints

### Test Token

```
GET /test-token
```

### Test Shopify Connection

```
GET /test-shopify
```

---

## 🧑‍💻 Local Development

### Install dependencies

```bash
npm install
```

### Run server

```bash
npm run dev
```

or

```bash
node src/server.js
```

---

## 📌 Notes

- Order number format: `wh12345`
- Automatically normalizes:
  - `#wh12345`
  - `WH12345`
  - `12345`

- Indian phone numbers are handled intelligently (`+91` stripped)

---

## ❤️ Built For

**Whumies** – Premium kids products brand
Helping customers track orders seamlessly ✨
