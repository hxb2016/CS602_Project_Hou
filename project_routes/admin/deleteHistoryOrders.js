const request = require("request");

module.exports = async (req, res, next) => {
  let customerID = req.params.customerID;
  let productID = req.params.productID;

  request(
    "http://localhost:3000/search/customer/" + customerID,
    { json: true },
    (err, result, body) => {
      if (err) throw err;
      let historyOrders = body.orders;
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
    }
  );
};
