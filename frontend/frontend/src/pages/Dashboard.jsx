import { useState } from "react";
import MapView from "./MapView";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedLocation) {
      alert("Please click on map to select location first.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/dustbin-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            latitude: selectedLocation[0],
            longitude: selectedLocation[1],
            message: description,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      setSubmitted(true);
      setShowForm(false);
      setDescription("");
      setSelectedLocation(null);
    } catch (err) {
      alert("Request failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard ✅</h1>

      <button
        onClick={() => setShowForm(true)}
        style={{
          padding: "10px 15px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: 20,
        }}
      >
        🗑 Request New Dustbin
      </button>

      {submitted && (
        <p style={{ color: "green", marginTop: 15 }}>
          ✅ Dustbin request submitted successfully!
        </p>
      )}

      <div style={{ height: "75vh", marginTop: 30 }}>
        <MapView
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      </div>

      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              background: "white",
              padding: 30,
              borderRadius: 10,
              width: 300,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <h3>Request Dustbin</h3>

            {selectedLocation && (
              <p>
                📍 {selectedLocation[0].toFixed(5)},{" "}
                {selectedLocation[1].toFixed(5)}
              </p>
            )}

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ padding: 8 }}
            />

            <button
              type="submit"
              style={{
                backgroundColor: "#10b981",
                color: "white",
                border: "none",
                padding: "8px",
                borderRadius: "6px",
              }}
            >
              Submit
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                padding: "8px",
                borderRadius: "6px",
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
