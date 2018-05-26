app.factory('Pessoa', function(){
    console.info("criou pessoa");
    var Pessoa = function(){
        console.info("instanciou pessoa");
        this.nome = "Gui S",
        this.idade = 21,
        this.cumprimentar = function(){
            return "Olá " + this.nome + "!";
        }
    }
    
    return Pessoa;
});