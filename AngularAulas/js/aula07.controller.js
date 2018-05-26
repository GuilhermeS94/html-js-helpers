app.controller('aula07', function($scope){
    
    $scope.nomes = ['Gui','Caique','Caio','Jhojo','Lou','Michelle'];
    
    $scope.pessoas = [];
    
    $scope.pessoas.push(
        {nome:"Gui Silva", idade:21,status: false}
    );
    
    $scope.pessoas.push(
        {nome:"Caique Lima", idade:21,status: true}
    );
    
    $scope.pessoas.push(
        {nome:"D Chaves", idade:19,status: true}
    );
    
    $scope.pessoas.push(
        {nome:"Caio diniz", idade:21,status: true}
    );
    
    $scope.acicionaPessoa = function(){
        var nome = document.getElementById("nomePessoa");
        var idade = document.getElementById("idadePessoa");
        
        $scope.pessoas.push(
            {nome: nome.value, idade:idade.value,status: true}
        );
        nome.value = '';
        idade.value = '';
    }
});