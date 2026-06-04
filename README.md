# Chokola Dessert Lounge

Premium Chokola Dessert Lounge landing page built with Next.js App Router, Tailwind CSS, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Contact API

The contact form posts JSON to:

```txt
POST /api/contact
```

Required fields:

- `name`
- `phone`
- `message`

Private provider keys must be server-only environment variables. See `.env.example`.

## Deployment

Ready for Vercel. Do not commit `node_modules`, `.next`, `dist`, or private `.env` files.
