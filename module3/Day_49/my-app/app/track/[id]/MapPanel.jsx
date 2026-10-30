"use client";

import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false, // Prevents window import crash on server[cite: 113]
  loading: () => (
    <div style={{ height: "350px", backgroundColor: "#e2e8f0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span>Loading Addis Ababa Map...</span>
    </div>
  ), // Sized placeholder prevents Cumulative Layout Shift (CLS)[cite: 113]
});

export default function MapPanel(props) {
  return <DeliveryMap {...props} />;
}