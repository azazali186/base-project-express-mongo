const mongoose = require("mongoose");
const uuid = require('uuid')

const roleSchema = new mongoose.Schema({
  _id:{
    type: String,
        default: () => uuid.v4().replace(/\-/g, ""), 
   },
  name: { type: String, required: true, unique:true },
  isActive: { type: Boolean, default: true },
  permissions: { type: Array, objectType : "permissions"},
},{timestamps:true}, { versionKey: false }, { embedded: true });

module.exports = mongoose.model("roles", roleSchema);