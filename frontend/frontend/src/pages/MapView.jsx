import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


export default function MapView() {
  const position = [26.1445, 91.7362];

  return (
    <div style={{ height: "80vh", width: "100%", marginTop: "20px" }}>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='© OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>Smart Dustbin 📍</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
