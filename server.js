const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const routes = require('./routes');

//setup express
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//sessions keep track of user login status
app.use(session({secret: "keyboard cat", reserve: true, saveUnintialized: true}));
app.use(passport.initialize());
app.use(passport.session());

//serve up static assets
if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));
}
//Add routes, both API and route to client/build
app.use(routes);

//set up passport to authenticate
const User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//connect to the Mongo DB
mongoose.connect(process.env.MongoDB_URI || 'mongodb://localhost/teenvol');

app.listen(PORT, function(){
    console.log(`API Server now listening on PORT $(PORT)!`);
});