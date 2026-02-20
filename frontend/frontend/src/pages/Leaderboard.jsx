import { useEffect, useState } from "react";
import axios from "../api/axios";
import "./Leaderboard.css";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await axios.get("/stats/top-contributors");
        setLeaders(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchLeaders();
  }, []);

  const topThree = leaders.slice(0, 3);

  return (
    <div className="leaderboard-container">
      <h1>🏆 Top Contributors</h1>

      <div className="top-three">
        {topThree.map((user, index) => (
          <div key={user.userId} className={`card rank-${index}`}>
            <h2>
              {index === 0 && "🥇"}
              {index === 1 && "🥈"}
              {index === 2 && "🥉"}
            </h2>
            <h3>{user.name}</h3>
            <p>Score: {user.score}</p>
            <p>Approved: {user.approvedRequests}</p>
            <p>Reports: {user.overflowReports}</p>
          </div>
        ))}
      </div>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Approved</th>
            <th>Reports</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((user, index) => (
            <tr key={user.userId}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.approvedRequests}</td>
              <td>{user.overflowReports}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}