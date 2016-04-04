/* jshint devel:true */
var app = angular.module('sandboxapp.about', ['ngAnimate']);
app.controller('AboutCtrl', [
  '$scope',
  '$state',
  function ($scope, $state) {
    'use strict';
    $scope.close = function () {
      $state.go('bar-start');
    };
  }
]);
/* jshint devel:true */
var app = angular.module('sandboxapp.home', ['ngAnimate']);
app.controller('BarCtrl', [
  '$scope',
  '$timeout',
  function ($scope, $timeout) {
    'use strict';
    $scope.config = {
      reelChoicesCount: 3,
      reelCount: 3,
      reelRadius: 100
    };
    //array that saves card content and transforms
    $scope.reelChoices = [];
    var reelOne = [
        'teapot',
        'coffee-maker',
        'espresso-machine'
      ];
    var reelTwo = [
        'tea-strainer',
        'coffee-filter',
        'espresso-tamper'
      ];
    var reelThree = [
        'loose-tea',
        'coffee-grounds',
        'espresso-beans'
      ];
    $scope.reward = [
      'tea',
      'coffee',
      'espresso'
    ];
    $scope.ringTransform = [
      'none',
      'none',
      'none'
    ];
    $scope.ringTransformDuration = [
      0,
      0,
      0
    ];
    $scope.start = true;
    $scope.isReward = -2;
    //array to save overall reel spin
    var angle = [
        0,
        0,
        0
      ];
    var setupReelChoices = function (reelNumber, reel) {
      var cardAngle = 360 / $scope.config.reelChoicesCount;
      $scope.reelChoices[reelNumber] = [];
      for (var i = 0; i < $scope.config.reelChoicesCount; i++) {
        $scope.reelChoices[reelNumber][i] = { content: reel[i] };
        //compute and assign the transform for this choice
        $scope.reelChoices[reelNumber][i].transform = 'rotateX(' + cardAngle * i + 'deg) translateZ(' + $scope.config.reelRadius + 'px)';
      }
    };
    $scope.spin = function (initial) {
      $scope.start = initial ? true : false;
      //disable the button while spinning
      $scope.isSpinning = true;
      //clear reward flag
      $scope.isReward = -2;
      //clear selected cards
      var cardNumbers = [];
      var disableDelay = spinAllReels(initial, cardNumbers);
      //if no delay was set unlock the lever and return
      if (initial || !disableDelay) {
        //unlock the lever
        $scope.isSpinning = false;
        return;
      }
      //when transforms had been applied unlock the lever and show the message
      $timeout(function () {
        //assign drink "number" or -1 to the "isReward" flag
        $scope.isReward = -1;
        if (cardNumbers[0] === cardNumbers[1] && cardNumbers[0] === cardNumbers[2]) {
          $scope.isReward = cardNumbers[0];
        }
        //unlock the lever
        $scope.isSpinning = false;
      }, disableDelay * 1000);
    };
    var spinAllReels = function (initial, cardNumbers) {
      var messageDelay = 0;
      for (var i = 0; i < $scope.config.reelCount; i++) {
        //for reel 'i' get a random card
        cardNumbers[i] = Math.round(Math.random() * 2);
        //for this card to face the user it has to be rotated 'cardAngle' degrees
        var cardAngle = 360 - 120 * cardNumbers[i];
        //save total transform
        angle[i] = initial ? 0 : angle[i] + 360 * 3;
        //add a few full spins
        cardAngle += angle[i];
        console.log('CardNumber, Angle', cardNumbers[i], cardAngle, angle[i]);
        $scope.ringTransform[i] = 'rotateX(' + cardAngle + 'deg)';
        //for visual effect very the spin speed from .5 to 3 sec
        var duration = Math.random() * (4 - 0.5) + 0.5;
        $scope.ringTransformDuration[i] = (initial ? 0 : duration) + 's';
        //save max spin duration
        messageDelay = duration > messageDelay ? duration : messageDelay;
      }
      return messageDelay;
    };
    //START
    setupReelChoices(0, reelOne);
    setupReelChoices(1, reelTwo);
    setupReelChoices(2, reelThree);
    $scope.spin(true);
  }
]);
(function (module) {
  try {
    module = angular.module('sandboxapp-templates');
  } catch (e) {
    module = angular.module('sandboxapp-templates', []);
  }
  module.run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('/sandboxapp/about/about.html', '<div class="content animate-view"><h1 class="title">Espresso Bar Slot Machine</h1><div class="subtitle">Programming Challenge</div><div class="about-text"><p>At company XYZ, engineers and designers enjoy a healthy dose of caffeine in the morning. They like to drink coffee, tea, or espresso. Your goal is to build a slot machine to award lucky users one of these random beverages. Your solution should be in JavaScript and CSS. You may use standard libraries like jQuery, Underscore, Backbone, and/or Angular.</p>Your slot machine should have three reels:<li>The first reel has a coffee maker, a teapot, and an espresso machine.</li><li>The second reel has a coffee filter, a tea strainer, and an espresso tamper.</li><li>The third reel has coffee grounds, loose tea, and ground espresso beans.</li><p>When the lever is pulled (you can simulate this with the click of a button), the slot machine goes into action. Each reel spins and randomly stops on one of the three options. If the user is lucky, the three reels will line up and she will be rewarded with a tasty hot beverage. Your solution should show the user what beverage she\'s won. For example, if the reels show coffee maker, coffee filter, and coffee grounds, the user wins a cup of coffee.</p></div><div class="lever"><button type="submit" ng-click="close()">CLOSE</button></div></div>');
    }
  ]);
}());
(function (module) {
  try {
    module = angular.module('sandboxapp-templates');
  } catch (e) {
    module = angular.module('sandboxapp-templates', []);
  }
  module.run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('/sandboxapp/bar/bar.html', '<div class="content content-bar animate-view"><div class="about" ui-sref="bar-about()">?</div><h1 class="title">Espresso Bar Slot Machine</h1><div class="machine"><div class="reel-wrapper" ng-repeat="reel in [0,1,2]"><div class="reel" ng-style="{\'transform\': ringTransform[reel], \'transition-duration\': ringTransformDuration[reel]}"><div ng-repeat="choice in reelChoices[reel]" class="card" ng-style="{ \'transform\' : choice.transform }"><p ng-class="{\'{{choice.content}}\' : choice.content}"></p></div></div></div></div><div><div class="animate-show" ng-show="isReward !== -2 && isReward !== -1">You won! Enjoy your {{reward[isReward]}}</div><div class="animate-show" ng-show="isReward === -1">Try again!</div><div class="animate-show" ng-show="start">Press GO to start</div></div><div class="lever"><button type="submit" ng-disabled="isSpinning" ng-click="spin()">GO</button></div></div>');
    }
  ]);
}());
angular.module('sandboxapp', [
  'sandboxapp-templates',
  'sandboxapp.home',
  'sandboxapp.about',
  'ui.router',
  'ngAnimate'
]).config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    'use strict';
    $urlRouterProvider.otherwise('/espresso-bar');
    $stateProvider.state('bar-start', {
      url: '/espresso-bar',
      templateUrl: '/sandboxapp/bar/bar.html',
      controller: 'BarCtrl'
    }).state('bar-about', {
      url: '/about',
      templateUrl: '/sandboxapp/about/about.html',
      controller: 'AboutCtrl'
    });
  }
]);