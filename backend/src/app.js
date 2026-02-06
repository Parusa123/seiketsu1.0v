const express = require("express");
const app = express();

app.use(express.json());

// routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const dustbinRoutes = require("./routes/dustbin.routes");
const dustbinRequestRoutes = require("./routes/dustbinRequest.routes");
const adminRoutes = require("./routes/admin.routes");
const statsRoutes = require("./routes/stats.routes"); // ✅ THIS

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dustbins", dustbinRoutes);
app.use("/api/dustbin-requests", dustbinRequestRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stats", statsRoutes); // ✅ THIS

app.get("/", (req, res) => {
  res.send("OK");
});

module.exports = app;
