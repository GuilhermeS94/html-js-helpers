app.filter('retornaOi', function(){
    
    return function(nome){
        
        return "Olá "+nome+"!";
        
    }
    
});