const ProductDB = require("../../productDB.js");
const Product = ProductDB.getModel();

module.exports = async (req, res, next) => {
  // Get max price and min price
  let high = req.params.high;
  let low = req.params.low;

  // Find all products which price in the range between high and low
  Product.find({ price: { $gt: low, $lt: high } }, function (err, result) {
    if (err) throw err;

    res.format({
      // JSON format
      "application/json": function () {
        res.json(result);
      },
      // XML format
      "application/xml": function () {
        let resultsXml = ['<?xml version="1.0"?>'];
        resultsXml.push("<products>");

        result.forEach((element) => {
          let cell = `<product>
            <productID>${element.productID}</productID>
            <name>${element.name}</name>
            <description>${element.description}</description>
            <price>${element.price}</price>
            <quantity>${element.quantity}</quantity>
            </product>`;

          resultsXml.push(cell);
        });
        resultsXml.push("</products>");
        res.type("application/xml");
        res.send(resultsXml.join("\n"));
      },
    });
  });
};
