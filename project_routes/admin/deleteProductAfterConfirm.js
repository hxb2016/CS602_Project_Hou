const productDB = require("../../productDB.js");
const Product = productDB.getModel();

module.exports = async (req, res, next) => {
  let productID = req.params.productID;

  await Product.deleteOne(
    { productID: productID },
    function (err, results) {
      if (err) throw err;
      res.redirect("/admin/show/products");
    }
  );
};
