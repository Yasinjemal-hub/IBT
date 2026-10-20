"use client";

/**
 * Error boundary for the dashboard route.
 * Displays a user-friendly error message with a retry action.
 */
export default function DashboardError({ error, reset }) {
  return (
    <div className="error-state" role="alert">
      <div className="error-state__icon" aria-hidden="true">
        ⚠️
      </div>
      <h2 className="error-state__title">Something went wrong</h2>
      <p className="error-state__text">
        {error?.message ||
          "We could not load the dashboard data. This might be a temporary issue."}
      </p>
      <button onClick={reset} className="error-state__btn">
        🔄 Try Again
      </button>
    </div>
  );
}
