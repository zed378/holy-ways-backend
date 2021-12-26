// import model here
const { user } = require("../../models");

exports.addUser = async (req, res) => {
  try {
    // parsing data from form
    const data = req.body;

    // insert data to table using create() method
    const insertData = await user.create(data);

    res.send({
      status: "Success",
      data: insertData,
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const userData = await user.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "Success",
      data: {
        user: userData,
      },
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.findUser = async (req, res) => {
  try {
    const { id } = req.params;

    const showUser = await user.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "Success",
      data: {
        user: showUser,
      },
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // update data using update() method
    await user.update(updateData, {
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

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await user.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "Success",
      message: "Delete User Success",
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};
