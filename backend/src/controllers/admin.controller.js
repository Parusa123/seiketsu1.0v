const DustbinRequest = require("../models/DustbinRequest");
const Dustbin = require("../models/Dustbin");

exports.getAllRequests = async (req, res) => {
  const requests = await DustbinRequest.find({ status: "pending" }).populate(
    "user",
    "name email"
  );
  res.json(requests);
};
exports.approveRequest = async (req, res) => {
  try {
    const request = await DustbinRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // 🚫 prevent double approval
    if (request.status !== "pending") {
      return res.status(400).json({
        message: `Request already ${request.status}`,
      });
    }

    // ✅ create dustbin
    const dustbin = await Dustbin.create({
      name: "Requested Dustbin",
      status: "empty",
      location: request.location,
    });

    // ✅ update request
    request.status = "approved";
    await request.save();

    res.json({
      message: "Request approved & dustbin created",
      dustbin,
      request,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.rejectRequest = async (req, res) => {
  const request = await DustbinRequest.findById(req.params.id);

  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  request.status = "rejected";
  await request.save();

  res.json({
    message: "Request rejected successfully",
    request,
  });
};


