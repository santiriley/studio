# **App Name**: Venture Scout

## Core Features:

- URL Ingestion and Metadata Extraction: Ingest company and news URLs, extract metadata like title, excerpt, and favicon.
- CSV Upload: Enable users to upload company and news data via CSV files.
- Deduplication and Clustering: Use RapidFuzz to cluster near-duplicate stories and identify canonical articles within a cluster.
- Company Scoring: Analyst-tunable scoring mechanism that computes a score per company based on various factors (recency, momentum, etc.)
- Kanban Workflow: Implement a Kanban-style workflow for analysts to track the progress of companies through various stages (New, Review, Contacted, etc.).
- Daily/Weekly Digests: Provide daily or weekly email digests summarizing new clusters and top-performing companies, as well as Slack/Email webhooks.
- AI-Powered Newsletter Summary: Use a tool to provide a short, AI-powered summary for each cluster to reduce the time required for a human to assess new investment opportunities.
- Bilingual Support: Switch locale between EN/ES. UI strings are located in /locales.
- Firestore integration: Persist the ingested information into a Firestore database.

## Style Guidelines:

- Primary color: A deep, sophisticated blue (#1C2F5A) to convey trust and professionalism, reminiscent of a serious financial institution.
- Background color: A very light, desaturated blue (#F0F4F9) for a clean and spacious feel.
- Accent color: A vibrant turquoise (#72D4D8), analogous to blue, but more saturated, used sparingly for highlighting key interactive elements.
- Headline font: 'Space Grotesk' sans-serif, to bring a tech-savvy and clean touch.
- Body font: 'Inter' sans-serif for readability, to ensure the long text required by analysts.
- Code font: 'Source Code Pro' for displaying code snippets or technical information.
- Use the Lucide icon set, maintaining a consistent and minimalist style.
- Spacious grid-based layout with rounded components, subtle shadows, and clear focus states to create a modern user interface.
- Subtle transitions and animations to provide a smooth user experience and highlight important interactions.