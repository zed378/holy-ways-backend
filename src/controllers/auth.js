// import model
const { user } = require("../../models");

// import module
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const input = Joi.object({
    fullName: Joi.string().min(5).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  // validate input
  const { error } = input.validate(req.body);

  // check if error
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const spinKey = await bcrypt.genSalt(10);
    const encryptPass = await bcrypt.hash(req.body.password, spinKey);

    const newUser = await user.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: encryptPass,
    });

    // define token data
    const dataToken = {
      id: newUser.id,
      email: newUser.email,
    };

    // generate token
    const token = jwt.sign(dataToken, process.env.TOKEN_KEY);

    res.status(200).send({
      status: "Success",
      message: "Account Created",
      data: {
        user: {
          name: newUser.fullName,
          email: newUser.email,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  // validate input
  const input = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  // check if input error
  const { error } = input.validate(req.body);

  // if error exist send validation error message
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    // init var to decrypt password
    const isMatch = await bcrypt.compare(req.body.password, userExist.password);

    // check if password didn't match
    if (!isMatch) {
      return res.status(400).send({
        status: "Failed",
        message: "Email or Password doesn't match",
      });
    }

    // define token data
    const dataToken = {
      id: userExist.id,
      email: userExist.email,
    };

    // generate token
    const token = jwt.sign(dataToken, process.env.TOKEN_KEY);

    res.status(200).send({
      status: "Success",
      message: "Login Success",
      data: {
        fullName: userExist.fullName,
        email: userExist.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Server Error",
    });
  }
};
