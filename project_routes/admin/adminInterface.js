module.exports = async (req, res, next) => {
    res.render("adminInterfaceView", {
      title: "Admin Interface"
    });
};
