const request = require("request");

module.exports = async (req, res, next) => {
  let customerID = req.body.customerID;

  request(
    "http://localhost:3000/search/customer/" + customerID,
    { json: true },
    async (err, result, body) => {
      if (err) throw err;

      let orders = body.orders;

      let dict = req.body;
      let productIDs = dict["productIDs"];
      let productNames = dict["names"];
      let descriptions = dict["descriptions"];
      let prices = dict["prices"];
      let quantitys = dict["quantitys"];
      let amounts = dict["amounts"];

      for (let index in amounts) {
        let amount = amounts[index].trim();

        if (amount > 0) {
          let quantity = quantitys[index];
          let productID = productIDs[index];

          orders.push({
            customerID: customerID,
            productID: productID,
            name: productNames[index],
            description: descriptions[index],
            price: prices[index],
            amount: amount,
            date: new Date().toLocaleString(),
          });

          request(
            {
              url: "http://localhost:3000/update/product",
              method: "POST",
              json: true,
              headers: {
                "content-type": "application/json",
              },
              body: {
                productID: productID,
                name: productNames[index],
                description: descriptions[index],
                price: prices[index],
                quantity: quantity - amount,
              },
            },
            function (err, result, body) {
              if (err) throw err;
            }
          );
        }
      }

      request(
        {
          url: "http://localhost:3000/add/order",
          method: "POST",
          json: true,
          headers: {
            "content-type": "application/json",
          },
          body: {
            customerID: customerID,
            orders: orders,
          },
        },
        function (err, result, body) {
          if (err) throw err;
          res.redirect("/customers/" + customerID);
        }
      );
    }
  );
};
