const productDB = require("../../productDB.js");
const Product = productDB.getModel();

module.exports = async (req, res, next) => {

  let product = new Product({
    productID: req.body.productID,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
  });

  product.save(function (err, result) {
    if (err) throw err;
    res.redirect("/admin/show/products");
  });
};
