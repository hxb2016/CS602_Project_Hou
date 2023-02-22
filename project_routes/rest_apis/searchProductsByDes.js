const ProductDB = require("../../productDB.js");
const Product = ProductDB.getModel();

// display employees

module.exports = async (req, res, next) => {
  let productDes = req.params.des;

  // Find all products from database via a key words in description
  Product.find({ description: { $regex: productDes } }, function (err, result) {
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
