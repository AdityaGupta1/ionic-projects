var election2016 = angular.module('starter', ['ionic', 'firebase']);

election2016.config(function($ionicConfigProvider) {
	$ionicConfigProvider.navBar.alignTitle('center');
});

election2016.factory("Votes", function($firebaseArray) {
	var votesRef = new Firebase("https://election2016-efeae.firebaseio.com/votes");
	return $firebaseArray(votesRef);
})

election2016.controller("ListCtrl", function($scope, Votes) {
	$scope.votes = Votes;
	$scope.voteTrump = function() {
		$scope.votes.$add({
			"ip": //lol this isnt done yet skrub
			"vote": Trump
		});
	};
	$scope.voteClinton = function() {
		$scope.votes.$add({
			"ip": //lol this isnt done yet skrub
			"vote": Clinton
		});
	};
});