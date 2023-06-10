const mongoose = require("mongoose");
const uuid = require('uuid')

const userSchema = new mongoose.Schema({
  _id:{
    type: String,
        default: () => uuid.v4().replace(/\-/g, ""), 
   },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, ref: "Roles", required: true },
  isActive: { type: Boolean, default: true },
  accessToken: { type: String }
},{timestamps:true}, { versionKey: false });

module.exports = mongoose.model("users", userSchema);