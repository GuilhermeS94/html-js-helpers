var appSaudacao = angular.module('appSaudacao', []);

appSaudacao.filter('ola', function(){
    return function(nome){
        return "Olá " + nome + "!";   
    }
});