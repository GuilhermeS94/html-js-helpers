app.controller('Aula13Controller', function($scope){

});

app.directive('ngOla', function(){
    return {
        restrict : 'AEC',
        
        scope : {
            ngNome : '@'
        },
        
        template : '<h1>Olá {{ngNome}}!</h1>',
        
        controller : ['$scope', function($scope){
            
            $scope.digaOla = function(nome){
                
                alert('Ola '+nome+'!');
                
            }
            
        }],
        
        link : function(scope, iElement, iAttrs){
            
            console.log(iElement);
            console.log(iAttrs);
            
            scope.digaOla(iAttrs.ngNome);
            
        }
    }
});