app.factory('Pessoa', function(){
    
    console.log("Criou o objeto Pessoa");
    
    var Pessoa = function(){
        
        console.log("Instanciou o objeto pessoa");
        
        this.nome = "Jaison";
        this.idade = 31;
        
        this.cumprimentar = function(){
            return "Olá "+this.nome+"!";
        }
        
    }
    
    return Pessoa;
});