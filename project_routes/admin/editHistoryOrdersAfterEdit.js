const customerDB = require("../../customerDB.js");
const Customer = customerDB.getModel();

module.exports = async (req, res, next) => {
  let customerID = req.params.customerID;
  let productID = req.params.productID;

  let currentCustomer = await Customer.find({ customerID: customerID });
  let historyOrders = currentCustomer[0].orders;
  let currentOrder;

  for (let i = 0; i < historyOrders.length; i++) {
    let cell = historyOrders[i];
    if (cell.productID == productID) {
      currentOrder = cell;

      currentOrder.name = req.body.name;
      currentOrder.description = req.body.description;
      currentOrder.price = req.body.price;
      currentOrder.amount = req.body.amount;
      
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
