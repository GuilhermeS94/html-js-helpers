//function Aula10($scope, retornaOiFilter){//doc angular, filtro = nomeFilter
function Aula10($scope, $filter){//pega todos filtros
    
    console.info('Iniciou o controller');
    
    //console.info(retornaOiFilter("Teste"));
    
    console.info(
        $filter('retornaOi')('Teste2')//nome, params
    );
    
    $scope.pessoa = {
        nome: "Gui S",
        idade: 21
    }
    
}

app.controller("Aula10", Aula10);