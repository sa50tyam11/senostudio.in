# API Inventory

This document tracks all API endpoints in the SENO Studio application.

## Endpoint Details

| Method | Route | Purpose | Used By |
| --- | --- | --- | --- |
| `POST` | `/api/contact` | Receives contact form submissions, validates the payload, and triggers notification and confirmation emails using the Resend API. | Contact Page (`/contact`) |

### `POST /api/contact`
- **Input (JSON Payload)**:
  ```typescript
  {
    name: string;
    email: string;
    company?: string;
    service?: string;
    message: string;
    budget?: string;
    tier?: string;
  }
  ```
- **Output (JSON Response)**:
  - Success (200): `{ "ok": true }`
  - Error (400): `{ "ok": false, "error": "Invalid JSON body" }`
  - Error (400): `{ "ok": false, "error": "Name, email, and message are required." }`
  - Error (400): `{ "ok": false, "error": "Invalid email address." }`
  - Error (500): `{ "ok": false, "error": "Server configuration error." }`
  - Error (500): `{ "ok": false, "error": "Failed to send message..." }`
- **Dependencies**: `resend` (npm package), `RESEND_API_KEY` (Environment Variable).
- **Database Access**: None.
