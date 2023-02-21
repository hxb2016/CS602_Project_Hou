const customerDB = require("../../customerDB.js");
const Customer = customerDB.getModel();

module.exports = async (req, res, next) => {
  let customerID = req.params.customerID;
  let productID = req.params.productID;

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
      res.redirect("/admin/" + customerID);
    }
  );
};
