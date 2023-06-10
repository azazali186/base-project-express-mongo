const mongoose = require("mongoose");
const uuid = require('uuid')

const permissionSchema = new mongoose.Schema({
  _id:{
    type: String,
        default: () => uuid.v4().replace(/\-/g, ""), 
   },
  path: { type: String, required: true},
  name: { type: String, required: true},
  guard: { type: String, required: true, default: 'web'}
},{timestamps:true}, { versionKey: false }, { embedded: true });

module.exports = mongoose.model("permissions", permissionSchema);