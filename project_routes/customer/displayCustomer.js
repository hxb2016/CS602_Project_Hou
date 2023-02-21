const CustomerDB = require("../../customerDB.js");

const Customer = CustomerDB.getModel();

// display orders of certain customer

module.exports = async (req, res, next) => {
  Customer.find({ customerID: req.params.customerID }, function (err, result) {
    if (err) throw err;

    res.render("displayCustomerView", {
      title: "Your List of orders",
      data: {
        customerID: result[0].customerID,
        firstName: result[0].firstName,
        lastName: result[0].lastName,
        orders: result[0].orders
      },
    });
    
  });
};
