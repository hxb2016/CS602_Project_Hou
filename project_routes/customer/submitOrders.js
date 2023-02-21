const ProductDB = require("../../productDB.js");
const CustomerDB = require("../../customerDB.js");

const Product = ProductDB.getModel();
const Customer = CustomerDB.getModel();

module.exports = async (req, res, next) => {
  let customerID = req.params.customerID;
  let currentCustomer = await Customer.find({
    customerID: customerID,
  });

  let productsSelected = currentCustomer[0].orders;

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

      productsSelected.push({
        customerID:customerID,
        productID: productID,
        name: productNames[index],
        description: descriptions[index],
        price: prices[index],
        amount: amount,
        date: new Date().toLocaleString(),
      });

      await Product.updateOne(
        { productID: productID },
        {
          quantity: quantity - amount,
        }
      );
    }
  }

  await Customer.updateOne(
    { customerID: customerID },
    {
      orders: productsSelected,
    },
    function (err, results) {
      if (err) throw err;
      res.redirect("/customers/" + customerID);
    }
  );
};
