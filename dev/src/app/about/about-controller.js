/* jshint devel:true */

var app = angular.module('sandboxapp.about', ['ngAnimate']);

app.controller('AboutCtrl', function ($scope, $state) {
  'use strict';


  $scope.close = function () {
    $state.go('bar-start');
  };


});
