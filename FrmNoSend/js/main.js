var MAIN = (function(){
    return{

        init: function(){
            //demonstração
          console.info("Começou!!!");  

          $("#txtNome").on("keyup keypress", function(evento){
                var tecla = evento.keyCode || evento.which;

                if(tecla && tecla === 13){//13=enter
                    evento.preventDefault();
                    return false;
                }
          });
        },
    };
})();

