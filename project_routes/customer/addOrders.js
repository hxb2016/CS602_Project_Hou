const ProductDB = require("../../productDB.js");
const Product = ProductDB.getModel();

// display products for customer

module.exports = async (req, res, next) => {
  Product.find(function (err, result) {
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

    res.render("addOrdersView", {
      title: "Add orders",
      data: {
        products: results,
        customerID: req.params.customerID,
      },
    });
  });
};
