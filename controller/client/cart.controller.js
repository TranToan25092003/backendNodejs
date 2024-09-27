const cartModel = require("../../model/Cart.model");
const productModel = require("../../model/product.model");
const calculateNewPriceHelper = require("../../helper/calculateNewPrice");

//# [/cart/add/:id]
module.exports.addToCart = async (req, res) => {
  // get data from client
  const productId = req.params.id;
  const cartId = req.cookies.cartId;
  const quantityProduct = parseInt(req.body.quantity);
  //end

  // find exist product in cart
  const cart = await cartModel.findOne({
    _id: cartId,
  });

  const checkExistProduct = cart.products.find((item) => {
    return item.product_id === productId;
  });

  //end

  if (checkExistProduct) {
    // already exist product in cart

    const newQuantity = quantityProduct + checkExistProduct.quantity;
    await cartModel.updateOne(
      {
        _id: cartId,
        "products.product_id": productId,
      },
      {
        "products.$.quantity": newQuantity,
      }
    );
  } else {
    // if there is not product in cart yet
    const obejctProduct = {
      product_id: productId,
      quantity: quantityProduct,
    };
    // update cart
    await cartModel.updateOne(
      {
        _id: cartId,
      },
      { $push: { products: obejctProduct } } // push data in to an array in mongo
    );
    //end
  }

  req.flash("success", "Add to cart success");

  res.redirect("back");
};

//# [/cart]
// navigation to cart page
module.exports.cart = async (req, res) => {
  // get detail cart
  const cartId = req.cookies.cartId;
  const cart = await cartModel.findOne({
    _id: cartId,
  });
  //end

  // get detail for each product
  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const productId = item.product_id;
      item.productDetail = await productModel.findOne({
        _id: productId,
      });
      calculateNewPriceHelper.calculateANewPrice(item.productDetail);
      item.sumPrice = (item.productDetail.newPrice * item.quantity).toFixed(2);
    }
    cart.totalPrice = cart.products.reduce((sum, item) => {
      return (sum += parseFloat(item.sumPrice));
    }, 0);
  }
  //end

  res.render("client/pages/cart/index.pug", {
    cart: cart,
  });
};

//# [/cart/delete/:id]
// delete product from cart
module.exports.deleteProductInCart = async (req, res) => {
  const idProduct = req.params.id;
  const cartId = req.cookies.cartId;

  // remove an object in mongodb
  await cartModel.updateOne(
    {
      _id: cartId,
    },
    {
      $pull: {
        products: { product_id: idProduct },
      },
    }
  );
  //end

  req.flash("success", "delete successfully");
  res.redirect("back");
};
//end

//# [/cart/update/:productId/:quantity]
// update cart
module.exports.updateCart = async (req, res) => {
  const productId = req.params.productId;
  const cartId = req.cookies.cartId;
  const productQuantity = req.params.quantity;

  // update an object in mongodb
  await cartModel.updateOne(
    {
      _id: cartId,
      "products.product_id": productId,
    },
    {
      "products.$.quantity": productQuantity,
    }
  );
  //end

  res.redirect("back");
};
//end
