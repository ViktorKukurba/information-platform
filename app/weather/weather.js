'use strict';

angular.module('myApp.weather', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/weather', {
    templateUrl: 'weather/index.html',
    controller: 'weatherController'
  });
}])

.controller('weatherController', ['$scope','$http', function($scope, $http) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?';
    $scope.cities = ['London', 'Barcelona', 'Lviv'];

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    }
//Get the latitude and the longitude;
    function successFunction(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      $scope.city = 'Your position';
      console.log(lat,lng);
      url += 'lat=' + lat + '&lon=' +lng;
      $http.get(url)
        .success(function(data) {
          $scope.weather = data.weather[0];
          $scope.wind = data.wind;
        });
    }

    //Get the latitude and the longitude;
    function errorFunction(error) {
      console.log(error);
    }


    document.querySelector('.cities').addEventListener('click', function(e) {
      if (e.target.tagName === 'LI') {
        $scope.city = e.target.textContent;
        var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + $scope.city;
        $http.get(url).
          success(function(data, status, headers, config) {
            console.log('success');
            $scope.weather = data.weather[0];
            $scope.wind = data.wind;
            // this callback will be called asynchronously
            // when the response is available
          });
      }
    });
}]);