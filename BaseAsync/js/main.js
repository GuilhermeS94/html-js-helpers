var MAIN = (function(){
    return{

        init: function(){
            //demonstração
          console.info("Começou!!!");  
            MAIN.car1();
            MAIN.car2.catch((err)=>{
                console.log("Erro Car 2: ", err);
            });
            MAIN.car3((err)=>{
                if(err) console.log("Erro Car 3: ", err);
            });
        },

        car1: async ()=>{
            try {
                console.info("Car 1");  
                $('.car1').owlCarousel({
                    loop:true,
                    margin:10,
                    nav:true,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:3
                        },
                        1000:{
                            items:5
                        }
                    }
                });
                
            } catch (ex) {
                console.log("Erro: ", ex);
            } 
        },

        car2: new Promise((resolve)=>{  
            //let classe = document.getElementById("test").class;
            //forcar erro
            console.log("Car 2");
            $('.car2').owlCarousel({
                loop:true,
                margin:10,
                nav:true,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:3
                    },
                    1000:{
                        items:5
                    }
                }
            });
        }),

        car3: (callback)=>{
          console.info("Car 3");  
          $('.car3').owlCarousel({
                loop:true,
                margin:10,
                nav:true,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:3
                    },
                    1000:{
                        items:5
                    }
                }
            });
        },
    };
})();

