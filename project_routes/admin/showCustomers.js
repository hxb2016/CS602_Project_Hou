const request = require("request");

module.exports = async (req, res, next) => {
  // Get all customers data in database
  request(
    "http://localhost:3000/get/allCustomers",
    { json: true },
    (err, result, body) => {
      if (err) throw err;
      // Render the page to show the information of all the customer
      res.render("showCustomersView", {
        title: "List of customers",
        data: body,
      });
    }
  );

};
