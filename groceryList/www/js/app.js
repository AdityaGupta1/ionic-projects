// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var groceryList = angular.module('starter', ['ionic', 'firebase'])

groceryList.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://grocerylist-13732.firebaseio.com/items");
  return $firebaseArray(itemsRef);
})

groceryList.controller("ListCtrl", function($scope, Items) {
  $scope.items = Items;
  $scope.addItem = function() {
    var name = prompt("What do you need to buy?");
    if (name) {
      $scope.items.$add({
        "name": name
      });
    }
  };
});
