"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Required for tile rendering[cite: 114]
import L from "leaflet";

// Fix Leaflet marker icon asset paths
const courierIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function DeliveryMap({ courierLocation, restaurantLocation }) {
  return (
    <MapContainer
      center={courierLocation} // [lat, lng] array[cite: 114, 115]
      zoom={14}
      style={{ height: "350px", width: "100%", borderRadius: "8px" }} // Explicit height required[cite: 113, 114]
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' // License attribution required[cite: 114]
      />
      {/* Restaurant Pin */}
      <Marker position={restaurantLocation} icon={courierIcon}>
        <Popup>Addis Eats Restaurant (Bole)</Popup>
      </Marker>
      {/* Live Courier Pin */}
      <Marker position={courierLocation} icon={courierIcon}>
        <Popup>Delivery Courier in Transit 🚴‍♂️</Popup>
      </Marker>
    </MapContainer>
  );
}