
angular.module('myApp.gallery', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/gallery', {
      templateUrl: 'gallery/index.html',
      controller: 'galleryController'
    });
  }]).controller('galleryController', [ '$scope', function($scope) {
    $scope.photos = [
      {desc: 'Test', src: 'gallery/img/ViktorPhoto.jpg'},
      {desc: 'Test', src: 'gallery/img/images.jpeg'},
      {desc: 'Test', src: 'gallery/img/Splin.jpg'},
      {desc: 'Test', src: 'gallery/img/Splean_2X.jpg'},
      {desc: 'Test', src: 'gallery/img/splin01.jpg'}
    ];

    // initial image index
    $scope._Index = 0;
    // if a current image is the same as requested image
    $scope.isActive = function (index) {
      return $scope._Index === index;
    };
    // show prev image
    $scope.showPrev = function () {
      $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
    };
    // show next image
    $scope.showNext = function () {
      $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
    };
    // show a certain image
    $scope.showPhoto = function (index) {
      $scope._Index = index;
    };
  }]);