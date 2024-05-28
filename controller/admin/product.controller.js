const productModel = require("../../model/product.model");
const filterByStatus = require("../../helper/filterStatus.helper");
const searchBar = require("../../helper/searchBar.helpter");
const pagination = require("../../helper/pagination.helper");
const systemConfig = require("../../config/system");
const { prefixAdmin } = require("../../config/system");

//# [GET] /admin/product
module.exports.productPage = async (req, res) => {
  //# condition to find product
  const condition = {
    deleted: false,
  };

  //# handle search feature
  const keyword = req.query.keyword;

  //# search by name
  searchBar(keyword, condition);
  //#end handle search feature

  //# filter by status
  const [buttonStatus, currentTypeList] = filterByStatus(req.query, condition);
  //#end filter by status

  // #pagination
  //# count length document
  const countDocument = await productModel.countDocuments({});
  const paginationObj = pagination(
    {
      currentPage: 1,
      limitProduct: 5,
    },
    req.query,
    countDocument
  );
  //end pagination

  //# get data from db
  const listProduct = await productModel
    .find(condition)
    .sort({ position: "desc" })
    .limit(paginationObj.limitProduct)
    .skip((paginationObj.currentPage - 1) * paginationObj.limitProduct);

  //# render /admin/product
  res.render("admin/pages/product/index", {
    listProduct: listProduct,
    buttonStatus: buttonStatus,
    typeList: currentTypeList,
    keyword: keyword,
    quantityPage: paginationObj,
  });
};

//# [PATCH] /admin/product/change-status/status/id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await productModel.updateOne({ _id: id }, { status: status });
  req.flash("success", "success");
  res.redirect("back");
};

//# [PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const listId = req.body.listId.split(" ");

  if (type == "change_position") {
    for (const item of listId) {
      const id = item.split("-")[0];
      const position = item.split("-")[1];
      await productModel.updateOne({ _id: id }, { position: position });
    }
  } else if (type == "acitve" || type == "inactive") {
    await productModel.updateMany({ _id: { $in: listId } }, { status: type });
  }
  req.flash("success", `change sucess ${listId.length} product`);
  res.redirect("back");
};

//# [DELETE] /admin/product/delete
module.exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  await productModel.updateOne(
    { _id: id },
    { deleted: true, deleted_At: new Date() }
  );
  req.flash("success", `delete successfully`);
  res.redirect("back");
};

//# [GET] redirect to create form
module.exports.renderFormCreate = (req, res) => {
  res.render("admin/pages/product/create.pug", {
    title: "Create a product",
  });
};

//# [POST] create a product
module.exports.createProduct = async (req, res) => {
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.price = parseInt(req.body.price);
  if (req.file) {
    req.body.thumbnail = `/upload/${req.file.filename}`;
  }

  if (req.body.position.trim() == "") {
    req.body.position = (await productModel.countDocuments({})) + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const newProduct = new productModel(req.body);
  await newProduct.save();
  req.flash("success", "create a product successfully");
  res.redirect(`${systemConfig.prefixAdmin}/product`);
};

//#[GET] render edit form
module.exports.editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const findCondition = {
      _id: id,
      deleted: false,
    };

    const productObj = await productModel.findOne(findCondition);
    res.render("admin/pages/product/edit.pug", {
      title: "Edit page",
      product: productObj,
    });
  } catch (error) {
    req.flash("error", "Stop your shit!");
    res.redirect(`${systemConfig.prefixAdmin}/product`);
  }
};

//#[PATCH] update a product
module.exports.editProductPatch = async (req, res) => {
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.price = parseInt(req.body.price);
  if (req.file) {
    req.body.thumbnail = `/upload/${req.file.filename}`;
  }
  req.body.position = parseInt(req.body.position);

  try {
    await productModel.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "Update product success");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "update failed");
    res.redirect("back");
  }
};

//#[GET] render detail product form
module.exports.getDetailProduct = async (req, res) => {
  try {
    const findCondition = {
      _id: req.params.id,
      deleted: false,
    };

    const product = await productModel.findOne(findCondition);
    res.render(`admin/pages/product/detail.pug`, {
      title: product.title,
      product: product,
    });
  } catch (error) {}
};
