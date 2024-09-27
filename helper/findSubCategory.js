const productCategory = require("../model/product.category.model");

module.exports.findAllSubCategory = async (parentId) => {
  const findAllSubCategory = async (parentId) => {
    // find all sub category of current category
    const listCategory = await productCategory.find({
      parent_id: parentId,
      deleted: false,
      status: "active",
    });
    // end

    const result = [...listCategory];
    // find grandchild
    for (const i of listCategory) {
      const grandChild = await findAllSubCategory(i.id);
      result.concat(grandChild);
    }
    //end

    return result;
  };
  //function export can not call recusion
  const result = await findAllSubCategory(parentId);

  return result;
};
