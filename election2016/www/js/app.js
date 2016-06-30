var election2016 = angular.module('starter', ['ionic', 'firebase']);

election2016.config(function($ionicConfigProvider) {
	$ionicConfigProvider.navBar.alignTitle('center');
});

election2016.factory("Votes", function($firebaseArray) {
	var votesRef = new Firebase("https://election2016-efeae.firebaseio.com/votes");
	return $firebaseArray(votesRef);
})

election2016.controller("ListCtrl", function($scope, Votes, $http) {
	$scope.getIP = function() {
		var json = 'http://ipv4.myexternalip.com/json';
		$http.get(json).
		success(function(data, status, headers, config) {
			IP = JSON.stringify(data);
			IP = IP.substring(7, IP.length - 2);
			console.log(IP);
		}).
		error(function(data, status, headers, config) {
		});
	}

	$scope.votes = Votes;

	var IP = $scope.getIP();

	$scope.voteTrump = function() {
		if (IP == 'temp') {
			$scope.getIP();
		}
		$scope.votes.$add({
			"ip": IP,
			"vote": 'Trump'
		});
	};

	$scope.voteClinton = function() {
		if (IP == 'temp') {
			$scope.getIP();
		}
		$scope.votes.$add({
			"ip": IP,
			"vote": 'Clinton'
		});
	};
});