# Sduella Opportunity Platform

The nested `community-fund` application is a Next.js 16, React and TypeScript project using the App Router for file-based routing. Its existing page designs and Home hero are preserved. Live job and funding results come from the FastAPI service in [`backend/`](backend/).

## Run locally

Prerequisites: Node.js 20.9+ and Python 3.11+.

```powershell
# Terminal 1 — frontend
npm install
npm run dev

# Terminal 2 — API
cd backend
.\.python\python.exe scripts\run_api.py --reload
```

Open:

- Frontend: `http://127.0.0.1:3000`
- API health: `http://127.0.0.1:8000/health`
- API logs: the terminal running Uvicorn, or `backend_server_out.log` and `backend_server_err.log` in this nested project when started by the background command used for local testing.

## Environment

Copy `.env.example` to `.env.local` for the frontend. The local defaults work without a frontend environment file.

```dotenv
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
NEXT_PUBLIC_SITE_URL=https://sduella.org
GOOGLE_SITE_VERIFICATION=
```

`NEXT_PUBLIC_SITE_URL` must be the final public origin because it is used for canonical URLs, XML sitemaps, structured data and feeds. Put provider credentials only in `backend/.env`; never use a `NEXT_PUBLIC_` variable for an API secret.

## SEO and AI discovery

Next.js server-renders the public route content and emits unique titles, descriptions, canonical URLs, Open Graph fields and visible FAQ content. The route tree includes query-focused pages for bursaries, scholarships, NSFAS alternatives, jobs, internships, learnerships, apprenticeships and startup funding.

Machine-readable endpoints:

- `/robots.txt` — permits ordinary search engines plus OAI-SearchBot, Claude-SearchBot and PerplexityBot; private account/application routes are excluded.
- `/sitemap.xml` — canonical public routes with accurate modification dates.
- `/feed.xml` — RSS discovery feed.
- `/llms.txt` and `/llms-full.txt` — concise and expanded AI-readable content maps with provenance and official-source links.
- `/opensearch.xml` — browser/search-client discovery description.
- `/manifest.webmanifest` — application identity and install metadata.

Public landing pages include visible, matching `CollectionPage`, `FAQPage` and `BreadcrumbList` JSON-LD. The root layout defines the Sduella `Organization` and `WebSite` entities. Do not add `JobPosting` markup to list pages; it belongs only on a dedicated, visible job-detail route.

AMP is intentionally not generated. Next.js 16 removed built-in AMP support, and Google applies the same ranking standards to AMP and non-AMP pages. The supported strategy here is static/server rendering, small client boundaries, optimized fonts and Core Web Vitals.

## Live data behaviour

- `/jobs`, `/internships`, `/learnerships` and `/apprenticeships` use the normalized jobs API.
- `/bursaries`, `/scholarships`, country/study-level routes and `/student-funding` use the normalized funding API.
- `/business-funding`, `/startup-funding` and `/business-grants` use the same live funding API in business mode.

Pages show loading, partial-provider, retry and empty-result states. The backend normalizes country, region, dates and currencies; removes expired records; verifies listing destinations; reads linked HTML and documents; and resolves a safe application or official instruction page before returning a record.

When Neon is configured, newly verified opportunities are inserted or updated in PostgreSQL and source outages fall back to saved verified results for the selected country. The account flow stores a minimal profile, saved interests, alert frequency and separate opportunity-email/marketing consent. Scheduled daily, weekly and monthly ingestion can email verified users only when their latest consent permits it. See the backend README and `backend/migrations/001_initial.sql` for setup and schema details.

The jobs page accepts any profession or employer as free text. Work arrangement is an optional multi-select (Remote and On-site / hybrid), and results can be sorted with branded controls for best match, newest, closing soon or listings with disclosed pay. Salary text retains the provider's currency and displays its ISO currency code where known; the app does not compare or silently convert mixed currencies.

See [`backend/README.md`](backend/README.md) for provider keys, endpoints and verification details.

## Production checks

```powershell
npm run lint
npm run build
npm start
```

After deployment, set the public site URL, add the sitemap to Google Search Console and Bing Webmaster Tools, and verify that the CDN/WAF allows the search crawlers listed in `robots.txt`.
# sduella-front-end
