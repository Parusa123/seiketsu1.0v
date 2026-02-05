const express = require("express");
const app = express();

app.use(express.json());

// routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const dustbinRoutes = require("./routes/dustbin.routes"); // 👈 ADD THIS
const dustbinRequestRoutes = require("./routes/dustbinRequest.routes");
const adminRoutes = require("./routes/admin.routes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dustbins", dustbinRoutes); // 👈 ADD THIS
app.use("/api/dustbin-requests", dustbinRequestRoutes);
app.use("/api/admin", adminRoutes);

// test route
app.get("/", (req, res) => {
  res.send("OK");
});

module.exports = app;
