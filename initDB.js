const ProductDB = require("./productDB.js");
const CustomerDB = require("./customerDB.js");

const Product = ProductDB.getModel();
const Customer = CustomerDB.getModel();

(async () => {
  await Product.deleteMany({});
  await Customer.deleteMany({});

  let product1 = new Product({
    productID: 1,
    name: "Inspiron-16",
    description: "DELL laptop i7-12700H",
    price: 1642,
    quantity: 1000,
  });

  let product2 = new Product({
    productID: 2,
    name: "Inspiron-14",
    description: "DELL laptop i7-12700H",
    price: 1142,
    quantity: 1000,
  });

  let product3 = new Product({
    productID: 3,
    name: "Inspiron-14",
    description: "DELL laptop i5-1240P",
    price: 728,
    quantity: 1000,
  });

  let product4 = new Product({
    productID: 4,
    name: "Latitude-7430",
    description: "DELL laptop i7-1265U",
    price: 1374,
    quantity: 1000,
  });

  let product5 = new Product({
    productID: 5,
    name: "Precision-7670",
    description: "DELL workstation i7-12850HX",
    price: 3299,
    quantity: 1000,
  });

  let customer1 = new Customer({
    customerID: 1,
    firstName: "Xiaobing",
    lastName: "Hou",
    orders: [],
  });

  let customer2 = new Customer({
    customerID: 2,
    firstName: "Tim",
    lastName: "Tim",
    orders: [],
  });

  await Promise.all([
    product1.save(),
    product2.save(),
    product3.save(),
    product4.save(),
    product5.save(),
    customer1.save(),
    customer2.save(),
  ]);

  let currentProduct = await Product.find({});
  let currentCustomer = await Customer.find({});

  console.log(currentProduct);
  console.log(currentCustomer);

  process.exit();
})();
