# Backend Deployment (Vercel)

## Prerequisites

- Vercel account at vercel.com
- Gmail account with App Password enabled
- `resume.pdf` placed in the `backend/` root directory

---

## Step 1: Enable Gmail App Password

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled
3. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
4. Create a new App Password for "Mail"
5. Copy the 16-character password — this is your `SMTP_PASS`

---

## Step 2: Push to GitHub

Make sure your code is in a GitHub repository.

---

## Step 3: Import Project on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select your repository
4. Set the **Root Directory** to `backend`
5. Framework Preset: **Other**

---

## Step 4: Set Environment Variables

In the Vercel project settings under **Environment Variables**, add:

| Variable | Value |
|---|---|
| `PORT` | `4000` |
| `FRONTEND_URL` | `https://oyedokunken.vercel.app` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `oyedokunkehinde21@gmail.com` |
| `SMTP_PASS` | `gzeafihoeekcbyvs` |
| `OWNER_EMAIL` | `oyedokunken@gmail.com` |

---

## Step 5: Deploy

Click **Deploy**. Vercel will install dependencies and run `tsc` to compile TypeScript.

Build command: `npm run build` (runs `tsc`)  
Output: `dist/` directory

---

## Step 6: Note the Deployment URL

After deploy, copy the URL (e.g. `https://oyedokun-backend.vercel.app`).  
Set this as `NEXT_PUBLIC_API_URL` in your frontend Vercel project environment variables.

---

## Step 7: Update Frontend CORS Origin

Make sure the backend `.env` (and Vercel env vars) has:

```
FRONTEND_URL=https://oyedokunken.vercel.app
```

This controls which origin the Express CORS policy allows.

---

## Local Test

```bash
cd backend
npm run dev
# Runs on http://localhost:4000
```

Health check: `GET http://localhost:4000/health` returns `{ "status": "ok" }`

---

## Resume PDF

The file `backend/resume.pdf` is bundled into the Vercel deployment via `vercel.json` `includeFiles` config. Keep it in the `backend/` root. Replace it any time to update what gets emailed.
