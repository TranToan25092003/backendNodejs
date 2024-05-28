module.exports = (keyword, condition) => {
  if (keyword) {
    const regex = new RegExp(keyword, "i");
    condition.title = regex;
  } else {
    delete condition.title;
  }
};
