const request = require("request");


// display orders of certain customer

module.exports = async (req, res, next) => {
  request(
    "http://localhost:3000/get/allCustomers",
    { json: true },
    (err, result, body) => {
      if (err) throw err;
      res.render("showCustomersView", {
        title: "List of customers",
        data: body,
      });
    }
  );

};
