app.controller('aula14', function($scope, $http){
    
    $scope.dados = [];
    $scope.url = "http://api.openweathermap.org/data/2.5/weather?q=";
    $scope.cidade = "São Paulo";
    $scope.icone = "";
    $scope.descricaoTempo = "";
    
    $scope.loadReceitas = function(){
        
        $http
        .get("./dados/dados.json")
        .success(function(retorno){
            console.info(retorno);
            $scope.dados = retorno;
        })
        .error(function(){
            console.error("Falha ao carregar informações!");
        });
    }  
    $scope.carregaPrevisao = function(){
        $http
        .get($scope.url + $scope.cidade)
        .success(function(prev){
            console.info(prev);
            $scope.icone = prev.weather[0].icon;
            $scope.descricaoTempo = prev.weather[0].description
        })
        .error(function(){
            console.error("Falha ao carregar informações!");
        });
    }
    
});