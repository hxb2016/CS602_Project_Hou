const customerDB = require("../../customerDB.js");
const Customer = customerDB.getModel();

module.exports = async (req, res, next) => {
  // Find all customers from database
  Customer.find(function (err, result) {
    if (err) throw err;
    res.format({
      // JSON format
      "application/json": function () {
        res.json(result);
      },
      // XML format
      "application/xml": function () {
        let resultXml = [
          `<?xml version="1.0"?>
        <customers>`,
        ];

        result.forEach((customer) => {
          resultXml.push(`<customer>
          <customerID>${customer.productID}</customerID>
          <firstName>${customer.firstName}</firstName>
          <lastName>${customer.lastName}</lastName>
          <orders>`);

          customer.orders.forEach((element) => {
            let cell = `<order>
            <productID>${element.productID}</productID>
            <name>${element.name}</name>
            <description>${element.description}</description>
            <price>${element.price}</price>
            <amount>${element.amount}</amount>
            <date>${element.date}</date>
            </order>`;
            resultXml.push(cell);
          });

          resultXml.push(`</orders>
                  </customer>`);
        });

        resultXml.push('</customers>')

        res.type("application/xml");
        res.send(resultXml.join("\n"));
      },
    });
  });
};
