const mongoose = require("mongoose");
const roles = require("../enum/roles");
const status = require('../enum/user-status.js')

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  role: {
    type: String,
    enum: [roles.User, roles.Admin],
    default: roles.User
  },
  status: {
    type: String,
    enum: [status.Pending, status.Active],
    default: status.Pending
  },
}, { timestamps: true});

module.exports = mongoose.model("user", userSchema);