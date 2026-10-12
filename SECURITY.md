# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Contact:** oyedokunken@gmail.com

Please do not open public GitHub issues for security vulnerabilities. Provide a description of the issue, steps to reproduce, and potential impact. You will receive a response within 48 hours.

## Security Practices

- SMTP credentials live in environment variables only. `.env` files are gitignored; use `backend/.env.example` as a template with placeholder values
- Rate limiting is applied to all API endpoints
- Input validation is enforced with Zod on both client and server
- User-supplied values are HTML-escaped before being placed in outgoing emails
- CORS is configured via the `FRONTEND_URL` environment variable
- Helmet.js security headers applied on all Express responses
- Contact and CV-request submissions (name, email, phone, message) may be written to `backend/data/*.json` when running locally. These files contain personal data, are gitignored, and are not persisted on Vercel's read-only filesystem
