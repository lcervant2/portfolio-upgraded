module.exports = function(sequelize, DataTypes) { //this format is necessary so our index file can read these in properly
    var Project = sequelize.define("Project",  //defined name matters here, this is how we will refer to this table
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        repoURL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hostedURL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: true //if they don't add an image, we will search for a related image online
        },
    }, {
        freezeTableName: true 
    });

    return Project;
  };