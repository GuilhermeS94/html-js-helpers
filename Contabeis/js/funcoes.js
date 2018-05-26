var app = angular.module('app', []);

app.controller('contabeisCtrl', function($scope, $http){
    $scope.TaxaDeImposto = 10;
    $scope.ValorDeCustos =  10;
    $scope.ParticipacaoDeRateio =  10;
    $scope.CustoFixo = 10;
    $scope.dados = "Teste"; 
    $scope.cImpostosDiretos = function(){
        $scope.ImpostosDiretos = $scope.ValorNota * ($scope.TaxaDeImposto / 100);
        $scope.ROL = $scope.ValorNota - $scope.ImpostosDiretos;
    };

    $scope.cROL = function(){
    	$scope.ROL = $scope.ValorNota - $scope.ImpostosDiretos;
    };

    $scope.cPorcentoEbitida = function(){
    	$scope.PorcentoEbitida = ($scope.ROL > 0) ? ($scope.Ebitida / $scope.ROL) : 0;
    };
});