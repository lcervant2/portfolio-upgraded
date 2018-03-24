require('dotenv').config()
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require("body-parser");
var session = require('express-session') // Note Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
var routes = require("./routes"); // require the whole folder will look for an index file
var app = express();
var PORT = process.env.PORT || 3000;

app.use(session({
    secret: "Ibetchathiswillreallyencryptsomethingnicely",
    resave: false,
    saveUninitialized: true, // seems to be recommended online so sessions aren't continually stored if they don't modify the session (still not sure how a session is modified);
    cookie: { 
        secure: false,  // if true only works with https (heroku is https) //again, if true it won't work on local host
        maxAge: 60000 // session expires after 1 hour
    }
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));



app.engine('handlebars', exphbs({defaultLayout: 'portfolio-main'}));
app.set('view engine', 'handlebars');

app.use(routes);

app.listen(PORT, function() {
    console.log("Website is now running on http://localhost:" + PORT);
});

// side note: next() when used in a route with no arguments says "just kidding, I don't actual want to handle this". It goes back in and tries to find the next route that would match.