const productModel = require("../../model/product.model");
const productCategory = require("../../model/product.category.model");
const devideCategory = require("../../helper/devideLevelCategory");

// middleware take all category in any path / product
module.exports.category = async (req, res, next) => {
  // get all category product from db
  const condition = {
    deleted: false,
  };

  let listCategory = await productCategory.find(condition);
  listCategory = devideCategory.createLevelCategory(listCategory);
  //end

  res.locals.listCategory = listCategory;
  next();
};
//end
