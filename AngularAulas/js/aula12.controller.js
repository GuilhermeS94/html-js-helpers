var app = angular.module('app', ['ngSanitize']);

function Aula12($scope){
    
    $scope.mostrar = true;    
    
    $scope.variavelHTML = "<h1>Seja bem vindo ao site!</h1>";
    
    $scope.minhaClass = "";
    $scope.variavelCloak = "askjfhkasjfhasdjkghkjdghjsdhadjkghkdfjsghdjfgvkjdfvhjdfghjkdshgkjsdfhgvghdfkgjhdjkfbnm,cndsfjgldkjgvdn ,mcn , vndkgnd,mgvndm,n gfg jerhgerhg erhgjherjgherjhg erjghejgh dk ghdf kgh jdfkjghj ghdfkjg hdfkjghdfjk ghdfjgh ";
    $scope.foto = "SwitchOff.jpg";
    
}

app.controller('Aula12', Aula12);