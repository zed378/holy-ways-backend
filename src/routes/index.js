const express = require("express");

const router = express.Router();

// Import User Controller
const {
  addUser,
  getUsers,
  findUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

// import Fund Controller
const {
  getFund,
  addFund,
  findFund,
  updateFund,
  deleteFund,
  updateFundDonate,
} = require("../controllers/funds");

// import Donation Controller
const { getDonations, addDonation } = require("../controllers/donations");

// import Profile Controller
const {
  addProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profile");

// import Auth Controller
const { register, login } = require("../controllers/auth");

// import middlewares
const { auth } = require("../middlewares/auth");

// define user routes
router.post("/user-add", addUser);
router.get("/users", getUsers);
router.get("/user/:id", findUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

// define fund routes
router.post("/fund-add", auth, addFund);
router.get("/funds", getFund);
router.get("/fund/:id", findFund);
router.patch("/fund/:id", auth, updateFund);
router.delete("/fund/:id", auth, deleteFund);
router.patch("/fund/:fundId/:userId", auth, updateFundDonate);

// define donation routes
router.get("/donation", getDonations);
router.post("/donate-add", addDonation);

// define profile routes
router.post("/profile-add", addProfile);
router.patch("/profile/:id", updateProfile);
router.delete("/profile/:id", deleteProfile);

// define auth routes
router.post("/register", register);
router.post("/login", login);

module.exports = router;
