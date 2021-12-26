const { donations, user } = require("../../models");

exports.getDonations = async (req, res) => {
  try {
    const data = await donations.findAll({
      include: {
        model: user,
        as: "donateFrom",
        attributes: {
          exclude: ["fundId", "userId", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "Success",
      data,
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.addDonation = async (req, res) => {
  try {
    const data = req.body;

    await donations.create(data);

    res.send({
      status: "Success",
      data,
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};
