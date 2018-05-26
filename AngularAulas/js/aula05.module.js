var appSaudacao = angular.module('appSaudacao', []);//nome pode ser diferente da var

appSaudacao.filter('ola', function(){
    return function(nome){
        return "Olá " + nome; 
    }
});