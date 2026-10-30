"use client";

import { useEffect, useState } from "react";
import MapPanel from "./MapPanel";
import { addisTime } from "@/app/lib/format";

export default function OrderTrackingPage({ params }) {
  const [liveData, setLiveData] = useState({
    status: "Connecting...",
    lat: 8.9950,
    lng: 38.7896,
    eta: "Calculating...",
  });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // 1. Establish SSE Connection[cite: 119]
    const eventSource = new EventSource(`/api/orders/${params.id}/stream`);

    eventSource.onopen = () => setIsConnected(true);

    eventSource.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      setLiveData(parsed);
    };

    eventSource.onerror = () => {
      setIsConnected(false);
      eventSource.close(); // Prevent ghost connection leaks[cite: 119, 120]
    };

    // 2. Clean up connection on unmount[cite: 119]
    return () => eventSource.close();
  }, [params.id]);

  const BOLE_RESTAURANT = [8.9950, 38.7896];
  const COURIER_POS = [liveData.lat, liveData.lng];

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h1>Order Tracking: {params.id}</h1>
        {/* Connection Indicator[cite: 120] */}
        <span style={{ padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold", background: isConnected ? "#e8f5e9" : "#ffebee", color: isConnected ? "#2e7d32" : "#c62828" }}>
          {isConnected ? "● Live Updating" : "○ Reconnecting..."}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        <div style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px" }}>
          <h3>Delivery Status</h3>
          <p style={{ fontSize: "20px", fontWeight: "bold", color: "#d32f2f" }}>{liveData.status}</p>
          <p>Estimated Arrival: <strong>{liveData.eta}</strong></p>
          <p style={{ color: "#666", fontSize: "12px" }}>Updated at: {addisTime.format(new Date())}</p>
        </div>

        {/* Text Equivalent for Accessibility[cite: 115] */}
        <div style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px" }}>
          <h3>Delivery Address (Text Format)</h3>
          <p><strong>Customer:</strong> Abebe Bikila</p>
          <p><strong>Destination:</strong> Bole Road, House #402, Addis Ababa</p>
          <p style={{ fontSize: "12px", color: "#666" }}>* Provided in text format for accessibility and screen readers[cite: 115].</p>
        </div>
      </div>

      {/* Map Display Panel */}
      <MapPanel courierLocation={COURIER_POS} restaurantLocation={BOLE_RESTAURANT} />
    </div>
  );
}