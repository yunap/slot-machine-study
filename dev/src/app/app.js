angular.module('sandboxapp', ['sandboxapp-templates', 'sandboxapp.home', 'sandboxapp.about', 'ui.router', 'ngAnimate'])
.config(function($stateProvider, $urlRouterProvider) {
	'use strict';
	
  //this is a simple ui router configuration, not that this coding chalange needs the state router
  //however I am a fan of having states in a single page app, so setting it up here as an example
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
