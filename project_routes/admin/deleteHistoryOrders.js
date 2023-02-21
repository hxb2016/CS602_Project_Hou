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
      break;
    }
  }

  res.render("deleteHistoryOrderView", {
    title: "Delete History Order",
    data: {
      productID: productID,
      name: currentOrder.name,
      description: currentOrder.description,
      price: currentOrder.price,
      amount: currentOrder.amount,
      date: currentOrder.date,
      customerID: customerID,
    },
  });
};
