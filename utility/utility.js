module.exports = {
    getMessage: function(type){
        if(type === "delete"){
            return "The selected project was sucessfully deleted";
        } else if (type === "edit"){
            return "The selected project was successfully edited";
        }
    }
}