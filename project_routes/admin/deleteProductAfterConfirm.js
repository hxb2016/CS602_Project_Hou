const request = require("request");

module.exports = async (req, res, next) => {

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
      res.redirect("/admin/show/products");
    }
  );
};
