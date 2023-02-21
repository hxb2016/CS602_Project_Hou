const CustomerDB = require("../../customerDB.js");

const Customer = CustomerDB.getModel();

// display orders of certain customer

module.exports = async (req, res, next) => {

  Customer.find(function (err, result) {
    if (err) throw err;
    let results = result.map((emp) => {
      return {
        customerID: emp.customerID,
        firstName: emp.firstName,
        lastName: emp.lastName
      };
    });

    res.render("showCustomersView", {
      title: "Your List of customers",
      data: results,
    });
    
  });
};
