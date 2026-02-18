import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
  useMapEvents,
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

/* ---------- ICONS ---------- */

const dustbinIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/484/484662.png",
  iconSize: [35, 35],
});

const constructionIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [35, 35],
});

const userIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  iconSize: [35, 35],
});

const redIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
});

/* ---------- FLY TO USER ---------- */
function FlyTo({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 14);
    }
  }, [position, map]);
  return null;
}

/* ---------- CLICK SELECTOR ---------- */
function LocationSelector({ setSelectedLocation }) {
  useMapEvents({
    click(e) {
      setSelectedLocation([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function MapView({
  selectedLocation,
  setSelectedLocation,
}) {
  const [userPosition, setUserPosition] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState(null);

  const centerPosition = [26.1445, 91.7362];

  /* ---------- DUSTBINS WITH STATUS ---------- */
  const dustbins = [
  { id: 1, position: [26.1500, 91.7400], name: "Zoo Road", status: "empty" },
  { id: 2, position: [26.1480, 91.7300], name: "GS Road", status: "empty" },
  { id: 3, position: [26.1420, 91.7250], name: "Paltan Bazaar", status: "in-construction" },
  { id: 4, position: [26.1600, 91.7500], name: "Six Mile", status: "empty" },
  { id: 5, position: [26.1200, 91.8000], name: "Khanapara", status: "empty" },
  { id: 6, position: [26.2000, 91.7000], name: "North Guwahati", status: "empty" },
  { id: 7, position: [26.1800, 91.8200], name: "Panikhaiti", status: "empty" },
  { id: 8, position: [26.1000, 91.6800], name: "Azara", status: "empty" },
  { id: 9, position: [26.2500, 91.6500], name: "Amingaon", status: "empty" },
  { id: 10, position: [26.0500, 91.9000], name: "Sonapur", status: "empty" },
];


  /* ---------- DISTANCE CALC ---------- */
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

  /* ---------- ROUTE FETCH ---------- */
  const fetchRoute = async (userCoords, binCoords) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${userCoords[1]},${userCoords[0]};${binCoords[1]},${binCoords[0]}?overview=full&geometries=geojson`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.routes && data.routes.length > 0) {
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

  /* ---------- NAVIGATE ---------- */
  const showNearestDustbin = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const userCoords = [
        position.coords.latitude,
        position.coords.longitude,
      ];

      setUserPosition(userCoords);

      let minDistance = Infinity;
      let closest = null;

      dustbins
        .filter((bin) => bin.status !== "in-construction") // IGNORE construction
        .forEach((bin) => {
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

      if (closest) {
        fetchRoute(userCoords, closest.position);
      }
    });
  };

  const cancelNavigation = () => {
    setRouteCoords([]);
    setDistance(null);
  };

  const cancelSelectedLocation = () => {
    if (setSelectedLocation) {
      setSelectedLocation(null);
    }
  };

  return (
    <div style={{ height: "80vh", width: "100%", position: "relative" }}>

      {/* NAVIGATION BUTTON */}
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

      {/* CANCEL NAVIGATION */}
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

      {/* CANCEL SELECTED LOCATION */}
      {selectedLocation && (
        <button
          onClick={cancelSelectedLocation}
          style={{
            position: "absolute",
            top: 110,
            right: 10,
            zIndex: 1000,
            padding: "10px 14px",
            backgroundColor: "#f97316",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ❌ Cancel Selected Location
        </button>
      )}

      {/* DISTANCE BOX */}
      {distance && (
        <div
          style={{
            position: "absolute",
            top: 160,
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

        {setSelectedLocation && (
          <LocationSelector setSelectedLocation={setSelectedLocation} />
        )}

        {/* DUSTBINS */}
        {dustbins.map((bin) => (
          <Marker
            key={bin.id}
            position={bin.position}
            icon={
              bin.status === "in-construction"
                ? constructionIcon
                : dustbinIcon
            }
          >
            <Popup>
              {bin.name}
              <br />
              Status: {bin.status}
            </Popup>
          </Marker>
        ))}

        {/* USER */}
        {userPosition && (
          <>
            <Marker position={userPosition} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>
            <FlyTo position={userPosition} />
          </>
        )}

        {/* SELECTED LOCATION */}
        {selectedLocation && (
          <Marker position={selectedLocation} icon={redIcon}>
            <Popup>Selected Location</Popup>
          </Marker>
        )}

        {/* ROUTE */}
        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} color="blue" weight={6} />
        )}
      </MapContainer>
    </div>
  );
}
