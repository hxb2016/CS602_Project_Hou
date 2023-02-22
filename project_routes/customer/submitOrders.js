const request = require("request");

module.exports = async (req, res, next) => {
  let customerID = req.body.customerID;

  // Get the customer via customer id
  request(
    "http://localhost:3000/search/customer/" + customerID,
    { json: true },
    (err, result, body) => {
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

        // Find all the products you selected
        if (amount > 0) {
          let quantity = quantitys[index];
          let productID = productIDs[index];

          // Append the new order into current customer's orders
          orders.push({
            customerID: customerID,
            productID: productID,
            name: productNames[index],
            description: descriptions[index],
            price: prices[index],
            amount: amount,
            date: new Date().toLocaleString(),
          });

          // Update the product's quantity you ordered
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
                quantity: quantity - amount, // Update quantity
              },
            },
            function (err, result, body) {
              if (err) throw err;
            }
          );
        }
      }

      // Update the customer's orders
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
