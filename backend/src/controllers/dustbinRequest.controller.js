const DustbinRequest = require("../models/DustbinRequest");

// 📨 Create a new dustbin request
exports.createDustbinRequest = async (req, res) => {
  try {
    const { latitude, longitude, message } = req.body;

    if (!latitude || !longitude || !message) {
      return res.status(400).json({
        message: "Latitude, longitude and message are required",
      });
    }

    const request = await DustbinRequest.create({
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      message,
      user: req.user.id, // comes from JWT
    });

    res.status(201).json({
      message: "Dustbin request submitted successfully 📨",
      request,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
