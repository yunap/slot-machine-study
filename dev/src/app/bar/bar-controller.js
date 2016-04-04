/* jshint devel:true */

var app = angular.module('sandboxapp.home', ['ngAnimate']);

app.controller('BarCtrl', function($scope, $timeout) {'use strict';

	$scope.config = {
		reelChoicesCount : 3,
		reelCount : 3,
		reelRadius : 100,
		durationMin : 0.5,
		durationMax : 4
	};

	$scope.REWARDS = {
		INIT : -2,
		NONE : -1,
		TEE : 0,
		COFFEE : 1,
		ESPRESSO : 2
	};

	//array that saves card content and transforms
	$scope.reelChoices = [];

	var reels = [['teapot', 'coffee-maker', 'espresso-machine'], ['tea-strainer', 'coffee-filter', 'espresso-tamper'], ['loose-tea', 'coffee-grounds', 'espresso-beans']];

	$scope.reward = ['tea', 'coffee', 'espresso'];
	$scope.ringTransform = ['none', 'none', 'none'];
	$scope.ringTransformDuration = [0, 0, 0];

	$scope.start = true;
	$scope.isReward = $scope.REWARDS.INIT;

	//array to save overall reel spin
	var angle = [0, 0, 0];

	var getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	var setupReelChoices = function(reelNumber) {
		var cardAngle = 360 / $scope.config.reelChoicesCount;
		$scope.reelChoices[reelNumber] = [];

		for (var i = 0; i < $scope.config.reelChoicesCount; i++) {
			$scope.reelChoices[reelNumber][i] = {
				content : reels[reelNumber][i]
			};
			//compute and assign the transform for this choice
			$scope.reelChoices[reelNumber][i].transform = 'rotateX(' + (cardAngle * i) + 'deg) translateZ(' + $scope.config.reelRadius + 'px)';
		}
	};

	$scope.spin = function(initial) {
		$scope.start = initial ? true : false;

		//disable the button while spinning
		$scope.isSpinning = true;
		//clear reward flag
		$scope.isReward = $scope.REWARDS.INIT;

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
		$timeout(function() {
			//assign drink "number" or NONE to the "isReward" flag
			$scope.isReward = $scope.REWARDS.NONE;

			if (cardNumbers[0] === cardNumbers[1] && cardNumbers[0] === cardNumbers[2]) {
				$scope.isReward = cardNumbers[0];
			}

			//unlock the lever
			$scope.isSpinning = false;

		}, disableDelay * 1000);

	};

	var spinAllReels = function(initial, cardNumbers) {
		var messageDelay = 0;

		for (var i = 0; i < $scope.config.reelCount; i++) {
			//for reel 'i' get a random card
			cardNumbers[i] = getRandomInt(0, $scope.config.reelChoicesCount - 1);

			// prevent slot machine from showing a wining combination at start
			if (initial && (i === $scope.config.reelCount - 1) && (cardNumbers[0] === cardNumbers[1] && cardNumbers[0] === cardNumbers[2])) {
				//console.log("prevented a win: ", cardNumbers[i]);
				cardNumbers[i] = (cardNumbers[i] + 1) % $scope.config.reelChoicesCount;
			}

			//for this card to face the user it has to be rotated 'cardAngle' degrees
			var cardAngle = 360 - 120 * cardNumbers[i];

			//save total transform
			angle[i] = initial ? 0 : angle[i] + 360 * 3;
			//add a few full spins
			cardAngle += angle[i];

			console.log('CardNumber, Angle', cardNumbers[i], cardAngle, angle[i]);

			$scope.ringTransform[i] = 'rotateX(' + cardAngle + 'deg)';

			//for visual effect vary the spin duration
			var duration = Math.random() * ($scope.config.durationMax - $scope.config.durationMin) + $scope.config.durationMin;
			$scope.ringTransformDuration[i] = ( initial ? 0 : duration) + 's';

			//save max spin duration
			messageDelay = duration > messageDelay ? duration : messageDelay;
		}

		return messageDelay;
	};

	//START
	for (var r = 0; r < $scope.config.reelCount; r++) {
		setupReelChoices(r);
	}

	$scope.spin(true);

});
