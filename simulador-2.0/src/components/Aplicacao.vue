<template>
    <div class="container">
        <div class="row">&nbsp;</div>
        <div class="row">
            <div class="col-md-12">
                <iframe :src="objAplicacao.urlIframe" id="telaDaAplicacao" frameborder="1" style="width: 100%; height:500px;"></iframe>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:["urliframe"],
    data(){
        return{
            objAplicacao:{
                urlIframe: this.urliframe,
            }
        }
    },
    watch: {
        urliframe: {
            handler: function(urlNova){
                this.objAplicacao.urlIframe = urlNova;
                //Atualizar o IFRAME
                //Object.assign(this.$data, this.$options.data.call(this));
            },
            immediate: true
        }
    },        
    methods: {
        
    },
}
</script>