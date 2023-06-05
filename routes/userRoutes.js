const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
const { validateToken } = require("../middleware/validateTokenHandler");
const router = express.Router();

// Register Route
router.route("/register").post(registerUser);

// Login Route
router.route("/login").post(loginUser);

// Current user Route
router.route("/current").get(validateToken, currentUser);

module.exports = router;
