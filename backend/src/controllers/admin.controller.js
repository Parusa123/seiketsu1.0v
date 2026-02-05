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
  const request = await DustbinRequest.findById(req.params.id);

  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  // create dustbin
  const dustbin = await Dustbin.create({
    name: "Requested Dustbin",
    status: "empty",
    location: request.location,
  });

  request.status = "approved";
  await request.save();

  res.json({
    message: "Request approved & dustbin created",
    dustbin,
  });
};
