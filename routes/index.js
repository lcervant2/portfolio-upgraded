var router = require("express").Router(); //utilize the Router built into express
var apiRoutes = require("./api");
var viewRoutes = require("./view");

// router.use("/api", apiRoutes);
router.use("/", viewRoutes);

module.exports = router;