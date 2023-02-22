const request = require("request");

module.exports = async (req, res, next) => {
  let customerID = req.params.customerID;
  let index = req.params.index;

  // Find the current customer data via customer id
  request(
    "http://localhost:3000/search/customer/" + customerID,
    { json: true },
    (err, result, body) => {
      if (err) throw err;

      // Find out the order you want delete
      let currentOrder = body.orders[index];

      // Render the delete order page
      res.render("deleteHistoryOrderView", {
        title: "Delete History Order",
        data: {
          index: index,
          productID: currentOrder.productID,
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
