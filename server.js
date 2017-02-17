//server.js

//==================================--BASE SETUP--============================
//LOAD PACKAGES-------------------------------
var express = require ('express'); //EXPRESS Package
var app = express();	//define our app using express
var bodyParser = require('body-parser');// get body-parser
var morgan = require('morgan'); //use to see requests
var mongoose = require("mongoose") //for working with mongoDB
var config = require('./config'); //get config file
var path = require('path');
var jwt = require('jsonwebtoken');
var User = require(__dirname + '/server//models/user.js');


app.use(morgan('dev')); //HTTP logger

//==================================--APP--====================================
var superSecret = config.secret;
// APP CONFIGURATION------------------------------------------
// use body parser to grab information from POST
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

// configure app to handle CORS requests
app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Orgin','*');
	res.setHeader('Access-Control-Allow-Method','GET,POST');
	res.setHeader('Access-Control-Allow-Headers','X-Request-With,content-type,\Authorization');
	next();
});

//==================================--DB--====================================
//mongoose.connect('mongodb://app:myPassword@localhost/appDB');
//mongoose.connect('mongodb://app:mySecretPassword@ds149479.mlab.com:49479/heroku_dhk7z4m9');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://app:myPassword@localhost/appDB')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('MONGO: successfully connected to db');
});

// set static files location
// used for requests that frontend will make
app.use(express.static(__dirname + '/public'));

//=========================--ROUTES/API--====================================
//API ROUTES 
var apiRoutes = require(__dirname + '/server/routes/api')(app,express);
//REGISTER ROUTES----------------------------------------
app.use('/api',apiRoutes); //all /api routes

// MAIN CATCHALL ROUTE-----------------------------------------------------
// SEND USERS TO FRONTEND -------------------------------------------------
// has to be registered after API ROUTES

// set up our one route to the index.html file
// route for the home page
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//===============================  /authenticate  =========================
app.post('/authenticate',function(req, res){
	//find the user
	//select the name, username and password explicitly
	User.findOne({
		username: req.body.username
	}).select('name username password').exec(function(err,user){
		if(err) throw err;

		//no user with that username was found
		if(!user){
			res.json({
				success:false,
				message:'Authencation failed. User not found.'
			});
		}else if (user){
			//check if password matches
			var validPassword = user.comparePassword(req.body.password);
			if(!validPassword){
				res.json({
					success: false,
					message: 'Authencation failed. Wrong password.'
				});
			}else{
				//if user is found and password is right
				//create a token
				var token = jwt.sign({
					name: user.name,
					username: user.username
				}, superSecret , {
					expiresIn: 86400 //  (24hrs)
					// expires in 3600 * 24 = c (24 hours)
				});
				//return json object, information including token as JSON
				res.json({
					name: user.name,
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}
		}
	});
});

//=================================  /register  =============================
app.route('/register')
	//create a user (accessed at POST http://localhost:8080/api/register)
	.post(function(req,res) {
		//create a new instance of the User model
		var user = new User();

		//set the users information (comes from the request)
		user.name = req.body.name;
		user.username = req.body.username;
		user.password = req.body.password;

		//save the user and check for errors
		user.save(function(err){
			if (err){
				//duplicate entry
				if(err.code == 11000)
					return res.json({success: false,
						message: 'A user with that\ username already exists.'});
				else
					return res.send(err);
			}
			res.json({ message:'User created!' });
		});
	});

//=========================--START THE SERVER---=========================
app.listen(config.port);
console.log("Magic happens on port" + config.port);
