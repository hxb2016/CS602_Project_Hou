function addOrders(customerID) {
  window.location.href = "/customers/addOrders/" + customerID;
}

function cancelAddOrders(customerID) {
  window.location.href = "/customers/" + customerID;
}

function cancelDelete(customerID) {
  window.location.href = "/admin/" + customerID;
}

function cancelEdit(customerID) {
  window.location.href = "/admin/" + customerID;
}

function cancelEditProduct() {
  window.location.href = "/admin/show/products";
}

function cancelDeleteProduct() {
  window.location.href = "/admin/show/products";
}

function onclickAddProduct() {
  window.location.href = "/admin/add/product";
}

function cancelAddProduct() {
  window.location.href = "/admin/show/products";
}

function backToAdmin() {
  window.location.href = "/admin";
}
