module.exports = async (req, res, next) => {
  // Render page
  res.render("addProductView", {
    title: "Add a Product"
  });
};
