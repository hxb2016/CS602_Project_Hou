const customerDB = require("../../customerDB.js");
const Customer = customerDB.getModel();

module.exports = async (req, res, next) => {
  Customer.updateOne(
    { customerID: req.body.customerID },
    {
      orders: req.body.orders,
    },
    function (err, results) {
      if (err) throw err;
      res.format({
        // JSON format
        "application/json": function () {
          res.json({ statusCode: 200, message: "Success" });
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
