'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development'; //this will resolve to the environment, like "production" or default to "development"
var config    = require(__dirname + '/../config/config.json')[env]; //this will resolve to use either the development or the production object
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config); //config is only looking at dialect and host
} else {
  var sequelize = new Sequelize(config.database, process.env[config.username], process.env[config.password], config); //config is only looking at dialect and host
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => { //for each file in the folder
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model; //add it to our db object
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db); //this only runs if you have an associate method in your class methods
  }
});


db.sequelize = sequelize; //store specific instance of database connection
db.Sequelize = Sequelize; //store instance of node package/library

db.sequelize.sync().then(function(){  //this will create our models as tables if they don't exist already //then it will create the initial admin account if it doesn't already exist
  if(process.env.HAS_ENV_FILE){
    db.User.findOrCreate({
      where: {
          username: "LuisC",
          password: process.env.ADMIN_PASS
      }}).catch(function(err){
        console.log("Admin user is probably already in the table");
      })
  };
});



module.exports = db;
