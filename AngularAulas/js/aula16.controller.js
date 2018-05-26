app.directive('tooltip', function(){
    return{
        restrict : 'A',
        link : function(scope, iEle, iAttr){
            
            console.info(iEle.html());
            //console.info(iEle.hide("slow"));
            
            iEle.tooltipsy({
                offset : [10, 0],
                content : scope.textToolTip
            });
            
        }
    }
});

app.controller('aula16', function($scope){
    
    $scope.textToolTip = "Esse é o texto da minha ToolTip";
    
});

$(function(){
    //nao colocar dentro do controller
    $(".tooltip").tooltipsy({
        offset : [0,10]
    });
});