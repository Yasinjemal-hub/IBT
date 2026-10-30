// lib/csv.js

// Safely escape cells[cite: 128]
function escapeCsvCell(value) {
  const str = String(value ?? "");
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`; // Double up quotes[cite: 128]
  }
  return str;
}

export function generateCsv(rows) {
  if (!rows || !rows.length) return "";
  const headers = Object.keys(rows[0]);
  const headerRow = headers.map(escapeCsvCell).join(",");
  const dataRows = rows.map((row) =>
    headers.map((field) => escapeCsvCell(row[field])).join(",")
  );
  return [headerRow, ...dataRows].join("\n");
}

export function downloadCsv(csvContent, filename = "addis-eats-export.csv") {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob); // Create browser object URL[cite: 129]
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url); // Release memory[cite: 129]
}