const request = require("request");

module.exports = async (req, res, next) => {
  let productID = req.params.productID;
  // Get the product via product id
  request(
    "http://localhost:3000/search/byID/" + productID,
    { json: true },
    (err, result, body) => {
      if (err) throw err;
      // Show the product information
      res.render("editProductView", {
        title: "Edit a Product",
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
