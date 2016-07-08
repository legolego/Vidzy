var app = angular.module('Vidzy', ['ngResource', 'ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-video', {
            templateUrl: 'partials/video-form.html',
            controller: 'AddVideoCtrl'
        })

        .when('/video/:id', {
            templateUrl: 'partials/video-form.html',
            controller: 'EditVideoCtrl'
        })

        .when('/video/delete/:id', {
            templateUrl: 'partials/video-delete.html',
            controller: 'DeleteVideoCtrl'
        })

        .otherwise({
            redirectTo: '/'
        });
}]);

//multiple factories
//https://www.google.com/search?q=angular+multiple+resources+to+scope&oq=angular+multiple+resources+&aqs=chrome.2.69i57j69i59l2.21604j0j7&sourceid=chrome&ie=UTF-8
app.factory('GenresFac', function ($resource) {
    return $resource("/api/genres");
});

app.controller('HomeCtrl', ['$scope', '$resource',
    function ($scope, $resource) {
        var Videos = $resource('/api/videos');
        Videos.query(function (videos) {
            $scope.videos = videos;
        });
    }]);



app.controller('GenreCtrl', ['$scope', '$resource',
    //kinda helped: http://plnkr.co/edit/pNEUFrX1Loc7By70d3hi?p=preview
    function ($scope, $resource) {
        var Genres = $resource('/api/genres');
        Genres.query(function (genres) {
            $scope.genres = genres;
        });

        //$scope.genreSelect = $scope.genres[1].genre_id;
        //$scope.genreSelect = {genre_id: 3};
     }
]);

app.controller('ColorCtrl', ['$scope',

    function ($scope) {
    $scope.genres = [
        { name: 'Red', genre_id: '1' },
        { name: 'Blue', genre_id: '2', notAnOption: true },
        { name: 'Yellow', genre_id: '3' },
        { name: 'Green', genre_id: '4', notAnOption: true },
        { name: 'Purple', genre_id: '5', notAnOption: false }
    ];
    $scope.genreSelect = $scope.genres[3]; // red
}

]);

app.controller('AddVideoCtrl', ['$scope', '$resource', '$location', GenresFac,
    function ($scope, $resource, $location, GenresFac) {
        $scope.save = function () {
            var Videos = $resource('/api/videos');
            Videos.save($scope.video, function () {
                $location.path('/');
            });
        };
        $scope.genres
    }]);

app.controller('EditVideoCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function ($scope, $resource, $location, $routeParams) {
        var Videos = $resource('/api/videos/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        });

        Videos.get({ id: $routeParams.id }, function (video) {
            $scope.video = video;
        });

        $scope.save = function () {
            Videos.update($scope.video, function () {
                $location.path('/');
            });
        }
    }]);

app.controller('DeleteVideoCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function ($scope, $resource, $location, $routeParams) {
        var Videos = $resource('/api/videos/:id');

        Videos.get({ id: $routeParams.id }, function (video) {
            $scope.video = video;
        })

        $scope.delete = function () {
            Videos.delete({ id: $routeParams.id }, function (video) {
                $location.path('/');
            });
        }
    }]);

