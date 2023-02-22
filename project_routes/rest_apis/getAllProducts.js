const ProductDB = require("../../productDB");
const Product = ProductDB.getModel();

module.exports = async (req, res, next) => {
  // Find all products from database
  let products = await Product.find();

  // Create the response data format
  res.format({
    // JSON format
    "application/json": function () {
      res.json(products);
    },
    // XML format
    "application/xml": function () {
      let resultXml = ['<?xml version="1.0"?>'];
      resultXml.push("<products>");

      products.forEach((element) => {
        let cell = `<product>
        <productID>${element.productID}</productID>
				<name>${element.name}</name>
        <description>${element.description}</description>
        <price>${element.price}</price>
        <quantity>${element.quantity}</quantity>
				</product>`;

        resultXml.push(cell);
      });
      resultXml.push("</products>");
      res.type("application/xml");
      res.send(resultXml.join("\n"));
    },
  });
};
