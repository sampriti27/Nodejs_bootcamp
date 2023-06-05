const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the username."],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address."], // this is a req field.
      unique: [true, "Email address already taken"], // so that nno users can have same email address
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("User", userSchema);
