const express = require("express");
const cors = require("cors");

const app = express();

// middleware FIRST
app.use(express.json());
app.use(cors());

// routes AFTER middleware
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// test route
app.get("/", (req, res) => {
  res.send("🌸 Seiketsu backend is running");
});

module.exports = app;
