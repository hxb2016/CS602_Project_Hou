const request = require("request");

module.exports = async (req, res, next) => {
  // Get all products via request
  request(
    "http://localhost:3000/get/allProducts",
    { json: true },
    (err, result, body) => {
      if (err) throw err;
      // Render the page after getting data
      res.render("displayProductsView", {
        title: "List of Products for merchant",
        data: body,
      });
    }
  );
};
