const mongoose = require("mongoose");
const randomToken = require("../helper/generate.helper");
const { Timestamp } = require("mongodb");
const CartSchema = new mongoose.Schema(
  {
    user_id: String,
    products: [
      {
        product_id: String,
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
);

//# create model cart (name, shcema, collection name)
const Cart = mongoose.model("cart", CartSchema, "cart");

//# export model
module.exports = Cart;
