"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { etb } from "@/app/lib/format";

export default function RevenueChart({ data }) {
  return (
    // ResponsiveContainer requires a parent container with an explicit height[cite: 148]
    <div style={{ height: "300px", width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="area" />
          {/* YAxis domain ensures the axis starts strictly at 0[cite: 144] */}
          <YAxis domain={[0, "auto"]} tickFormatter={(v) => `ETB ${v}`} width={90} />
          <Tooltip formatter={(value) => [etb.format(value), "Revenue"]} />
          <Bar dataKey="revenue" fill="#1B4D8E" name="Revenue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}