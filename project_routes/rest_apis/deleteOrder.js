const customerDB = require("../../customerDB.js");
const Customer = customerDB.getModel();

module.exports = async (req, res, next) => {
  // Get the current customer id
  let customerID = req.body.customerID;
  // Get the index you will delete
  let index = req.body.index;

  // Get the current customer data from database via customerID
  let currentCustomer = await Customer.find({ customerID: customerID });

  // Delete the order
  currentCustomer[0].orders.splice(index, 1);

  // Update current customer
  await Customer.updateOne(
    { customerID: customerID },
    {
      // Update current customer orders.
      orders: currentCustomer[0].orders,
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
