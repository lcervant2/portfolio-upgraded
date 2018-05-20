var router = require("express").Router();
var commonController = require("./../../../controllers/common_controller.js");
var adminController = require("./../../../controllers/admin_controller.js");
var utility = require("./../../../utility/utility.js");

router.get("/", function(req, res) { //if not logged in redirect to login    
    if(req.session.admin){
        commonController.projectSelectAll(function(result){ //call controller, pass callback
            var hbsData = {
            layout: "admin-main", //specify which layout to use
            projects: result, //bring in array
            message: utility.getMessage(req.query.message),
            navHome: true
            }
            res.render("admin_home", hbsData); //render template, pass data
        });
    } else {
        res.redirect("/admin/login");
    }
});

router.get("/edit/:projectID", function(req, res) { //if not logged in redirect to login
    if(req.session.admin){
        var projectID = req.params.projectID; //16 for example
        adminController.projectSelectOne(projectID, function(result){
            var hbsData = {
                layout: "admin-main",
                project: result
            }
        //run controller to get 1 then pre fill form (id can't be edited)
        res.render("admin_edit", hbsData);
        })

    } else {
        res.redirect("/admin/login");
    }
});

router.get("/delete/:projectID", function(req, res) { //this colon means "whatever id they pass in"
    if(req.session.admin){
        var projectID = req.params.projectID; //grab the id from the parameters
        adminController.projectDeleteOne(projectID, function(result){
            res.redirect("/admin/?message=delete")
        })
    } else {
        res.redirect("/admin/login");
    }
})

router.post("/edit", function(req, res) { //if not logged in redirect to login
    if(req.session.admin){
        console.log(req.body);

        var projectID = req.params.projectID;
        adminController.projectEditOne(req.body, function(result){
            res.redirect("/admin/?message=edit")
        })
    } else {
        res.redirect("/admin/login");
    }
});

router.get("/create", function(req, res) { //if not logged in redirect to login
    console.log(req.session.admin);
    if(req.session.admin){
        res.render("admin_create", {layout: "admin-main"});
    } else {
        res.redirect("/admin/login");
    }
});

router.post("/create", function(req, res) {
    adminController.createProject(req, function(result){
        console.log("here!");
        res.redirect("/admin");
    })
});

router.get("/login", function(req, res) {
    res.render("admin_login", { layout: "admin-main", navHome: true});
});

router.post("/login", function(req, res) {
    adminController.authenticateAdmin(req, function(authenticated){
        if(!authenticated){
            res.render("admin_login", { layout: "admin-main", message: "The username or password is incorrect"});
        } else {
            req.session.admin = true;
            res.redirect("/admin");
        }
    })
    
});

router.get("/logout", function(req, res) {
    req.session.destroy();
    res.render("admin_login", { layout: "admin-main", message: "You have successfully been logged out"});
});

router.get("*", function(req, res) {
    res.render("page_not_found");
});

module.exports = router;

