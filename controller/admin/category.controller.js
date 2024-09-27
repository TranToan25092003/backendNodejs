const productCategory = require("../../model/product.category.model");
const accountModel = require("../../model/Account.model");
const systemConfig = require("../../config/system");
const devideCategory = require("../../helper/devideLevelCategory");

//#[GET] get all category
module.exports.getAllCategory = async (req, res) => {
  //get all category
  let listCategory = await productCategory.find({
    deleted: false,
  });
  //end

  //# get updater and creater for each category
  for (const item of listCategory) {
    const account = await accountModel.findOne({
      _id: item.createdBy.account_id,
    });
    if (account) {
      item.author = account.fullName;
    }
  }
  //end
  // res.send(listCategory);
  listCategory = devideCategory.createLevelCategory(listCategory);

  res.render("admin/pages/category/index.pug", {
    title: "Product category",
    listCategory: listCategory,
  });
};

//#[GET] /admin/productCategory/create
module.exports.createCategoryForm = async (req, res) => {
  //get all category
  let listCategory = await productCategory.find({
    deleted: false,
  });
  //end

  listCategory = devideCategory.createLevelCategory(listCategory);

  res.render("admin/pages/category/create.pug", {
    listCategory: listCategory,
  });
};

//#[POST] /admin/productCategory/create
module.exports.createCategory = async (req, res) => {
  // auto grow up number postition
  if (req.body.position.trim() == "") {
    req.body.position = (await productCategory.countDocuments({})) + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  //end

  // save the log history account create or update and get their data
  req.body.createdBy = {
    account_id: res.locals.account.id,
  };
  // end

  //create new category product
  const newCategory = new productCategory(req.body);
  await newCategory.save();
  req.flash("success", "create a product category successfully");
  res.redirect(`${systemConfig.prefixAdmin}/productCategory`);
};

//#[GET] /admin/productCategory/update/:id render update form category
module.exports.renderFormUpdateCategory = async (req, res) => {
  try {
    // get category by id
    const category = await productCategory.findOne({
      _id: req.params.id,
    });
    //end

    //get all category and devide level
    let listCategory = await productCategory.find({ deleted: false });
    listCategory = devideCategory.createLevelCategory(listCategory);
    //end

    res.render("admin/pages/category/edit.pug", {
      category: category,
      listCategory: listCategory,
    });
  } catch (error) {
    res.send("404");
  }
};

//#[PATCH] /admin/productCategory/update/:id
module.exports.UpdateCategory = async (req, res) => {
  try {
    // update category
    const id = req.params.id; // get id
    req.position = parseInt(req.position); // convert position to int
    req.updateAt = Date.now();
    await productCategory.updateOne(
      // update
      {
        _id: id,
        deleted: false,
      },
      req.body // data update
    );

    //end
    res.redirect("back");
  } catch (error) {
    res.Send("404");
  }
};
