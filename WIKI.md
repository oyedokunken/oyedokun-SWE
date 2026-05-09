# Wiki

## Architecture Overview

```
oyedokun.dev
├── frontend/   (Next.js 14 App Router)
└── backend/    (Express.js Serverless API)
```

### Frontend Routes
| Route | Description |
|---|---|
| `/` | Single-page portfolio (all sections) |

### Backend API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/contact` | Submits contact form, emails owner + user |
| POST | `/api/resume` | Requests resume, emails PDF to requester |

## Email Flow

### Contact Form
1. User fills form and submits
2. Backend validates with Zod
3. Owner receives email with user details
4. User receives acknowledgement email
5. Submission logged to `backend/data/contacts.json`

### Resume Request
1. User clicks "Request Resume" and provides email
2. Backend sends resume PDF as attachment
3. User receives email with PDF
4. Request logged to `backend/data/resume-requests.json`

## Theme System

CSS custom properties drive both light and dark modes. The `ThemeContext` exposes `theme` and `toggleTheme`. Dark is the default. `next-themes` handles SSR hydration.

## Animation System

All animations use Framer Motion. Scroll-driven effects use `useScroll` + `useTransform`. Entry animations use `whileInView` with viewport detection.

## Deployment Notes

Both sub-projects deploy independently on Vercel. Set environment variables in each Vercel project dashboard.
