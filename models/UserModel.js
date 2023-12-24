const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  date_created: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const User = model("User", userSchema);
module.exports.User = User;
