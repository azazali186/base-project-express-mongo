const mongoose = require("mongoose");
const uuid = require('uuid')

const languageSchema = new mongoose.Schema({
  _id:{
    type: String,
        default: () => uuid.v4().replace(/\-/g, ""), 
   },
  name: { type: String, required: true, unique:true },
  code: { type: String, required: true, unique: true },
  status: { type: Boolean, default: true }
},{timestamps:true}, { versionKey: false });

module.exports = mongoose.model("languages", languageSchema);