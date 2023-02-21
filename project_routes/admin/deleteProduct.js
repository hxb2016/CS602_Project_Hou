const productDB = require("../../productDB.js");
const Product = productDB.getModel();

module.exports = async (req, res, next) => {

  let productID = req.params.productID;
  let currentProduct = await Product.find({ productID: productID });
  currentProduct = currentProduct[0];


  res.render("deleteProductView", {
    title: "Delete Product",
    data: {
      productID: productID,
      name: currentProduct.name,
      description: currentProduct.description,
      price: currentProduct.price,
      quantity: currentProduct.quantity,
    },
  });
};
