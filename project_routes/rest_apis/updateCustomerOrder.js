const customerDB = require("../../customerDB.js");
const Customer = customerDB.getModel();
const request = require("request");

module.exports = async (req, res, next) => {
  let customerID = req.body.customerID;
  // Get the customer data via customer id
  request(
    "http://localhost:3000/search/customer/" + customerID,
    { json: true },
    (err, result, body) => {
      if (err) throw err;

      // Find out the order record you are editing
      let currentOrder = body.orders[req.body.index];
      currentOrder.name = req.body.name;
      currentOrder.description = req.body.description;
      currentOrder.price = req.body.price;
      currentOrder.amount = req.body.amount;

      // Update the data you have edited
      Customer.updateOne(
        { customerID: customerID },
        {
          orders: body.orders,
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
    }
  );
};
