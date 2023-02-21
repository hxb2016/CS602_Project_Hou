const productDB = require("../../productDB.js");
const Product = productDB.getModel();

module.exports = async (req, res, next) => {
  let productID = req.params.productID;

  let currentProduct = await Product.find({ productID: productID });
  currentProduct = currentProduct[0];

  await Product.updateOne(
    { productID: productID },
    {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
    },
    function (err, results) {
      if (err) throw err;
      res.redirect("/admin/show/products");
    }
  );
};
