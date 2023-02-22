const customerDB = require("../../customerDB.js");
const Customer = customerDB.getModel();

module.exports = async (req, res, next) => {
  let customerID = req.body.customerID;
  let productID = req.body.productID;

  let currentCustomer = await Customer.find({ customerID: customerID });
  let historyOrders = currentCustomer[0].orders;

  for (let i = 0; i < historyOrders.length; i++) {
    if (historyOrders[i].productID == productID) {
      historyOrders.splice(i, 1);
      break;
    }
  }

  await Customer.updateOne(
    { customerID: customerID },
    {
      orders: historyOrders,
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
