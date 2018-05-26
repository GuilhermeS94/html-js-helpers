app.controller('aula13', function($scope){
    
});

//estrutura basica de diretiva
app.directive('ngOla', function(){
    return {
        restrict : 'AEC',//A = vai utilizar em elementos HTML, E = forma de TAG html, C = por classe
        scope : {
          ngNome : '@'//referencia
        },
        template : '<h1>Olá {{ ngNome }}</h1>',
        
        controller : ['$scope', function($scope){
           
            $scope.digaOla = function(nome){
                
                alert('Olá ' + nome + '!');                
            }            
        }],
        
        link : function(scope, iElement, iAttrs){
            console.info(iElement);
            console.info(iAttrs);
            scope.digaOla(iAttrs.ngNome);
        }
    }
});