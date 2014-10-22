'use strict';

angular.module('myApp.news', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/news', {
      templateUrl: 'news/index.html',
      controller: 'newsController'
    });
  }])

  .controller('newsController', ['$scope','$http', function($scope, $http) {
    $scope.title = 'Categories';

    $http.get('http://api.feedzilla.com/v1/categories.json').
      success(function(data, status, headers, config) {
        $scope.categories = data;

        if (data && data.length) {
          var first = data[0];
          $scope.category = first.display_category_name || first.english_category_name;
          var url = 'http://api.feedzilla.com/v1/categories/' +
            first.category_id + '/articles.json';
          $http.get(url).
            success(function(data, status, headers, config) {
              console.log('success');
              $scope.articles = data.articles;
            });
        }
      }).
      error(function(data, status, headers, config) {
        console.log('error');
        console.log(data, status, headers, config);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    document.querySelector('.categories').addEventListener('click', function(e) {
      if (e.target.tagName === 'LI') {
        $scope.category = e.target.textContent;
        var url = 'http://api.feedzilla.com/v1/categories/' +
          e.target.id + '/articles.json';
        $http.get(url).
          success(function(data, status, headers, config) {
            console.log('success');
            $scope.articles = data.articles;
            // this callback will be called asynchronously
            // when the response is available
          });
      }
    });
  }]);