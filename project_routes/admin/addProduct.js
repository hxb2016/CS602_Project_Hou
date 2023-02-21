const productDB = require("../../productDB.js");
const Product = productDB.getModel();

module.exports = async (req, res, next) => {
  let products = await Product.find();
  let productIDs = [];

  products.forEach((element) => {
    productIDs.push(element.productID);
  });
  productIDs.sort((a, b) => b - a);

  res.render("addProductView", {
    title: "Add a Product",
    productID: productIDs[0] + 1,
  });
};
