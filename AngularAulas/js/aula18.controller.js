app.controller('aula18', function($scope, $location){
    
    $scope.$location = $location;
    $scope.setaId = function(pId){
        console.log("entrou");
        $location.search({ id: pId });
    }
    $scope.$watch("$location.search().id", function(id){
        console.log("mudou valor do ID: " + id);
    });
    
})
.config(function($locationProvider){
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    }).hashPrefix('#');//# = default
});