# Data Fetching & Rendering Strategy

| Route | Strategy | Reasoning |
| :--- | :--- | :--- |
| `/` | Static (SSG) | Landing page content does not change frequently. |
| `/menu` | Incremental (ISR - 3600s) | Menu prices change occasionally; revalidated hourly. |
| `/menu/[id]` | Static (`generateStaticParams`) | Pre-builds HTML for all dish IDs at build time. |
| `/checkout` | Dynamic (SSR) | User-specific session data and live order processing. |