var MAIN = (function(){
    var listaEnd = [
        { id: 1, lat: -8.2847785, lon: -35.9696734, nome: "ÓTICAS CAROL" },
        { id: 2, lat: -9.7531809, lon: -36.6602428, nome: "ARAPIRACA"  },
        { id: 3, lat: -7.1970039, lon: -48.2102214, nome: "SADOC CORREIA"  },
        { id: 4, lat: -23.4972196, lon: -47.4680545, nome: "DOUTOR AFONSO"  },
        { id: 5, lat: -23.0046025, lon: -46.8422505, nome: "MOGI DAS CRUZES"  },
        { id: 6, lat: -23.9828345, lon: -48.8765407, nome: "SÃO CARLOS"  }
    ];
    return{

        init: function(){
            //demonstração
            console.info("Começou!!!");
            var mapOptions = {
                zoom: 5,
                center: new google.maps.LatLng(-15.126867635531303, -53.180501700000036),
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                }
            };
            MAIN.criarMapa(mapOptions, listaEnd);
        },

        criarMapa: function(mapOptions, markers){
            var latlngbounds, marcadores, mapa, markerCluster;
            
            mapa = new google.maps.Map(
                document.getElementById("dvMapa"),
                mapOptions
            );
            marcadores = new Array();
            latlngbounds = new google.maps.LatLngBounds();
            $(markers).each(function(i, item) {
                var marcador, posicao;

                posicao = new google.maps.LatLng(item.lat, item.lon);
                marcador = new google.maps.Marker({
                    position: posicao,
                    map: mapa,
                    //icon: url + 'assets/img/map.png',
                });

                marcador.setTitle(item.nome);
                latlngbounds.extend(marcador.position);

                var liItem = document.createElement("li");
                liItem.textContent = `${item.id} - ${item.nome}`;
                liItem.id = item.id;
                liItem.setAttribute('name', item.nome);
                liItem.setAttribute('data-lat',item.lat);
                liItem.setAttribute('data-lon',item.lon);
                liItem.setAttribute('onclick', "MAIN.MapaDaLoja(this)");
                document.getElementById("ulLojas").appendChild(liItem);

                return marcadores.push(marcador);
            });
            markerCluster = new MarkerClusterer(
                mapa,
                marcadores,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
            );
            mapa.fitBounds(latlngbounds);
            return console.log('mapa criado');
        },

        MapaDaLoja: function(elemento){

            var mapOptions = {
                zoom: 15,
                center: new google.maps.LatLng(-15.126867635531303, -53.180501700000036),
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                }
            };

            var latlngbounds, marcadores, mapa, markerCluster;
            
            mapa = new google.maps.Map(
                document.getElementById("dvMapa"),
                mapOptions
            );
            var item = {
                id: elemento.id,
                lat: $(elemento).data("lat"),
                lon: $(elemento).data("lon"),
                nome: elemento.name
            };
            marcadores = new Array();
            latlngbounds = new google.maps.LatLngBounds();

            var marcador, posicao;
            posicao = new google.maps.LatLng(item.lat, item.lon);
            marcador = new google.maps.Marker({
                position: posicao,
                map: mapa,
                //icon: url + 'assets/img/map.png',
            });
            marcador.setTitle(item.nome);

            var info = new google.maps.InfoWindow({
                content: elemento.textContent,
                maxWidth: 250
            });

            marcador.addListener('click', function() {
                info.close(mapa);
                return info.open(mapa, marcador);
            });
            info.open(mapa, marcador);
            
            latlngbounds.extend(marcador.position);
            marcadores.push(marcador);

            markerCluster = new MarkerClusterer(
                mapa,
                marcadores,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
            );
            
            mapa.fitBounds(latlngbounds);
            return console.log('mapa da loja');
        },
    };
})();

