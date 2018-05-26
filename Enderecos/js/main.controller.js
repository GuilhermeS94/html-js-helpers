app.controller('main', function($scope, $http){
    
    $scope.dados = [];
    $scope.url = "http://viacep.com.br/ws/";
    $scope.endereco = "";
    $scope.cep = "";
    
    $scope.getAdress = function(){
        $http
        .get($scope.url + $scope.cep + "/json/")
        .success(function(end){
            console.info(end);
            $scope.dados = end;
        })
        .error(function(){
            console.error("Falha ao carregar informações!");
        });
    }
    
});