const express = require("express");
const app = express();

app.use(express.json());

// routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const dustbinRoutes = require("./routes/dustbin.routes"); // 👈 ADD THIS

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dustbins", dustbinRoutes); // 👈 ADD THIS

// test route
app.get("/", (req, res) => {
  res.send("OK");
});

module.exports = app;
