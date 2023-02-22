const request = require("request");

module.exports = async (req, res, next) => {
  request(
    "http://localhost:3000/get/allProducts",
    { json: true },
    (err, result, body) => {
      if (err) throw err;
      res.render("displayProductsView", {
        title: "List of Products for merchant",
        data: body,
      });
    }
  );
};
