const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Desc Register all users
//@rout POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  // destructure tje req fields from the body
  const { username, email, password } = req.body;

  // validate
  if (!username || !email || !password) {
    res.status(400);

    throw new Error("All fields are mandatory!");
  }

  // Check if the user already exists
  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }
  // Password Hashing

  const hashedPassword = await bcrypt.hash(password, 10); //  10 here is salt round.
  console.log("Hashed Password: ", hashedPassword);

  // create a new user
  const user = await User.create({ username, email, password: hashedPassword });
  user.password = undefined;
  console.log(`user Created ${user}`);
  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400);

    throw new Error("User data is invalid!");
  }
  res.json({ message: "Register the user." });
});

//Desc Login all users
//@rout POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);

    throw new Error("All fields are mandatory!");
  }

  // check if a user exist
  const user = await User.findOne({ email });

  // compare the password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    // pass the payload, access token secret key and expiry time
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

//Desc Current user info
//@rout GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
