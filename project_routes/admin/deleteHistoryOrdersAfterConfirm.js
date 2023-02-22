const request = require("request");

module.exports = async (req, res, next) => {
  // Delete current customer's one order
  request(
    {
      url: "http://localhost:3000/delete/order",
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body: req.body,
    },
    function (err, result, body) {
      if (err) throw err;
      // Turn back
      res.redirect("/admin/display/customers/" + req.body.customerID);
    }
  );
};
