# TicketWeb Frontend (React + Vite, JavaScript)

This is the customer-facing frontend for the Django backend located at `webapi/`. It consumes the REST endpoints under `/api`.

## Tech stack
- React 18 + Vite
- JavaScript (no TypeScript)
- Material UI (MUI)
- React Router v6
- Axios

## Available pages
- Home: lists events from `GET /api/events/`
- Event Detail: shows event details and lets user select quantities
- Auth: Login (`POST /api/login/`), Register (`POST /api/register/`)
- Checkout: creates order (`POST /api/orders/create/`) and calls payment (`POST /api/orders/:id/process_payment/`)

## Run locally
```bash
cd frontend/react-app
npm install
npm run dev
```
The app will run on `http://localhost:5173` by default. Ensure your Django server is running and serving the API at `/api` (see `webapi/urls.py`). If CORS is needed, configure it on Django or set up a proxy in Vite.

## Build
```bash
npm run build
npm run preview
```

## Configure base API URL
By default, the Axios client uses `baseURL: '/api'`. If your backend runs elsewhere, modify `src/api/client.js`.
