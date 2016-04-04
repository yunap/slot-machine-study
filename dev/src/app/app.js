
angular.module('sandboxapp', [
  'sandboxapp-templates', 'sandboxapp.home', 'sandboxapp.about',
   'ui.router', 'ngAnimate'
])
.config(function ($stateProvider, $urlRouterProvider ) {
  'use strict';


        $urlRouterProvider.otherwise('/espresso-bar');

        $stateProvider

            //
            .state('bar-start', {
                url: '/espresso-bar',
                templateUrl: '/sandboxapp/bar/bar.html',
                controller: 'BarCtrl'

            })

            .state('bar-about', {
              url: '/about',
              templateUrl: '/sandboxapp/about/about.html',
              controller: 'AboutCtrl'
            });
    });
