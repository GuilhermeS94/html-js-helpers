var Troca = function () {
    var posicao = 0;
    var objs = [
        { "nome" : "BBC" , "link" : "http://www.bbc.com/"},
        { "nome" : "Wiki BBC" , "link" : "http://en.wikipedia.org/wiki/BBC"},
    ];
    return {        
        init: function () {
            
            console.info("Começou!!");
                        
            //1000 = 1 seg
            var tempo = 1000 * 60 * 2;
                        
            //primeira execução
            $("#janela").attr("src" , objs[posicao].link);
            document.title = objs[posicao].nome;
            posicao++;
            
            setInterval(
                function(){
                    
                    posicao = (posicao < 0)?(objs.length-1):(posicao >= objs.length)?0:posicao;
            
                    $("#janela").attr("src" , objs[posicao].link);
                    document.title = objs[posicao].nome;
                    posicao++;
                },
            tempo);
        },        
        TrocaBySeta : function (evento) {
            
            if (!evento) evento = window.event;

            var code = evento.keyCode;

            if (evento.charCode && code == 0) code = evento.charCode;

            switch(code) {
                case 37://esquerda
                    Troca.VoltaTela();
                    break;
                case 38://cima
                    Troca.ProximaTela();
                    break;
                case 39://direita
                    Troca.ProximaTela();
                    break;
                case 40://baixo
                    Troca.VoltaTela();
                    break;
            }
            evento.preventDefault();
            
        },

        ProximaTela: function(){
            posicao++;
            posicao = (posicao >= objs.length)?0:posicao;

            $("#janela").attr("src" , objs[posicao].link);
            document.title = objs[posicao].nome;
        },
        VoltaTela: function(){
            posicao--;
            posicao = (posicao < 0)?(objs.length-1):posicao;

            $("#janela").attr("src" , objs[posicao].link);
            document.title = objs[posicao].nome;
        },
    };

}();