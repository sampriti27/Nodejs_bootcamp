const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;

  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    // verify the token

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Unauthorized user.");
      }
      console.log(decoded);
      req.user = decoded.user; // extract the info embedded in the token

      next();
    });
    // token expired or not found
    if (!token) {
      res.status(401);
      throw new Error("User Unauthorized or token missing!!");
    }
  }
});

module.exports = { validateToken };
