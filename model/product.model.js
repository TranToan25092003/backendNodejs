const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
//# create a schema for product
const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    feature: String,
    position: Number,
    category_id: String,
    url: {
      type: String,
      slug: "title",
      unique: true,
    },
    createdBy: {
      account_id: String,
      createAt: {
        type: Date,
        default: Date.now(),
      },
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedBy: {
      account_id: String,
      deletedAt: Date,
    },
    updatedBy: [
      {
        account_id: String,
        updatedAt: Date,
      },
    ],
  },

  { timestamps: true }
);

//# create model product (name, shcema, collection name)
const Product = mongoose.model("products", productSchema, "products");

//# export model
module.exports = Product;
