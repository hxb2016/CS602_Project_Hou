const productDB = require("../../productDB.js");
const Product = productDB.getModel();

module.exports = async (req, res, next) => {
  // Find all products data in the database
  let products = await Product.find();
  let productIDs = [];

  products.forEach((element) => {
    productIDs.push(element.productID);
  });

  // Reverse sort the products' id
  productIDs.sort((a, b) => b - a);

  // Create a new product
  let product = new Product({
    // Implements id increment
    productID: productIDs[0] + 1,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
  });

  // Insert the new product data into database
  product.save(function (err, result) {
    if (err) throw err;
    res.format({
      // JSON format
      "application/json": function () {
        res.json({ statusCode: 200, message: 'Success' });
      },
      // XML format
      "application/xml": function () {
        let resultXml = `<?xml version="1.0"?>
        <statusCode>200</statusCode>
        <message>Success</message>`;

        res.type("application/xml");
        res.send(resultXml);
      },
    });
  });
};
