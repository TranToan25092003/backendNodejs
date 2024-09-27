module.exports.calculateNewPrice = (listOProduct) => {
  const result = listOProduct.map((item) => {
    item.newPrice = (
      item.price -
      item.price * (item.discountPercentage / 100)
    ).toFixed(2);
    return item;
  });
  return result;
};

module.exports.calculateANewPrice = (item) => {
  item.newPrice = (
    item.price -
    item.price * (item.discountPercentage / 100)
  ).toFixed(2);
};
