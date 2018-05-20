var db = require("../models");

module.exports = {
    projectSelectOne: function(projectID, callback){
        db.Project.findOne({
            where: {id: projectID}
        }) //call ORM on model
        .then(callback); //then return data through callback
    },
    authenticateAdmin: function(req, callback){
        var username = req.body.username;
        var password = req.body.password;
        db.User.findOne({
            where: {
              username: username
            }
           }).then(function(user){
                var isValid = false;
                if(user){
                    isValid = user.verifyPassword(password);
                }
                console.log(isValid);
                callback(isValid)
           });
    },
    createProject: function(req, callback){
        db.Project.create(req.body).then(function(user){
            callback(user);
        })
    },
    projectDeleteOne: function(projectID, callback){
        db.Project.destroy({
            where: {id: projectID}
        })
        .then(callback);
    },
    projectEditOne: function(projectBody, callback){
        db.Project.update(
        projectBody,
        {where: {id: projectBody.id} }
        )
        .then(callback);
    }
}