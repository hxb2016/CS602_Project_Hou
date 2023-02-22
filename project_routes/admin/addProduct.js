module.exports = async (req, res, next) => {
  res.render("addProductView", {
    title: "Add a Product"
  });
};
