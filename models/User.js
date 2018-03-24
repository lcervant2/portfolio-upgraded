var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) { //this format is necessary so our index file can read these in properly
    var User = sequelize.define("User",  //defined name matters here, this is how we will refer to this table
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        hooks: {
            beforeCreate: function(user, options) {
                return bcrypt.hash(user.password, 10)
                    .then(function(hashResult) {
                        user.password = hashResult;
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            }
        }
    });

    User.prototype.verifyPassword = function(inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password) //compare the user given password to the correct one in the database (pair with find method)
    }    
    
    return User;
  };

//how does a salt hash work?
//you make a password like "password123"
//then you create a random 'salt' like "fax81jfc0" and store it in your database
//you use a hashing alogorithm to encrypt your password + salt, so "password123fax81jfc0" gets encrypted into a hash
//the hash may look like fac81212308dcfacj12039183208fjacacjcj12
//you store the hash in the database

//when a user tries to enter a password in the future, we need to verify if it is the correct password
//so we find the salt for the username they entered in the database
//and we run through all the steps that we did when we encrypted the password the first time, we add the salt, we encrypt and create the hash
//then we take the hash we just created and we compare it to the one that is in the database for the username
//if the hashes are identical, we know the password is correct, if they are different, the password is wrong

/* important! in bcrypt, salts are built into the hash! */
