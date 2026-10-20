"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

/**
 * Format Ethiopian Birr for chart tooltips.
 */
function formatETB(value) {
  return `ETB ${Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Custom tooltip for the revenue bar chart.
 */
function RevenueTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        background: "#1a1a2e",
        color: "#fff",
        padding: "10px 14px",
        borderRadius: "8px",
        fontSize: "0.85rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      <p style={{ fontWeight: 600, marginBottom: 4 }}>{label}</p>
      <p>{formatETB(payload[0].value)}</p>
    </div>
  );
}

/**
 * Custom tooltip for the orders-over-time line chart.
 */
function OrdersTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        background: "#1a1a2e",
        color: "#fff",
        padding: "10px 14px",
        borderRadius: "8px",
        fontSize: "0.85rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      <p style={{ fontWeight: 600, marginBottom: 4 }}>{label}</p>
      <p>
        {payload[0].value} order{payload[0].value !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

/**
 * RevenueChart — Client component receiving pre-aggregated data from the server.
 * Renders a bar chart (revenue by neighbourhood) and a line chart (orders over time).
 * Includes accessible data tables below each chart.
 */
export default function RevenueChart({ revenueData, ordersOverTime }) {
  // Determine date range for the heading
  const dateRange =
    ordersOverTime.length > 0
      ? `${ordersOverTime[0].date} to ${ordersOverTime[ordersOverTime.length - 1].date}`
      : "No data";

  return (
    <div className="dashboard-grid">
      {/* === Revenue by Neighbourhood — Bar Chart === */}
      <div className="card">
        <h2 className="card__title">
          <span className="card__title-icon" aria-hidden="true">
            📊
          </span>
          Revenue by Neighbourhood
        </h2>
        <div
          className="chart-container"
          role="img"
          aria-label="Bar chart showing total revenue in Ethiopian Birr for each neighbourhood"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={revenueData}
              margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="neighbourhood"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<RevenueTooltip />} />
              <Bar
                dataKey="revenue"
                fill="#e63946"
                radius={[6, 6, 0, 0]}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Accessible data table for revenue chart */}
        <details className="data-table-wrapper">
          <summary>View revenue data as a table</summary>
          <table className="data-table" aria-label="Revenue by neighbourhood">
            <thead>
              <tr>
                <th scope="col">Neighbourhood</th>
                <th scope="col">Revenue (ETB)</th>
              </tr>
            </thead>
            <tbody>
              {revenueData.map((row) => (
                <tr key={row.neighbourhood}>
                  <td>{row.neighbourhood}</td>
                  <td>{formatETB(row.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </div>

      {/* === Orders Over Time — Line Chart === */}
      <div className="card">
        <h2 className="card__title">
          <span className="card__title-icon" aria-hidden="true">
            📈
          </span>
          Orders Over Time
        </h2>
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--muted)",
            marginBottom: 12,
          }}
        >
          Number of orders per day · {dateRange}
        </p>
        <div
          className="chart-container"
          role="img"
          aria-label={`Line chart showing number of orders per day from ${dateRange}`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={ordersOverTime}
              margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<OrdersTooltip />} />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#2a9d8f"
                strokeWidth={3}
                dot={{ fill: "#2a9d8f", r: 5 }}
                activeDot={{ r: 7, fill: "#e63946" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Accessible data table for orders-over-time chart */}
        <details className="data-table-wrapper">
          <summary>View daily order data as a table</summary>
          <table className="data-table" aria-label="Orders per day">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Number of Orders</th>
              </tr>
            </thead>
            <tbody>
              {ordersOverTime.map((row) => (
                <tr key={row.date}>
                  <td>{row.date}</td>
                  <td>{row.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </div>
    </div>
  );
}
