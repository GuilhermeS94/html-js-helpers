<template>
    <div class="container">
        <div class="row">&nbsp;</div>
        <div class="row">
            <div class="col-md-4">
            <h2>Autenticação no GateWay</h2>
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control form-control-sm" placeholder="Funcional MAR" v-model="objGateWay.funcional">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control form-control-sm" placeholder="Senha" v-model="objGateWay.senha">
                    </div>
                    <div class="form-group">
                        <button class="btn btn-default" type="button" @click="autenticarNoGateWay" >Autenticar</button>
                    </div>
                </form>
            </div>
            <div class="col-md-4" v-if="objGateWay.objToken.autenticacao == 'OK'">
                <div class="form-group">
                    <span class="label label-success">Autenticado!!!</span>
                </div>
                <div class="form-group">
                    {{this.objGateWay.objToken}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props: ["gatewayvaivem"],
        data(){
            return{
                objGateWay:{
                    funcional: "",
                    senha: "",
                    objToken: {}
                },
                urlTokenOAuth: "URL_AUTENTICACAO_GATEWAY/",
            }
        },
        methods:{
            autenticarNoGateWay(){
                if(this.objGateWay.funcional && this.objGateWay.senha){
                    
                    fetch(`${this.urlTokenOAuth}api/GatewayTokenOAuth`, {
                        method: "POST",
                        //mode: "cors", // pode ser cors ou basic(default)
                        headers: new Headers({
                            
                        }),
                        body:{

                        }
                    }).then(res => res.json()) // retorno da promise
                    .then(resultado => {// dados brutos
                        this.objGateWay.objToken = resultado;

                        if(this.objGateWay.objToken.autenticacao != "OK"){                    
                            this.objGateWay.objToken = {}                        
                        }
                        
                        this.$emit("atualizarTokenGateWay", this.objGateWay);
                        return true;
                    })
                    .catch(err => {// caso algum de falha
                        console.error("Houve algum problema durante o tratamento:", err);                        
                        return false;
                    });
                } else {
                    this.objGateWay.objToken = {}
                    this.$emit("atualizarTokenGateWay", this.objGateWay);
                    return false;
                }
            }
        },
        created(){
            if(Object.keys(this.gatewayvaivem).length > 0){
                this.objGateWay = this.gatewayvaivem;
            }
        },
    }
</script>