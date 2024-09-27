const productModel = require("../../model/product.model");
const calculate = require("../../helper/calculateNewPrice");
// #[/search]
module.exports.searchByKeyword = async (req, res) => {
  // get search keyword
  const keyword = req.query.keyword;
  const keywordRegex = new RegExp(keyword, "i"); // create keyword regex
  //end

  let product = [];
  if (keyword) {
    // check if search bar type
    // find list product
    product = await productModel.find({
      title: keywordRegex,
      status: "active",
      deleted: false,
    });

    //end

    calculate.calculateANewPrice(product); // calculate new price depend on discounpercentage
    //end
  }

  res.render("client/pages/search/index.pug", {
    keyword: keyword,
    product: product,
  });
};
