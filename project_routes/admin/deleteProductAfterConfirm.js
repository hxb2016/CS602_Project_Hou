const request = require("request");

module.exports = async (req, res, next) => {

  // Delete one product you want to 
  request(
    {
      url: "http://localhost:3000/delete/product",
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body: { productID: req.body.productID },
    },
    function (err, result, body) {
      if (err) throw err;
      // Turn back
      res.redirect("/admin/show/products");
    }
  );
};
