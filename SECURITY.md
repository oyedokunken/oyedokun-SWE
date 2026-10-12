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
- CORS is an explicit origin allowlist (`FRONTEND_URL` accepts a comma-separated list); there is no wildcard
- Helmet.js security headers applied on all Express responses
- Submissions are not stored by the server; they are only emailed
- Honeypot field, per-recipient hourly cap, 10 KB body limit and field length limits on both endpoints
- Frontend sends CSP, HSTS, X-Frame-Options, Permissions-Policy and Referrer-Policy headers
- CI runs typecheck, lint, `npm audit` and gitleaks secret scanning
