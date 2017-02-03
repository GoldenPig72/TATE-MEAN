angular.module('mainCtrl', ['authService'])

	.controller('homeCtrl', function(){
		var vm = this;
		vm.message = 'HELLO';
	})

	.controller('mainController',['$scope','Auth','$location','$rootScope',
		function($rootScope,Auth,$location,$scope) {
		var vm = this;
		//get info if a person is logged in
		vm.loggedIn = Auth.isLoggedIn();

		//check to see if a user is logged in on every request
		$rootScope.$on('$routeChangeStart', function () {
			vm.loggedIn = Auth.isLoggedIn();
		});

		//function to handle login form
		vm.doLogin = function () {
			//processing Icon
			vm.processing = true;
			// clear error handling
			vm.error = '';

			// call the Auth.login() function
		Auth.login(vm.loginData.username, vm.loginData.password)
			.success(function (data) {
					vm.processing = false;

				if (data.success) {
					//if a user successfully logs in, redirect to users page
					$location.path('/users');
					//this.user = 'name:unchanged';
					Auth.getUser()
						.then(function(data) {
							$scope.name = data.name;
						 })
					}
				else vm.error = data.message;
			});
		};

		//function to handle loggin out
		vm.doLogout = function () {
			Auth.logout();
			//reset all user info
			vm.user = {};
			$location.path('/login');
		}
	}]);





