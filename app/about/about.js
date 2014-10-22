'use strict';

angular.module('myApp.about', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/about', {
      templateUrl: 'about/index.html',
      controller: 'aboutController'
    });
  }])
  .controller('aboutController', ['$scope','$http', function() {

  }]);