const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String
});

const User = mongoose.model("User", userSchema, "userdb");

module.exports = User;
