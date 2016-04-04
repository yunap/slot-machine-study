angular.module('sandboxapp', ['sandboxapp-templates', 'sandboxapp.home', 'sandboxapp.about', 'ui.router', 'ngAnimate'])
.config(function($stateProvider, $urlRouterProvider) {
	'use strict';

	$urlRouterProvider.otherwise('/espresso-bar');

	$stateProvider

	//initial state, show the slot machine and let the user play
	.state('bar-start', {
		url : '/espresso-bar',
		templateUrl : '/sandboxapp/bar/bar.html',
		controller : 'BarCtrl'

	})

	//show the about statment
	.state('bar-about', {
		url : '/about',
		templateUrl : '/sandboxapp/about/about.html',
		controller : 'AboutCtrl'
	});
});
