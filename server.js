require('dotenv').config()
var express = require('express'); //express package
var exphbs  = require('express-handlebars'); //front end templating view language
var bodyParser = require("body-parser"); //body parser allows us to see the req.body information
var session = require('express-session') // this is what we are using for part of our authentication, Note Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
var routes = require("./routes"); // require the whole routes folder and node will look for an index file
var app = express(); //this initiates an instance of express, so everytime we refer to "app" we are referring to this specific instance of express. Express is our routing middleware
var PORT = process.env.PORT || 3000; //here if we are using heroku, it uses the heroku port, otherwise it just uses the port 3000

app.use(session({  //here we set up express session settings, according to the npm docs
    secret: "Ibetchathiswillreallyencryptsomethingnicely",
    resave: false,
    saveUninitialized: true, // seems to be recommended online so sessions aren't continually stored if they don't modify the session (still not sure how a session is modified);
    cookie: { 
        secure: false,  // if true only works with https (heroku is https) //again, if true it won't work on local host
        maxAge: 60000 // session expires after 1 hour
    }
}));

app.use(bodyParser.urlencoded({ extended: true })); //set up body parser settings
app.use(bodyParser.json()); //set up body parser settings

app.use(express.static("public")); //this will set up a public folder, so we can reference our client side assets in relation to our public directory



app.engine('handlebars', exphbs({defaultLayout: 'portfolio-main'})); //here we setup our default handlebars layout
app.set('view engine', 'handlebars'); //here we specify that handlebars will be the templating language we use

app.use(routes); //here we reference our routes variable that we defined above, which will handle all of our routing

app.listen(PORT, function() { //here we actually start up our server to listen on our specified port
    console.log("Website is now running on http://localhost:" + PORT);
});

// side note: next() when used in a route with no arguments says "just kidding, I don't actual want to handle this". It goes back in and tries to find the next route that would match.