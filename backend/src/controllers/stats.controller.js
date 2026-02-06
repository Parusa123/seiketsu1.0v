const DustbinRequest = require("../models/DustbinRequest");

exports.getTopContributors = async (req, res) => {
  const stats = await DustbinRequest.aggregate([
    {
      $group: {
        _id: "$user"
,   // user id
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);

  res.json(stats);
};
