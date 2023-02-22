const request = require('request');

// display orders of certain customer

module.exports = async (req, res, next) => {

  let customerID = req.params.customerID;

  request(
    "http://localhost:3000/search/customer/" + customerID,
    { json: true },
    (err, result, body) => {
      if (err) throw err;

      res.render("showCustomerSelectedView", {
        title: "Orders of " + body.firstName + " " + body.lastName,
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
