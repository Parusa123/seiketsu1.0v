import MapView from "./MapView";

export default function Dashboard() {
  return (
    <div>
      <div style={{ padding: "20px 40px" }}>
        <h1>Dashboard ✅</h1>
        <p>You are logged in.</p>
      </div>

      <MapView />
    </div>
  );
}
