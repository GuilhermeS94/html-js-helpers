function Aula10Controller($scope, $filter){
    
    console.log("Iniciou o controller");
    
    //console.log(retornaoiFilter('Jaison'));
    
    console.log(
        $filter('retornaoi')('Jaison Schmidt')
    );
    
    $scope.pessoa = {
        nome : "Devmedia",
        idade : 31
    }
    
}

app.controller('Aula10Controller', Aula10Controller);