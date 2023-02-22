const productDB = require("../../productDB.js");
const Product = productDB.getModel();

module.exports = async (req, res, next) => {
  let products = await Product.find();
  let productIDs = [];

  products.forEach((element) => {
    productIDs.push(element.productID);
  });
  productIDs.sort((a, b) => b - a);

  let product = new Product({
    productID: productIDs[0] + 1,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
  });

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
