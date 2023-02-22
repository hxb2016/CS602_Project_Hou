const ProductDB = require("../../productDB.js");
const Product = ProductDB.getModel();

// display employees

module.exports = async (req, res, next) => {
  // Find product from database via product id
  Product.find({ productID: req.params.productID }, function (err, result) {
    if (err) throw err;
    res.format({
      // JSON format
      "application/json": function () {
        res.json(result[0]);
      },
      // XML format
      "application/xml": function () {
        let resultsXml = `<product>
        <productID>${result[0].productID}</productID>
        <name>${result[0].name}</name>
        <description>${result[0].description}</description>
        <price>${result[0].price}</price>
        <quantity>${result[0].quantity}</quantity>
        </product>`;

        res.type("application/xml");
        res.send(resultsXml);
      },
    });
  });
};
