const request = require("request");

module.exports = async (req, res, next) => {
  let productName = req.query.name;
  let productDes = req.query.des;

  

  if (!productName && !productDes) {
    res.redirect("/products");
  } else {
    if (productName) {
      request(
        "http://localhost:3000/search/byName/" + productName,
        { json: true },
        (err, result, body) => {
          if (err) throw err;
          res.render("displayProductsView", {
            title: "Results of searching",
            data: body,
          });
        }
      );
    } else {
      request(
        "http://localhost:3000/search/byDes/" + productDes,
        { json: true },
        (err, result, body) => {
          if (err) throw err;
          res.render("displayProductsView", {
            title: "Results of searching",
            data: body,
          });
        }
      );
    }
  }
};
