import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ---------- FIX DEFAULT ICON ---------- */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ---------- CUSTOM ICONS ---------- */

const dustbinIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/484/484662.png",
  iconSize: [35, 35],
});

const userIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  iconSize: [35, 35],
});

function FlyTo({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 14);
    }
  }, [position, map]);
  return null;
}

export default function MapView() {
  const [userPosition, setUserPosition] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState(null);

  const centerPosition = [26.1445, 91.7362];

  const dustbins = [
    { id: 1, position: [26.1500, 91.7400], name: "Zoo Road" },
    { id: 2, position: [26.1480, 91.7300], name: "GS Road" },
    { id: 3, position: [26.1420, 91.7250], name: "Paltan Bazaar" },
    { id: 4, position: [26.1600, 91.7500], name: "Six Mile" },
  ];

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const fetchRoute = async (userCoords, binCoords) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${userCoords[1]},${userCoords[0]};${binCoords[1]},${binCoords[0]}?overview=full&geometries=geojson`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.routes.length > 0) {
        const coords = data.routes[0].geometry.coordinates.map(
          (coord) => [coord[1], coord[0]]
        );

        setRouteCoords(coords);
        setDistance((data.routes[0].distance / 1000).toFixed(2));
      }
    } catch (err) {
      console.log("Route fetch error:", err);
    }
  };

  const showNearestDustbin = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const userCoords = [
        position.coords.latitude,
        position.coords.longitude,
      ];

      setUserPosition(userCoords);

      let minDistance = Infinity;
      let closest = null;

      dustbins.forEach((bin) => {
        const dist = getDistance(
          userCoords[0],
          userCoords[1],
          bin.position[0],
          bin.position[1]
        );

        if (dist < minDistance) {
          minDistance = dist;
          closest = bin;
        }
      });

      fetchRoute(userCoords, closest.position);
    });
  };

  /* ---------- NEW: CANCEL NAVIGATION ---------- */
  const cancelNavigation = () => {
    setRouteCoords([]);
    setDistance(null);
  };

  return (
    <div style={{ height: "80vh", width: "100%", position: "relative" }}>
      {/* NAVIGATE BUTTON */}
      <button
        onClick={showNearestDustbin}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1000,
          padding: "10px 14px",
          backgroundColor: "#10b981",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🗑 Navigate to Nearest Dustbin
      </button>

      {/* NEW CANCEL BUTTON (only show when route exists) */}
      {routeCoords.length > 0 && (
        <button
          onClick={cancelNavigation}
          style={{
            position: "absolute",
            top: 60,
            right: 10,
            zIndex: 1000,
            padding: "10px 14px",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ❌ Cancel Navigation
        </button>
      )}

      {distance && (
        <div
          style={{
            position: "absolute",
            top: 110,
            right: 10,
            zIndex: 1000,
            background: "white",
            padding: "8px 12px",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Distance: {distance} km
        </div>
      )}

      <MapContainer
        center={centerPosition}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {dustbins.map((bin) => (
          <Marker key={bin.id} position={bin.position} icon={dustbinIcon}>
            <Popup>{bin.name}</Popup>
          </Marker>
        ))}

        {userPosition && (
          <>
            <Marker position={userPosition} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>
            <FlyTo position={userPosition} />
          </>
        )}

        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} color="blue" weight={6} />
        )}
      </MapContainer>
    </div>
  );
}
