const request = require("request");

module.exports = async (req, res, next) => {
  // Get key words from request
  let productName = req.query.name;
  let productDes = req.query.des;

  // If there is no key words
  if (!productName && !productDes) {
    res.redirect("/customers/addOrders/" + req.query.customerID);
  } else {
    // If the key words is about name
    if (productName) {
      request(
        "http://localhost:3000/search/byName/" + productName,
        { json: true },
        (err, result, body) => {
          if (err) throw err;
          res.render("addOrdersView", {
            title: "Results of searching",
            data: {
              products: body,
              customerID: req.query.customerID,
            },
          });
        }
      );
    } else {
      // If the key words is about description
      request(
        "http://localhost:3000/search/byDes/" + productDes,
        { json: true },
        (err, result, body) => {
          if (err) throw err;
          res.render("addOrdersView", {
            title: "Results of searching",
            data: {
              products: body,
              customerID: req.query.customerID,
            },
          });
        }
      );
    }
  }
};
