const request = require("request");

module.exports = async (req, res, next) => {
  let productID = req.params.productID;
  request(
    "http://localhost:3000/search/byID/" + productID,
    { json: true },
    (err, result, body) => {
      if (err) throw err;

      res.render("deleteProductView", {
        title: "Delete Product",
        data: {
          productID: productID,
          name: body.name,
          description: body.description,
          price: body.price,
          quantity: body.quantity,
        },
      });
    }
  );

};
