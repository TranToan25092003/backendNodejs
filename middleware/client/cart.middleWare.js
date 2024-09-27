const Cart = require("../../model/Cart.model");

module.exports.CartId = async (req, res, next) => {
  // check cart id exist in cookie
  const cartId = req.cookies.cartId;
  if (!cartId) {
    // not exist
    const cart = new Cart(); // creat a new cart
    await cart.save(); // add cart to db

    // time expires
    const timeExpires = 1000 * 60 * 60 * 24 * 7;

    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + timeExpires), // set time expires
    }); // save cartId to cookie
  } else {
    // exist cart
    const cart = await Cart.findOne({
      _id: cartId,
    });
    // sum quantity product in cart
    cart.totalQuantity = cart.products.reduce((sum, item) => {
      return (sum += item.quantity);
    }, 0);

    res.locals.miniCart = cart;
  }
  next();
};
