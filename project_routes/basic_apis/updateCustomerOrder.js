const customerDB = require("../../customerDB.js");
const Customer = customerDB.getModel();
const request = require("request");

module.exports = async (req, res, next) => {
  request(
    "http://localhost:3000/search/customer/" + req.body.customerID,
    { json: true },
    (err, result, body) => {
      if (err) throw err;

      let historyOrders = body.orders;
      let currentOrder;

      for (let i = 0; i < historyOrders.length; i++) {
        let cell = historyOrders[i];
        if (cell.productID == req.body.productID) {
          currentOrder = cell;
          currentOrder.name = req.body.name;
          currentOrder.description = req.body.description;
          currentOrder.price = req.body.price;
          currentOrder.amount = req.body.amount;
          break;
        }
      }

      Customer.updateOne(
        { customerID: req.body.customerID },
        {
          orders: historyOrders,
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
