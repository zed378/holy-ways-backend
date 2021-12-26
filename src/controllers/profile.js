const { profile } = require("../../models");

exports.addProfile = async (req, res) => {
  try {
    const data = req.body;

    await profile.create(data);

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

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // update data using update() method
    await profile.update(updateData, {
      where: {
        id,
      },
    });

    res.send({
      status: "Success",
      message: "Update Success",
      data: updateData,
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;

    await profile.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "Success",
      message: "Delete Profile Success",
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};
