angular.module('app.routes', ['ngRoute'])
// configure our routes
.config(function($routeProvider, $locationProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : '/app/views/pages/home.html',
            controller : 'homeCtrl',
            controllerAs : 'home'
        })

        //login page
        .when('/login', {
            templateUrl : '/app/views/pages/login.html',
        	controller   : 'mainController',
        	controllerAs   : 'login'
        })

        //show all users
        .when('/users',{
            templateUrl: 'app/views/pages/users/all.html',
            controller: 'userController',
            controllerAs: 'user'
        })

        //form to create a new user
        // same view as edit page
        .when('/users/create',  {
            templateUrl: 'app/views/pages/users/single.html',
            controller: 'userCreateController',
            controllerAs: 'user'
        })
        //  page to edit a user
        .when('/users/:user_id', {
            templateUrl: 'app/views/pages/users/single.html',
            controller: 'userEditController',
            controllerAs: 'user'
        });
    // get rid of the hash in the URL
    $locationProvider.html5Mode(true);
});
