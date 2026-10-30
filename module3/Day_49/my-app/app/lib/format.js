// lib/format.js

// 1. Currency Formatter (ETB Birr)[cite: 122]
export const etb = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

// 2. Date & Time Formatter (Africa/Addis_Ababa - EAT UTC+3)[cite: 123]
export const addisTime = new Intl.DateTimeFormat("en-ET", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Addis_Ababa", // EAT timezone[cite: 123]
});

// 3. Relative Time Formatter ("12 minutes ago")[cite: 123]
export const relativeTime = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
});