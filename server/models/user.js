let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String,
    default: null,
  },
  email: { type: String },
  firstName: String,
  lastName: String,
  profilePhoto: String,
  source: { type: String, required: [true, "source not specified"] },
  lastVisited: { type: Date, default: new Date() },
});

var userModel = mongoose.model("user", userSchema, "user");

module.exports = userModel;
