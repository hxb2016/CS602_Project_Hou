const request = require("request");

module.exports = async (req, res, next) => {
  // Get the customer via customer id
  request("http://localhost:3000/search/customer/" + req.params.customerID,
    { json: true },
    (err, result, body) => {
      if (err) throw err;

      // Render the page after getting data
      res.render("displayCustomerView", {
          title: "Your List of orders",
          data: {
            customerID: body.customerID,
            firstName: body.firstName,
            lastName: body.lastName,
            orders: body.orders,
          },
        });
    }
  );
};
