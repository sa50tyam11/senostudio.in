# Architecture Map

## Overview
The SENO Studio website is a statically generated and server-rendered Next.js (App Router) application. It is primarily a frontend application that serves as a portfolio and lead-generation tool for the agency. It relies on a single serverless API route to handle contact form submissions via a third-party email service (Resend).

## System Architecture

```text
User (Browser) 
  │
  ├──► [Frontend: Next.js App Router] ──► (Static Content from src/lib/content.ts)
  │      │
  │      ├──► UI Components (React, Tailwind CSS, Framer Motion, GSAP)
  │      └──► Pages (/, /about, /work, /services, /contact)
  │
  └──► [Backend: Next.js API Route] 
         │
         └──► POST /api/contact ──► [External Service: Resend API] ──► Emails (to Admin & User)
```

## Infrastructure & Hosting
- **Hosting**: Vercel (assumed based on Next.js and Vercel Edge configuration in tech stack).
- **Frontend**: Next.js 14 App Router.
- **Styling & Animation**: Tailwind CSS, Framer Motion, GSAP, Lenis (Smooth Scrolling).
- **Backend**: Next.js Serverless Functions (Route Handlers).
- **Database**: None. Content is managed via a local TypeScript file (`src/lib/content.ts`).
- **External Services**: Resend (Email Delivery).

## Data Flow (Contact Form)
1. **User Action**: Visitor fills out the form on `/contact`.
2. **Frontend Validation**: Basic validation on the client.
3. **API Request**: Client sends a POST request with JSON payload to `/api/contact`.
4. **Backend Validation**: Server validates payload structure and email regex.
5. **Business Logic**: Server initializes Resend client with `RESEND_API_KEY`.
6. **External API Call**: Server sends two emails:
   - Notification to `senowebstudio@gmail.com`.
   - Confirmation to the visitor's email.
7. **Response**: Server returns `{ ok: true }` to the client.
8. **UI Update**: Client displays a success message/state.
