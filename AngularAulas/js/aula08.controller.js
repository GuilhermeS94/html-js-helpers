app.controller('aula08', function($scope){
    
    $scope.estados = ["RS","SP","RJ","GO","SC"];
    
    $scope.pessoa = novaPessoa();
    $scope.pessoas = [];
    
    $scope.salvarPessoa = function(pessoa){
        $scope.pessoas.push(pessoa);
        $scope.pessoa = novaPessoa();
        
        $scope.frm.$setUntouched();
        $scope.frm.$setPristine();
    }
    
    console.log($scope.pessoa);
});
    
function novaPessoa(){
    return{
        nome:"",
        email:"",
        sexo:"F",
        estado : "GO"
    }
}