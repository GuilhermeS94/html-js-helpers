var app = angular.module('app', ['ngResource']);

app.factory('Livros', ['$resource', function($resource){
    
    return $resource('api/livros/:livroid', { livroid: '@livroid' });
    
}]);

app.controller('aula15', function($scope, Livros){
    
    $scope.carregarLivros = function(){        
        Livros.get();        
    }
    
    $scope.getLivro = function(livroid){        
        Livros.get( { livroid : livroid }, function(lvr){
            
            console.info(lvr.mensagem);
            
        } );
    }
    
    $scope.salvarLivro = function(livroid){        
        
        livro = {
            "id" : 19,
            "titulo" : "Curso ang dev midia"
        }
        
        Livros.save({}, livro);
        
    }
    
});