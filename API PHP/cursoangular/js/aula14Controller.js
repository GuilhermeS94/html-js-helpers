app.controller('Aula14Controller', function($scope, $http){

    $scope.dados = [];
    $scope.url = "http://api.openweathermap.org/data/2.5/weather?q=";
    $scope.cidade = "São Paulo";
    $scope.icone = "";
    $scope.descricaoTempo = "";
    
    $scope.carregaDados = function(){
        
        $http
            .get("dados.json")
            .success(function(data){
                console.log(data);
                $scope.dados = data;
            })
            .error(function(){
                alert("Não foi possível carregar os dados");
            });
        
    }
    
    $scope.carregaPrevisao = function(){
        $http
            .get($scope.url+$scope.cidade+"&units=metric")
            .success(function(data){
                console.log(data);
                $scope.icone = data.weather[0].icon;
                $scope.descricaoTempo = data.weather[0].description;
            })
            .error(function(){
                alert("Não foi possível carregar os dados");
            });
    }
    
});