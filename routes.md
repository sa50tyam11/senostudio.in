# Routes Table

This document outlines all the routes available in the SENO Studio Next.js (App Router) application.

## Frontend Routes

| Route | File | Purpose | Auth Required |
| --- | --- | --- | --- |
| `/` | `src/app/page.tsx` | Home Page - Landing page, hero, services overview, portfolio highlights. | No |
| `/about` | `src/app/about/page.tsx` | About Page - Agency philosophy, process, founder info. | No |
| `/work` | `src/app/work/page.tsx` | Work Page - Portfolio showcasing case studies and past projects. | No |
| `/services` | `src/app/services/page.tsx` | Services Page - Detailed breakdown of services and pricing tiers. | No |
| `/contact` | `src/app/contact/page.tsx` | Contact Page - Lead generation form for prospective clients. | No |

## API Routes

| Route | File | Purpose | Auth Required |
| --- | --- | --- | --- |
| `/api/contact` | `src/app/api/contact/route.ts` | Handles POST requests from the contact form to send emails via Resend. | No |

*Note: There are no dynamic, nested, or authenticated routes in the current implementation.*
