const request = require("request");

module.exports = async (req, res, next) => {
  // Get all products data in database
  request(
    "http://localhost:3000/get/allProducts",
    { json: true },
    (err, result, body) => {
      if (err) throw err;
      // Render the page to show all products information
      res.render("showProductsView", {
        title: "Show Products for admin",
        data: body,
      });
    }
  );
};
