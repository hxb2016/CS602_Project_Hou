const express = require('express');
const router = express.Router();

// other modules
const displayProducts = require("./merchant/displayProducts");
const searchProducts = require("./merchant/searchProducts");

const dispalyCustomer = require("./customer/displayCustomer");
const addOrders = require("./customer/addOrders");
const submitOrders = require("./customer/submitOrders");

const showCustomers = require('./admin/showCustomers');
const showCustomerSelected = require('./admin/showCustomerSelected');
const deleteHistoryOrdersAfterConfirm = require("./admin/deleteHistoryOrdersAfterConfirm");
const deleteHistoryOrders = require('./admin/deleteHistoryOrders');
const editHistoryOrders = require("./admin/editHistoryOrders");
const editHistoryOrdersAfterEdit = require('./admin/editHistoryOrdersAfterEdit');

const showProducts = require("./admin/showProducts");
const editProduct = require("./admin/editProduct");
const editProductAfterEdit = require('./admin/editProductAfterEdit');
const deleteProduct = require("./admin/deleteProduct");
const deleteProductAfterConfirm = require('./admin/deleteProductAfterConfirm');
const addProduct = require("./admin/addProduct");
const addProductAfterConfirm = require('./admin/addProductAfterConfirm');


// router specs
router.get('/', function (req, res, next) {
  res.redirect('/products');
});

router.get('/products', displayProducts);
router.get('/products/search', searchProducts);

router.get('/customers/:customerID', dispalyCustomer);
router.get('/customers/addOrders/:customerID', addOrders);
router.post('/customers/addOrders/:customerID', submitOrders);

router.get('/admin', showCustomers);
router.get('/admin/:customerID', showCustomerSelected);
router.get('/admin/delete/:customerID/:productID', deleteHistoryOrders);
router.post('/admin/delete/:customerID/:productID', deleteHistoryOrdersAfterConfirm);

router.get('/admin/edit/:customerID/:productID', editHistoryOrders);
router.post('/admin/edit/:customerID/:productID', editHistoryOrdersAfterEdit);

router.get('/admin/show/products', showProducts);
router.get('/admin/editProduct/:productID', editProduct);
router.post('/admin/editProduct/:productID', editProductAfterEdit);

router.get('/admin/deleteProduct/:productID', deleteProduct);
router.post('/admin/deleteProduct/:productID', deleteProductAfterConfirm);

router.get('/admin/add/product', addProduct);
router.post('/admin/add/product', addProductAfterConfirm);




module.exports = router;
