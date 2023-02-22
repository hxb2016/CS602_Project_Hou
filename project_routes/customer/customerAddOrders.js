const request = require("request");

module.exports = async (req, res, next) => {
  // Get all products in database
  request(
    "http://localhost:3000/get/allProducts",
    { json: true },
    (err, result, body) => {
      if (err) throw err;
      // Render the page after getting data
      res.render("addOrdersView", {
        title: "Add orders",
        data: {
          products: body,
          customerID: req.params.customerID,
        },
      });

    }
  );
};
