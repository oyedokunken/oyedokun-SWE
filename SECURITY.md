# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Contact:** oyedokunken@gmail.com

Please do not open public GitHub issues for security vulnerabilities. Provide a description of the issue, steps to reproduce, and potential impact. You will receive a response within 48 hours.

## Security Practices

- SMTP credentials are stored in environment variables and never committed to source control
- Rate limiting is applied to all API endpoints
- Input validation is enforced with Zod on both client and server
- CORS is configured to allow only the trusted frontend origin
- Helmet.js security headers applied on all Express responses
- No database credentials are stored in the codebase; JSON log files contain no sensitive data
