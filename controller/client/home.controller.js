"use strict";
const productModel = require("../../model/product.model");
const productCategory = require("../../model/product.category.model");
const devideCategory = require("../../helper/devideLevelCategory");
const calculate = require("../../helper/calculateNewPrice");
//# [GET] homepage
module.exports.renderHomePage = async (req, res) => {
  // get outstanding product render to homepage
  const condition = {
    deleted: false,
    feature: "1",
    status: "active",
  };

  const listOProduct = await productModel.find(condition).limit(3);
  //end

  // change price by discounpercentage
  const result = calculate.calculateNewPrice(listOProduct);
  //end

  // newest product
  const newestProduct = await productModel
    .find(condition)
    .sort({ position: "desc" })
    .limit(3);
  //end

  res.render("client/pages/home/index.pug", {
    title: "home page",
    product: result,
    newProduct: newestProduct,
  });
};
