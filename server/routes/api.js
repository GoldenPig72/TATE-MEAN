/* Express Routes */
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');

//super secret for creating token
var superSecret = config.secret;

module.exports = function(app,express){

//get an instance of the express router
var apiRouter = express.Router();

//===============================  Token Middleware  =========================
// For /users request
// Checks for token for /api routes
apiRouter.use("/",function(req,res,next){
	//check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') ||req.headers['x-access-token'];

	//decode token
	if(token){
		//verifies secret and checks exp
		jwt.verify(token,superSecret,function(err,decoded){
			if(err){
				return res.status(403).send({
					success: false,
					message: 'Failed to authenticate token.'
				});
			}else{
				//save to request for use in other routes
				req.decoded = decoded;
				next();// this make sure we go to the next routes and dont stop here
			}
		});
	}else{
		// if there is no token
		//return an HTTP response of 403 (access forbidden) and an error message
		return res.status(403).send({
			success:false,
			message: 'No token provided.'
		});
	}
});

//===================================  /users  ================================
apiRouter.route('/users')
	// get all the users (accessed at GET http://localhost::8080/api/users)
	.get(function(req, res) {
			User.find(function(err,users){
				if(err) res.send(err);
				//res: return list of users
					res.json(users);
					});
		});

//=====================================  /me  ==================================
apiRouter.route('/me')
		.get(function(req,res){
		res.send(req.decoded);
	});

//===============================  /users/:user_id  ============================
apiRouter.route('/users/:user_id')
	//get the user with that id
	//(accessed at GET http://localhost:8080/api/users/:user_id)
	.get(function(req,res){
		User.findById(req.params.user_id, function(err,user){
			if(err) res.send(err);
			//return that user
			res.json(user);
		});
	})
	//update the user with this id
	//(accessed at PUT http://localhost:8080/api/users/:user_id)
	.put(function(req,res){
			//use our user model to find the user we want
			User.findById(req.params.user_id,function(err,user)
			{
				if(err) res.send(err);
				//update the users info only if its new
				if(req.body.name) user.name = req.body.name;
				if(req.body.username) user.username = req.body.username;
				if(req.body.password) user.password = req.body.password;
				//save the user
				var self = this;
				user.save(function(err){
					if(err) res.send(err);
					//return a message
					else{
						var token = jwt.sign({
							name: self.name,
							username: self.username
						}, superSecret, {expiresIn: 86400}); //24 hrs
						res.json({
							name: user.name,
							success: true,
							message:'User updated!',
							token: token
						});	
					}
				});
			});
		})

	.delete(function(req, res){
		User.remove({
				_id:req.params.user_id
			}, function(err,user){
				if(err) return res.send(err);
				res.json({message: 'Successfully deleted'});
		});
	});

	return apiRouter;
};
