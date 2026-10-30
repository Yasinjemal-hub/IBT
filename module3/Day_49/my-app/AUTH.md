# Authentication & Security Model

## Protected Routes
- `/checkout`: Requires active `session_id` cookie. Redirects unauthenticated users to `/signin`.

## Security Layer Verifications
1. Signed-Out Writes: Blocked via API handler check (`status 401`).
2. Cross-User Writes: Blocked by checking token ownership (`status 403`).
3. Open Redirects: Sanitized to relative paths (`/`) only.