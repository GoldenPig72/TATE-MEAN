//gets data using $http
//Data gets passed into controller directory to get displayed
angular.module('userService', [])

.factory('User',function($http){
	//create the object
	var userFactory = {};

	//get a single user
	userFactory.get = function(id)	{
		//a function to get all the stuff
		return $http.get('api/users/' + id );
	};
	//get all users
	userFactory.all = function()	{
		return $http.get('/api/users');
	};

	//create a user
	userFactory.create = function(userData)	{
		return $http.post('/register/', userData);
	};

	//update a user
	userFactory.update = function(id,userData)	{
		return $http.put('/api/users/' + id, userData);
	};

	//delete a user
	userFactory.delete = function(id)	{
		return $http.delete('/api/users/' + id);
	};

	//return our entire userFactory object
	return userFactory;
	});
