app.service('operacoes', function(){
    console.info('Criou service operacoes');
    this.somar = function(valor1, valor2){
        return valor1 + valor2;
    };
    
    this.subtrair = function(valor1, valor2){
        return valor1 - valor2;
    };
    
});