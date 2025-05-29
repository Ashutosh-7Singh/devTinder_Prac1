const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    required:true,
    type: String,
    trim: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("password is not Strong");
      }
    },
  },
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
