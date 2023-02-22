const ProductDB = require("../../productDB");
const Product = ProductDB.getModel();

module.exports = async (req, res, next) => {
  let products = await Product.find();

  let result = products.map((emp) => {
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
      res.json(result);
    },
    // XML format
    "application/xml": function () {
      let resultXml = ['<?xml version="1.0"?>'];
      resultXml.push("<products>");

      result.forEach((element) => {
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
