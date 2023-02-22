const customerDB = require("../../customerDB.js");
const Customer = customerDB.getModel();

module.exports = async (req, res, next) => {
  let customerID = req.params.customerID;
  let currentCustomer = await Customer.find({ customerID: customerID });
  currentCustomer = currentCustomer[0];
  res.format({
    // JSON format
    "application/json": function () {
      res.json(currentCustomer);
    },
    // XML format
    "application/xml": function () {
      let resultXml = `<?xml version="1.0"?>
      <customer>
      <customerID>${currentCustomer.productID}</customerID>
      <firstName>${currentCustomer.firstName}</firstName>
      <lastName>${currentCustomer.lastName}</lastName>
      <orders>`;

      let orders = [];
      currentCustomer.orders.forEach((element) => {
        let cell = `<order>
        <productID>${element.productID}</productID>
        <name>${element.name}</name>
        <description>${element.description}</description>
        <price>${element.price}</price>
        <amount>${element.amount}</amount>
        <date>${element.date}</date>
        </order>`;
        orders.push(cell);
      });

      resultXml = [resultXml, orders.join("\n"), `</orders>\n</customer>`].join("\n");

      res.type("application/xml");
      res.send(resultXml);
    },
  });
};
