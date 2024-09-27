const productCategoryModel = require("../../model/product.category.model");

//# [get]  /admin/dashboard
module.exports.dashBoard = async (req, res) => {
  // statistic
  const statistic = {
    productCategory: {
      quantitty: 1,
      active: 1,
      inactive: 1,
    },
    product: {
      quantitty: 1,
      active: 1,
      inactive: 1,
    },
    account: {
      quantitty: 1,
      active: 1,
      inactive: 1,
    },
    user: {
      quantitty: 1,
      active: 1,
      inactive: 1,
    },
  };
  // get statistic product category
  statistic.productCategory.quantitty =
    await productCategoryModel.countDocuments({}); // count
  statistic.productCategory.active = await productCategoryModel.countDocuments({
    // count active
    status: "active",
  });
  statistic.productCategory.inactive =
    await productCategoryModel.countDocuments({ status: "inactive" }); // count inactive
  //end
  res.render("admin/pages/dashboard/index", {
    statistic: statistic,
  });
};
