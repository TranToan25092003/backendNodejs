const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
//# create a schema for category
const productCategorySchema = new mongoose.Schema(
  {
    title: String,
    parent_id: {
      type: String,
      default: "",
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
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
  },

  { timestamps: true }
);

//# create model product (name, schema, collection name)
const category = mongoose.model(
  "category",
  productCategorySchema,
  "product-category"
);

//# export model
module.exports = category;
