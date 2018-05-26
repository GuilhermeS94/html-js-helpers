angular.module('app', ['ngRoute'])

.controller('aula11', function($scope, $route, $routeParams, $location){
    
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    
})
.controller('home', function($scope){
    console.info("Controller da home!");
})
.controller('pg1', function($scope){
    console.info("Controller da página 1!");
})
.controller('pg2', function($scope, $routeParams){
    console.info("Controller da página 2!");
    $scope.parametros = $routeParams;
    console.info("ID produto:\t" + $scope.parametros.idproduto);
})

.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/home', {
        templateUrl: 'aula11_home.html',
        controller : 'home'
    })
    .when('/Pagina1', {
        templateUrl: "aula11_1.html",
        controller : 'pg1'
    })
    .when('/Pagina2/:idproduto', {
        templateUrl: "aula11_2.html",
        controller : "pg2"
    })
    .otherwise({
        redirectTo : '/'
    });
    
    $locationProvider.html5Mode(true);
});