var election2016 = angular.module('starter', ['ionic', 'firebase', 'chart.js']);
var votesRef = new Firebase("https://election2016-efeae.firebaseio.com/votes");

var trumpVotes = 0;
var clintonVotes = 0;

election2016.config(function($ionicConfigProvider) {
	$ionicConfigProvider.navBar.alignTitle('center');
	var voteBar = document.getElementById('voteBar');
});

election2016.factory("Votes", function($firebaseArray) {
	return $firebaseArray(votesRef);
});

election2016.controller("ListCtrl", function($scope, Votes, $http) {
	$scope.votes = Votes;

	$scope.refreshVotes = function() {
		trumpVotes = 0;
		clintonVotes = 0;

		votesRef.orderByChild("vote").on("child_added", function(snapshot) {
			if (snapshot.val().vote == "Trump") {
				trumpVotes++;
			} else {
				clintonVotes++;
			}
		});

		$scope.data = [
		[String(trumpVotes), String(clintonVotes)]
		];
	}

	$scope.labels = ["Donald Trump", "Hillary Clinton"];
	$scope.series = ['Votes'];
	$scope.data = [
	[String(trumpVotes), String(clintonVotes)]
	];

	$scope.getIP = function() {
		var json = 'http://ipv4.myexternalip.com/json';
		$http.get(json).
		success(function(data, status, headers, config) {
			IP = JSON.stringify(data);
			IP = IP.substring(7, IP.length - 2);
			// console.log("user IP address: " + IP);
		}).
		error(function(data, status, headers, config) {
		});
	}

	function removeWithID(id) {
		return (element=document.getElementById(id)).parentNode.removeChild(element);
	}

	function removeWithElement(element) {
		return element.parentNode.removeChild(element);
	}

	var IP = $scope.getIP();

	function hideElement(element) {
		element.style.opacity = 0;
		element.style.filter = 'alpha(opacity=' + 0 + ")";
	}

	$scope.displayData = function() {
		$scope.refreshVotes();

		var newContent = document.createTextNode("Thanks for voting! See the results in the chart below:"); 
		var voteBar = document.getElementById("afterVote"); 
		if (voteBar.innerHTML.indexOf("You've") != -1) {
			voteBar.innerHTML = ''; 
		}
		if (voteBar.innerHTML.indexOf("Thanks") == -1) {
			voteBar.appendChild(newContent); 
		}

		var voteChart =  document.getElementById("bar");
		var voteChartContent = voteChart.innerHTML;
		voteChart.innerHTML = voteChartContent;
	}

	$scope.cantVote = function() {
		$scope.refreshVotes();

		var newContent = document.createTextNode("You've already voted in this poll! See the results in the chart below:"); 
		var voteBar = document.getElementById("afterVote"); 
		if (voteBar.innerHTML.indexOf("Thanks") != -1) {
			voteBar.innerHTML = '';
		}
		if (voteBar.innerHTML.indexOf("You've") == -1) {
			voteBar.appendChild(newContent); 
		}
	}

	$scope.checkIfCanVote = function() {
		var canVote = true;
		votesRef.orderByChild("ip").on("child_added", function(snapshot) {
			if (snapshot.val().ip == IP) {
				canVote = false;
			}
		});
		return canVote;
	}

	$scope.hideVoteButtons = function(cantVote){
		hideElement(voteTrump);
		hideElement(voteClinton);
		if (cantVote) {
			$scope.cantVote();
		}
	}

	$scope.voteTrump = function() {
		if (IP == 'temp') {
			$scope.getIP();
		}

		if ($scope.checkIfCanVote()) {
			$scope.hideVoteButtons(false);
			$scope.votes.$add({
				"ip": IP,
				"vote": 'Trump'
			});
			$scope.displayData();
		} else {
			$scope.hideVoteButtons(true);
		}
	};

	$scope.voteClinton = function() {
		if (IP == 'temp') {
			$scope.getIP();
		}

		if ($scope.checkIfCanVote()) {
			$scope.hideVoteButtons(false);
			$scope.votes.$add({
				"ip": IP,
				"vote": 'Clinton'
			});
			$scope.displayData();
		} else {
			$scope.hideVoteButtons(true);
		}
	};
});