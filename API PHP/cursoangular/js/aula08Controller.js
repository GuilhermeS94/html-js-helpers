app.controller("aula08Controller", function($scope){
    
    $scope.estados = ['RS', 'SP', 'RJ', 'SC']
    
    $scope.pessoa = novaPessoa();
    $scope.pessoas = [];
    
    $scope.salvarPessoa = function(pessoa){
        
        $scope.pessoas.push(pessoa);
        $scope.pessoa = novaPessoa();
        
        $scope.frm.$setUntouched();
        $scope.frm.$setPristine();
        
    }
    
});
    
function novaPessoa(){
    
    return {
        nome : "",
        email : "",
        sexo : "f",
        estado : "RJ"
    }
    
}