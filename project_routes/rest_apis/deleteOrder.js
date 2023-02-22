const customerDB = require("../../customerDB.js");
const Customer = customerDB.getModel();

module.exports = async (req, res, next) => {
  // Get the current customer id
  let customerID = req.body.customerID;
  // Get the product id you will delete
  let productID = req.body.productID;

  // Get the current customer data from database via customerID
  let currentCustomer = await Customer.find({ customerID: customerID });
  let historyOrders = currentCustomer[0].orders;

  for (let i = 0; i < historyOrders.length; i++) {
    // Find the order you are looking for
    if (historyOrders[i].productID == productID) {
      historyOrders.splice(i, 1);
      break;
    }
  }
// Update current customer
  await Customer.updateOne(
    { customerID: customerID },
    {
      // Update current customer orders.
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
