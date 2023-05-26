const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("Email is INVALIDDDDDDDDDDDDD");
      }
    },
  },
  age: {
    type: Number,
    default: 18,
    validate(val) {
      if (val <= 0) {
        throw new Error("age must be positive number");
      }
    },
  },
  city: {
    type: String,
  },
});

module.exports = User;
