app.controller('aula06', function($scope){
    
    $scope.nome = "Curso AngulaJS DevMedia";
    
    $scope.olaMundo = function(nome){
        alert("Olá " + nome + "!");
    }
    
    console.info("Controller executed!");
    
});