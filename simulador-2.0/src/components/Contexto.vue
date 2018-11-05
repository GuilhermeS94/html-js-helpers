<template>
    <div class="container">
        <div class="row">&nbsp;</div>
        <div class="row"><h2>Contexto do Simulador</h2></div>
        <div class="row">
            <div class="col-md-4">                
                <div class="form-group">
                    <label for="contexto">Canal</label>
                    <select class="form-control form-control-sm" @change="atlzDadosCanaisContexto" v-model="codigoCanal">
                        <option value="51" selected>Pool</option>
                        <option value="11">CockPit</option>
                    </select>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="contexto">Contexo</label>
                    <textarea v-model="variaveisContexto" @input="converterObjeto" class="form-control" cols="50" rows="35" style="resize:none;"></textarea>
                </div>  
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props:["contextovaivem"],
        data(){
            return{
                codigoCanal: 51,
                variaveisContexto: "",
                objContexto:{},
                chavesAPI:[
                    {chave:11, client_id:"", client_secret:"", "x-i-api-key":"", "Canal.MBIApikey":""},
                    {chave:51, client_id:"", client_secret:"", "x-i-api-key":"", "Canal.MBIApikey":""}
                ]
            }
        },
        methods:{
            atlzDadosCanaisContexto(){
                var canalSelecionado = this.chavesAPI.find(item => item.chave==this.codigoCanal);
                this.objContexto["Canal.CodigoCanal"] = this.codigoCanal;
                this.objContexto["Canal.MBIApikey"] = canalSelecionado["Canal.MBIApikey"];
                this.objContexto["Canal.ClientSecret"] = canalSelecionado.client_secret;
                this.atlzDadosVariaveisContexto();
                this.converterObjeto();
            },
            atlzDadosVariaveisContexto(){
                this.variaveisContexto = JSON.stringify(this.objContexto, null, 4);
            },
            converterObjeto(){
                try{
                    var canalSelecionado = this.chavesAPI.find(item => item.chave==this.codigoCanal);
                    this.objContexto["Canal.CodigoCanal"] = this.codigoCanal;
                    this.objContexto["Canal.MBIApikey"] = canalSelecionado["Canal.MBIApikey"];
                    this.objContexto["Canal.ClientSecret"] = canalSelecionado.client_secret;
                    this.$emit("atualizarContexto", this.objContexto);
                }catch(ex){
                    console.info(ex)
                }
            }
        },
        created(){
            if(this.contextovaivem){
                this.objContexto = this.contextovaivem;
                this.codigoCanal = this.contextovaivem["Canal.CodigoCanal"];
            }
            this.atlzDadosCanaisContexto();
        },
    }
</script>