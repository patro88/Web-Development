var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var cookieParser = require("cookie-parser");
var session = require("express-session");

var mongoose = require('mongoose');
var cors = require('cors');

//Configurations
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(session({secret: 'This is a secret key'}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

/* enable CORS*/
app.use(cors());

var mongoDBString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/Project';
mongoose.connect(mongoDBString);


//START: Project Code


//schema design
var UserSchema = mongoose.Schema({
    userid: String,
    password: String,
    email : String
}, { collection: 'user' });

var UserModel = mongoose.model('UserModel', UserSchema);

//session 
passport.use(new LocalStrategy({
    usernameField: 'userid',
    passwordField: 'password'
  },
		function(username, password, done)
		{

			UserModel.findOne({userid: username, password: password}, function(err, user){
				console.log(user);
				if (err) { 
					return done(err); }
				if (!user) { 
					return done(null, false); }

				return done(null, user); })
		}));

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
	done(null, user);
});


//authentication
var auth = function(req, res, next)
{
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};

//register
app.post('/register', function(req, res)
		{
		    var newUser = req.body;
//		    newUser.roles = ['student'];
		    UserModel.findOne({userid: newUser.userid}, function(err, user)
		    {
		        if(err) { return next(err); }
		        if(user)
		        {
		            res.json(null);
		            return;
		        }
		        var newUser = new UserModel(req.body);
		        newUser.save(function(err, user)
		        {
		            req.login(user, function(err)
		            {
		                if(err) { return next(err); }
		                res.json(user);
		            });
		        });
		    });
		});


//login
app.post("/login", passport.authenticate('local'), function(req, res){
	var user = req.user;
	console.log(user);
	res.json(user);
});


//authorize
app.get('/loggedin', function(req, res)
		{
		    res.send(req.isAuthenticated() ? req.user : '0');
		});

//profile details of user
app.get("/profile", auth, function(req, res){
	var user = req.user;
	UserModel.findOne({userid: user.userid, password: user.password} , function(err, users){
		res.json(users);
	})
});

//logout
app.post('/logout', function(req, res)
		{
		    req.logOut();
		    res.send(200);
		});  




//END: Project Code
//

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ip);