const ProductDB = require("../../productDB.js");
const Product = ProductDB.getModel();

// display employees

module.exports = async (req, res, next) => {
  let high = req.params.high;
  let low = req.params.low;

  Product.find({ price: { $gt: low, $lt: high } }, function (err, result) {
    if (err) throw err;

    let results = result.map((emp) => {
      return {
        productID: emp.productID,
        name: emp.name,
        description: emp.description,
        price: emp.price,
        quantity: emp.quantity,
      };
    });

    res.format({
      // JSON format
      "application/json": function () {
        res.json(results);
      },
      // XML format
      "application/xml": function () {
        let resultsXml = ['<?xml version="1.0"?>'];
        resultsXml.push("<products>");

        results.forEach((element) => {
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
