const mongoose = require("mongoose");

//# create a schema for product
const RolesSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    Permissions: {
      type: Array,
      default: [],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//# create model product (name, shcema, collection name)
const Roles = mongoose.model("Roles", RolesSchema, "Roles");

//# export model
module.exports = Roles;
