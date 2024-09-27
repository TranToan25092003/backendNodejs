const checkoutModel = require("../../model/Order.model");
const cartModel = require("../../model/Cart.model");
const productModel = require("../../model/product.model");
const calculateNewPriceHelper = require("../../helper/calculateNewPrice");

module.exports.checkout = async (req, res) => {
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

  res.render("client/pages/checkout/index.pug", {
    cart: cart,
  });
};

//# [/checkout/order]
module.exports.checkoutCard = async (req, res) => {
  //get the cart checkout
  const cartId = req.cookies.cartId;
  const cart = await cartModel.findOne({
    _id: cartId,
  });
  //end

  // get all product in cart
  const products = [];
  for (const product of cart.products) {
    const productObject = {
      // create object product in order to insert into Order collection
      product_id: product.product_id,
      quantity: product.quantity,
    };

    const inforProduct = await productModel.findOne({
      // get information of product
      _id: product.product_id,
    });

    productObject.price = inforProduct.price; // add price
    productObject.discountPercentage = inforProduct.discountPercentage; // add discountpercentage
    products.push(productObject); // add productOject to array outside to insert into db
  }
  //end

  // insert into db order informaiton

  const newOrder = new checkoutModel({
    cart_id: cartId,
    userInfo: req.body,
    products: products,
  });
  await newOrder.save();

  //end

  // clear cart
  await cartModel.updateOne(
    {
      _id: cartId,
    },
    {
      products: [],
    }
  );
  //end

  res.redirect(`/checkout/success/${newOrder.id}`);
};
//end

//# [/success/:id]
// navigation to success page order
module.exports.success = async (req, res) => {
  // get data information from client
  const orderId = req.params.id;
  const order = await checkoutModel.findOne({
    _id: orderId,
  });
  //end

  // get product information
  for (const item of order.products) {
    const productInfor = await productModel
      .findOne({
        _id: item.product_id,
      })
      .select("title thumbnail");

    item.prdouctInfor = productInfor; // product inforamtion

    calculateNewPriceHelper.calculateANewPrice(item); // new price

    item.totalPrice = item.newPrice * item.quantity; // total price for each product
  }

  order.totalAmount = order.products.reduce((sum, item) => {
    // total price for all product
    return (sum += item.totalPrice);
  }, 0);

  res.render("client/pages/checkout/success.pug", {
    order: order,
  });
};
//end
