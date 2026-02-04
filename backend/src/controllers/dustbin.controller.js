const Dustbin = require("../models/Dustbin");

// CREATE dustbin (protected)
exports.createDustbin = async (req, res, next) => {
  try {
    const { name, latitude, longitude, status } = req.body;

    if (!name || latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        message: "Name, latitude and longitude are required",
      });
    }

    const dustbin = await Dustbin.create({
      name,
      status,
      location: {
        type: "Point",
        coordinates: [longitude, latitude], // IMPORTANT ORDER
      },
    });

    res.status(201).json({
      message: "Dustbin created successfully",
      dustbin,
    });
  } catch (err) {
    next(err); // 👈 important for error middleware
  }
};
