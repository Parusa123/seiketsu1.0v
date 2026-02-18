import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setRequests(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    await fetch(
      `http://localhost:3000/api/admin/requests/${id}/approve`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchRequests();
  };

  const handleReject = async (id) => {
    await fetch(
      `http://localhost:3000/api/admin/requests/${id}/reject`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchRequests();
  };

  if (loading) return <h2 style={{ padding: 40 }}>Loading...</h2>;

  return (
    <div style={{ padding: 40 }}>
      <h1>🛠 Admin Dashboard</h1>

      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            style={{
              border: "1px solid #ddd",
              padding: 20,
              marginBottom: 20,
              borderRadius: 10,
            }}
          >
            <p><strong>Message:</strong> {req.message}</p>

            <p>
              <strong>Location:</strong>{" "}
              {req.location.coordinates[1].toFixed(4)},{" "}
              {req.location.coordinates[0].toFixed(4)}
            </p>

            <button
              onClick={() => handleApprove(req._id)}
              style={{
                backgroundColor: "#10b981",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                marginRight: 10,
                cursor: "pointer",
              }}
            >
              ✅ Approve
            </button>

            <button
              onClick={() => handleReject(req._id)}
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              ❌ Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
}
