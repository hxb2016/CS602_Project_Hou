const request = require("request");

module.exports = async (req, res, next) => {
  let customerID = req.params.customerID;
  let productID = req.params.productID;

  // Find the current customer data via customer id
  request(
    "http://localhost:3000/search/customer/" + customerID,
    { json: true },
    (err, result, body) => {
      if (err) throw err;
      let orders = body.orders;
      let currentOrder;

      for (let i = 0; i < orders.length; i++) {
        let cell = orders[i];
        // Find out the order you want delete
        if (cell.productID == productID) {
          currentOrder = cell;
          break;
        }
      }

      // Render the delete order page
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
