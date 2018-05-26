app.controller('aula06Controller', function($scope){
    
    $scope.nome = "Curso AngularJS Devmedia";
    
    $scope.olaMundo = function(nome){
        
        alert("Olá " + nome + "!");
        
    }
    
    console.log("Executou o controller aula06Controller");
    
});