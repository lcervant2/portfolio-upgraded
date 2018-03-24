var router = require("express").Router();
var adminRoutes = require("./admin");
var commonController = require("../../controllers/common_controller");

// This route renders the homepage
router.get("/", function(req, res) {
  
  commonController.projectSelectAll(function(result){ //call controller, pass callback
    var hbsData = {
      layout: "portfolio-main", //specify which layout to use
      projects: result //bring in array
    }
    res.render("portfolio_home", hbsData); //render template, pass data
  });
});

router.use("/admin", adminRoutes);

router.get("*", function(req, res) {
  res.render("page_not_found");
});

module.exports = router;