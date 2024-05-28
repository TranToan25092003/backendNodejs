"use strict";
const productModel = require("../../model/product.model");

//# [GET] /product
module.exports.renderProduct = async (req, res) => {
  const resultFirst = await productModel
    .find({
      status: "active",
      deleted: false,
    })
    .sort({ price: "asc" });
  const result = resultFirst.map((item) => {
    item.newPrice = (
      item.price -
      item.price * (item.discountPercentage / 100)
    ).toFixed(2);
    return item;
  });

  res.render("client/pages/products", {
    title: "product page",
    listProduct: result,
  });
};

//#[GET] /product/detail/:slug
module.exports.getDetail = async (req, res) => {
  const slug = req.params.slug;
  try {
    const findCondition = {
      url: slug,
      deleted: false,
      status: "active",
    };
    const product = await productModel.findOne(findCondition);
    console.log(product);
    res.render("client/pages/products/detail.pug", {
      title: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect("back");
  }
};
