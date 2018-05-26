var MAIN = (function(){
    return{

        init: function(){
            //demonstração
            console.info("Começou!!!");  
            $('#end').daterangepicker({
            locale: {
                format: 'DD/MM/YYYY'
            }
        });

        },
    };
})();

