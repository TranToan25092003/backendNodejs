const productModel = require("../../model/product.model");
const accountModel = require("../../model/Account.model");
const filterByStatus = require("../../helper/filterStatus.helper");
const searchBar = require("../../helper/searchBar.helpter");
const pagination = require("../../helper/pagination.helper");
const systemConfig = require("../../config/system");
const { prefixAdmin } = require("../../config/system");
const { Types } = require("mongoose");
const devideCategory = require("../../helper/devideLevelCategory");
const productCategory = require("../../model/product.category.model");

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

  //# count length document
  const countDocument = await productModel.countDocuments({ deleted: false });
  const paginationObj = pagination(
    {
      currentPage: 1,
      limitProduct: 5,
    },
    req.query,
    countDocument
  );
  //end pagination

  // sort
  const sort = {};
  if (req.query.sortKey && req.query.typeSort) {
    sort[req.query.sortKey] = req.query.typeSort;
  } else {
    sort.position = "desc";
  }
  //end sort

  //# get data product from db
  const listProduct = await productModel
    .find(condition)
    .sort(sort)
    .limit(paginationObj.limitProduct)
    .skip((paginationObj.currentPage - 1) * paginationObj.limitProduct);

  //# get updater and creater for each product
  for (const item of listProduct) {
    // get creater
    const creater = await accountModel.findOne({
      _id: item.createdBy.account_id,
    });
    if (creater) {
      item.author = creater.fullName;
    }
    //end

    //get updater
    const updaterInformation = item.updatedBy[item.updatedBy.length - 1];
    if (updaterInformation) {
      // there is not updater update this product
      const updater = await accountModel.findOne({
        _id: updaterInformation.account_id,
      });
      updaterInformation.updaterFullname = updater.fullName;
    }
    //end
  }
  //end

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
  // get data from client
  const status = req.params.status;
  const id = req.params.id;
  //end

  // log update
  const updatedBy = {
    account_id: res.locals.account.id,
    updatedAt: Date.now(),
  };
  //end

  // update in db
  await productModel.updateOne(
    { _id: id },
    { status: status, $push: { updatedBy: updatedBy } }
  );
  //end

  req.flash("success", "success");
  res.redirect("back");
};

//# [PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
  // get type action and list id product need change(change delete)
  const type = req.body.type;
  const listId = req.body.listId.split(" ");

  // add log update
  const updatedBy = {
    account_id: res.locals.account.id,
    updatedAt: Date.now(),
  };
  //end

  if (type == "change_position") {
    // change position
    for (const item of listId) {
      const id = item.split("-")[0];
      const position = item.split("-")[1];
      await productModel.updateOne(
        { _id: id },
        { position: position, $push: { updatedBy: updatedBy } }
      );
    }
  } else if (type == "acitve" || type == "inactive") {
    // change status in db
    await productModel.updateMany(
      { _id: { $in: listId } },
      { status: type, $push: { updatedBy: updatedBy } }
    );
  } else if (type == "delete_multip") {
    const accountId = res.locals.account.id; // get account id
    // delete multip product
    await productModel.updateMany(
      { _id: { $in: listId } },
      {
        deleted: true,
        deletedBy: {
          account_id: accountId, // add log history delete
          deletedAt: Date.now(),
        },
      }
    );
  }
  //end
  req.flash("success", `change sucess ${listId.length} product`);
  res.redirect("back");
};

//# [DELETE] /admin/product/delete
module.exports.deleteProduct = async (req, res) => {
  const id = req.params.id; // get id product
  const accountId = res.locals.account.id; // get account id

  // delete product
  await productModel.updateOne(
    { _id: id },
    {
      deleted: true,
      deletedBy: {
        account_id: accountId, // add log history delete
        deletedAt: Date.now(),
      },
    }
  );
  req.flash("success", `delete successfully`);
  res.redirect("back");
};

//# [GET] redirect to create form
module.exports.renderFormCreate = async (req, res) => {
  //list category
  //get all category
  let listCategory = await productCategory.find({
    deleted: false,
  });
  //end

  listCategory = devideCategory.createLevelCategory(listCategory);
  //end

  res.render("admin/pages/product/create.pug", {
    title: "Create a product",
    listCategory: listCategory,
  });
};

//# [POST] create a product
module.exports.createProduct = async (req, res) => {
  // convert string to int
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.price = parseInt(req.body.price);

  // auto grow up number postition
  if (req.body.position.trim() == "") {
    req.body.position = (await productModel.countDocuments({})) + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  // save the log history account create or update and get their data
  req.body.createdBy = {
    account_id: res.locals.account.id,
  };

  //end

  //create new product
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

    //list category
    //get all category
    let listCategory = await productCategory.find({
      deleted: false,
    });
    //end

    listCategory = devideCategory.createLevelCategory(listCategory);
    //end

    const productObj = await productModel.findOne(findCondition);

    res.render("admin/pages/product/edit.pug", {
      title: "Edit page",
      product: productObj,
      listCategory: listCategory,
    });
  } catch (error) {
    req.flash("error", "Stop your shit!");
    res.redirect(`${systemConfig.prefixAdmin}/product`);
  }
};

//#[PATCH] update a product
module.exports.editProductPatch = async (req, res) => {
  // get data from client
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.price = parseInt(req.body.price);
  req.body.position = parseInt(req.body.position);
  //end

  // check image update
  if (req.file) {
    req.body.thumbnail = `/upload/${req.file.filename}`;
  }

  //end

  try {
    // log update
    const updatedBy = {
      account_id: res.locals.account.id,
      updatedAt: Date.now(),
    };
    //end
    await productModel.updateOne(
      { _id: req.params.id },
      {
        ...req.body,
        $push: { updatedBy: updatedBy },
      }
    );
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
    // find product detail
    const findCondition = {
      _id: req.params.id,
      deleted: false,
    };
    const product = await productModel.findOne(findCondition);

    // check detail category
    const category = await productCategory.findOne({
      _id: product.category_id,
    });

    //end

    // render to page
    res.render(`admin/pages/product/detail.pug`, {
      title: product.title,
      product: product,
      category: category,
    });

    //end
  } catch (error) {}
};

module.exports.productCategory = async (req, res) => {
  res.send("oke");
};
