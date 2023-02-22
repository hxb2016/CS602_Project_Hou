const productDB = require("../../productDB.js");
const Product = productDB.getModel();

module.exports = async (req, res, next) => {

  await Product.updateOne(
    { productID: req.body.productID },
    {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
    },
    function (err, results) {
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
    }
  );
};
