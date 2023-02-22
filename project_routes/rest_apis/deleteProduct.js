const productDB = require("../../productDB.js");
const Product = productDB.getModel();

module.exports = async (req, res, next) => {
  let productID = req.body.productID;

  // Delete one product data from database via product id
  await Product.deleteOne({ productID: productID }, function (err, results) {
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
