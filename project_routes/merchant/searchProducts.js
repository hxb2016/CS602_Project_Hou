const ProductDB = require("../../productDB.js");
const Product = ProductDB.getModel();

// display employees

module.exports = async (req, res, next) => {
  let productName = req.query.product_name;
  let productDes = req.query.des;

  if (!productName && !productDes) {
    res.redirect("/products");
  } else {
    let key = {};
    if (productName) {
      key = { name: { $regex: productName } };
    } else {
      key = { description: { $regex: productDes } };
    }

    Product.find(key, function (err, result) {
      if (err) throw err;

      let results = result.map((emp) => {
        return {
          productID: emp.productID,
          name: emp.name,
          description: emp.description,
          price: emp.price,
          quantity: emp.quantity,
        };
      });
      res.render("displayProductsView", {
        title: "Results of searching",
        data: results,
      });
    });
  }
};
