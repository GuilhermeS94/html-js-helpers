var app = angular.module('app', ['ngAnimate']);

app.controller('aula17', function($scope){
    
    $scope.itens = ['1','2','3'];
    
    $scope.adicionaItem = function(){
        
        if($scope.itens.indexOf($scope.itemAdd) == -1)
            $scope.itens.push($scope.itemAdd);
        
    }
    
});