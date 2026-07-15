# Database Map

The SENO Studio application **does not use a database**. 

All content, portfolio items, services, and pricing tiers are statically defined within the codebase.

## Data Source
The single source of truth for the application's data is:
`src/lib/content.ts`

### Entities defined in `content.ts`:
- **ServiceCard**: Information about services offered.
- **ProcessStep**: Agency operational steps.
- **WhyCard**: Value propositions.
- **PricingTier** & **PricingFeature**: Service packages and their details.
- **TechCategory**: Technologies the agency uses.
- **CASE_STUDIES**: Portfolio projects (mocked database of past work).

## Future Recommendations
If the agency scales and requires a CMS (Content Management System) to update case studies or pricing without deploying code, migrating `content.ts` data to a headless CMS (like Sanity or Strapi) or a database (like Supabase or PostgreSQL) is recommended.
