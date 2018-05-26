app.controller('aula09', ["$scope", "operacoes", "Pessoa", function($scope, operacoes, Pessoa){
    
    $scope.pessoa = new Pessoa();
    
    $scope.teste = "Curso AngulasJS";//visivel apenas neste controller
    
    console.info(operacoes.somar(10,10));
    
}]);

app.controller('aula09o2', ['$scope', 'operacoes', 'Pessoa', function($scope, operacoes, Pessoa){
    
    
    $scope.op = new Pessoa();
    $scope.op.nome = "Carol L.";
    $scope.op.idade = 19;
    console.info("controller II");
    
    console.info(operacoes.subtrair(10,5));
    
}]);