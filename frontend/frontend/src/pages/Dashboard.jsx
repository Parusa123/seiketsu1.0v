import { useState } from "react";
import MapView from "./MapView";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Later we connect this to backend API
    console.log("New Dustbin Request:", { location, description });

    setSubmitted(true);
    setShowForm(false);
    setLocation("");
    setDescription("");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard ✅</h1>
      <p>You are logged in.</p>

      {/* Request Button */}
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

      {/* Success Message */}
      {submitted && (
        <p style={{ color: "green", marginTop: 15 }}>
          ✅ Dustbin request submitted successfully!
        </p>
      )}

      {/* MAP SECTION */}
      <div style={{ height: "75vh", marginTop: 30 }}>
        <MapView />
      </div>

      {/* Modal Form */}
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

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              style={{ padding: 8 }}
            />

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
                cursor: "pointer",
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
                cursor: "pointer",
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
