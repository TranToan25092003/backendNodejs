"use strict";
const productModel = require("../../model/product.model");
const productCategory = require("../../model/product.category.model");
const calculate = require("../../helper/calculateNewPrice");
const findAllSubCategory = require("../../helper/findSubCategory");
//# [GET] /product
module.exports.renderProduct = async (req, res) => {
  // get product from db
  const resultFirst = await productModel
    .find({
      status: "active",
      deleted: false,
    })
    .sort({ price: "asc" });
  //end

  // change price by discounpercentage
  const result = calculate.calculateNewPrice(resultFirst);
  //end

  res.render("client/pages/products", {
    title: "product page",
    listProduct: result,
  });
};

//#[GET] /product/detail/:slug
module.exports.getDetail = async (req, res) => {
  const slug = req.params.slug;
  try {
    // condition find detail product
    const findCondition = {
      url: slug,
      deleted: false,
      status: "active",
    };
    //end

    // find product in db
    let product = await productModel.findOne(findCondition);
    //end

    // get category product
    if (product.category_id) {
      const category = await productCategory.findOne({
        _id: product.category_id,
        deleted: false,
        status: "active",
      });
      product.category = category;
    }

    calculate.calculateANewPrice(product); // calculate new price depend on discounpercentage
    //end

    res.render("client/pages/products/detail.pug", {
      title: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect("back");
  }
};

//# [GET] /product/:slug
module.exports.getProductByCategory = async (req, res) => {
  try {
    //get slug of category and find category in db
    const slug = req.params.slug;
    const category = await productCategory.findOne({
      url: slug,
      deleted: false,
    });
    //end

    // find all sub category id
    let listSubCategory = await findAllSubCategory.findAllSubCategory(
      category.id
    );
    listSubCategory = listSubCategory.map((item) => {
      return item.id;
    });
    //end

    // find all product has the category id
    let listProductRelate = await productModel.find({
      category_id: { $in: [category.id, ...listSubCategory] },
      deleted: false,
    });
    //end

    listProductRelate = calculate.calculateNewPrice(listProductRelate);

    res.render("client/pages/products", {
      title: category.title,
      listProduct: listProductRelate,
    });
  } catch (error) {
    res.redirect("back");
  }
};
