# Frontend Deployment (Vercel)

## Prerequisites

- Vercel account at vercel.com
- Backend already deployed (you need its URL for `NEXT_PUBLIC_API_URL`)

---

## Step 1: Push to GitHub

Make sure your code is in a GitHub repository. Vercel connects directly to GitHub for auto-deploys.

---

## Step 2: Import Project on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select your repository
4. Set the **Root Directory** to `frontend`
5. Framework will be auto-detected as **Next.js**

---

## Step 3: Set Environment Variables

In the Vercel project settings, add the following environment variable:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_API_URL` | `https://your-backend.vercel.app` |

Replace `your-backend.vercel.app` with the actual URL of your deployed backend.

---

## Step 4: Deploy

Click **Deploy**. Vercel will install dependencies and build automatically.

Build command: `next build` (auto-detected)  
Output directory: `.next` (auto-detected)

---

## Step 5: Add Custom Domain

1. Go to your Vercel project settings
2. Navigate to **Domains**
3. Add `oyedokun.dev`
4. Follow the DNS instructions (add A and CNAME records at your registrar)

---

## Redeployment

Every push to the `main` branch triggers an automatic redeploy. No manual steps needed.

---

## Local Build Test

Before deploying, verify the build passes locally:

```bash
cd frontend
npm run build
```

All TypeScript errors must be resolved before Vercel will accept the deployment.
