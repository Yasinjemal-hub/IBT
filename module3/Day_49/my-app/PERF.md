# Performance Budget & Metrics

| Metric | Target | Deployed Value |
| :--- | :--- | :--- |
| LCP (Largest Contentful Paint) | < 2.5s | 1.2s |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.02 |
| INP (Interaction to Next Paint)| < 200ms | 45ms |

## Key Optimizations
- Converted Client components to Server components wherever possible.
- Used `generateStaticParams` to eliminate server response delay for dish pages.