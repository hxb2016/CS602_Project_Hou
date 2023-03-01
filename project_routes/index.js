const express = require("express");
const router = express.Router();

// REST API modules
const getAllProducts = require("./rest_apis/getAllProducts");
const searchProductsByName = require("./rest_apis/searchProductsByName");
const searchProductsByDes = require("./rest_apis/searchProductsByDes");
const deleteProductByID = require("./rest_apis/deleteProduct");
const deleteOrder = require("./rest_apis/deleteOrder");
const searchCustomerById = require("./rest_apis/searchCustomerById");
const insertProduct = require("./rest_apis/insertProduct");
const searchProductsById = require("./rest_apis/searchProductsById");
const updateProduct = require("./rest_apis/updateProduct");
const updateCustomerOrder = require('./rest_apis/updateCustomerOrder');
const getAllCustomers = require('./rest_apis/getAllCustomers');
const searchProductsByPrice=require('./rest_apis/searchProductsByPrice')

// Other modules
const searchProducts = require("./customer/searchProducts");
const dispalyCustomer = require("./customer/displayCustomer");
const customerAddOrders = require("./customer/customerAddOrders");
const submitOrders = require("./customer/submitOrders");

const adminInterface = require("./admin/adminInterface");
const showCustomers = require("./admin/showCustomers");
const showCustomerSelected = require("./admin/showCustomerSelected");
const deleteHistoryOrdersAfterConfirm = require("./admin/deleteHistoryOrdersAfterConfirm");
const deleteHistoryOrders = require("./admin/deleteHistoryOrders");
const editHistoryOrders = require("./admin/editHistoryOrders");
const editHistoryOrdersAfterEdit = require("./admin/editHistoryOrdersAfterEdit");

const showProducts = require("./admin/showProducts");
const editProduct = require("./admin/editProduct");
const editProductAfterEdit = require("./admin/editProductAfterEdit");
const deleteProduct = require("./admin/deleteProduct");
const deleteProductAfterConfirm = require("./admin/deleteProductAfterConfirm");
const addProduct = require("./admin/addProduct");
const addProductAfterConfirm = require("./admin/addProductAfterConfirm");
const addOrder = require('./rest_apis/addOrder');

// Router specs
router.get("/", function (req, res, next) {
  res.redirect("/customers/1");
});

router.get("/products/search", searchProducts);

router.get("/customers/:customerID", dispalyCustomer);
router.get("/customers/addOrders/:customerID", customerAddOrders);
router.post("/customers/addOrders", submitOrders);

router.get("/admin", adminInterface);
router.get("/admin/display/customers", showCustomers);
router.get("/admin/display/customers/:customerID", showCustomerSelected);
router.get("/admin/deleteOrder/:customerID/:index", deleteHistoryOrders);
router.post("/admin/deleteOrder", deleteHistoryOrdersAfterConfirm);
router.get("/admin/editOrder/:customerID/:index", editHistoryOrders);
router.post("/admin/editOrder", editHistoryOrdersAfterEdit);

router.get("/admin/show/products", showProducts);
router.get("/admin/editProduct/:productID", editProduct);
router.post("/admin/editProduct", editProductAfterEdit);

router.get("/admin/deleteProduct/:productID", deleteProduct);
router.post("/admin/deleteProduct", deleteProductAfterConfirm);

router.get("/admin/add/product", addProduct);
router.post("/admin/add/product", addProductAfterConfirm);

// REST APIs
router.get("/get/allProducts", getAllProducts);
router.get("/search/byName/:name", searchProductsByName);
router.get("/search/byPrice/:high/:low", searchProductsByPrice);
router.get("/search/byDes/:des", searchProductsByDes);
router.get("/search/byID/:productID", searchProductsById);
router.post("/delete/product", deleteProductByID);
router.post("/delete/order", deleteOrder);
router.get("/search/customer/:customerID", searchCustomerById);
router.post("/insert/product", insertProduct);
router.post("/update/product", updateProduct);
router.post("/update/customerOrder", updateCustomerOrder);
router.get("/get/allCustomers", getAllCustomers);
router.post("/add/order", addOrder);

module.exports = router;
