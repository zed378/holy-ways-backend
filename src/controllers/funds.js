const { funds, donations } = require("../../models");

exports.getFund = async (req, res) => {
  try {
    const data = await funds.findAll({
      include: {
        model: donations,
        as: "userDonate",
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

exports.addFund = async (req, res) => {
  try {
    const data = req.body;

    await funds.create(data);

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

exports.findFund = async (req, res) => {
  try {
    const { id } = req.params;

    const showFund = await funds.findOne({
      where: {
        id: id,
      },
      include: {
        model: donations,
        as: "userDonate",
        attributes: {
          exclude: ["fundId", "userId", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "Success",
      data: {
        fund: showFund,
      },
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.updateFund = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // update data using update() method
    await funds.update(updateData, {
      where: {
        id,
      },
    });

    res.send({
      status: "Success",
      message: "Update Success",
      fund: updateData,
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.deleteFund = async (req, res) => {
  try {
    const { id } = req.params;

    await funds.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "Success",
      message: "Delete Fund Success",
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.updateFundDonate = async (req, res) => {
  try {
    const { fundId, userId } = req.params;
    const updateData = req.body;

    // update data using update() method
    await donations.update(updateData, {
      where: {
        id: userId,
      },
    });

    const show = await funds.findOne({
      where: {
        id: fundId,
      },

      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },

      include: {
        model: donations,
        as: "userDonate",
        attributes: {
          exclude: ["fundId", "userId", "createdAt", "updatedAt"],
        },
      },
    });

    res.send({
      status: "Success",
      message: "Update Success",
      fund: show,
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};
