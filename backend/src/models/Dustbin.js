const mongoose = require("mongoose");

const dustbinSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["empty", "half", "full", "overflowing"],
      default: "empty",
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
  },
  { timestamps: true }
);

// 🔥 GEO INDEX (THIS IS THE MAGIC)
dustbinSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Dustbin", dustbinSchema);
