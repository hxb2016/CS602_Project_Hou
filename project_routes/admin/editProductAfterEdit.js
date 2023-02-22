const request = require("request");

module.exports = async (req, res, next) => {
  // Update the product information
  request(
    {
      url: "http://localhost:3000/update/product",
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body: req.body,
    },
    function (err, result, body) {
      if (err) throw err;
      // Turn back
      res.redirect("/admin/show/products");
    }
  );
};
