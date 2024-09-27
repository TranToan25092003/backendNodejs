let count = 0;

//# devide level in category
const devideCategory = (arr, parenId = "") => {
  const treeCategory = [];

  arr.forEach((item) => {
    if (item.parent_id == parenId) {
      // found children
      count++;
      const parent = item;
      parent.index = count;
      const children = devideCategory(arr, item._id);
      if (children.length > 0) {
        // if children exist
        parent.children = children;
      }
      treeCategory.push(parent);
    }
  });
  return treeCategory;
};

module.exports.createLevelCategory = (arr) => {
  count = 0; // reset index
  return devideCategory(arr);
};
