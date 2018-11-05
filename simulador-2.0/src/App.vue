<template>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <router-link class="navbar-brand" to="/">Simulador 2.0</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/" @click.native="mostrarAppAcao" >My App</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/contexto" @click.native="mostrarContextoAcao" >Contexto</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/gateway" @click.native="mostrarAuthGateWayAcao" >GateWay</router-link>
                    </li>
                </ul>
                <div class="form-inline ml-auto">
                    <div class="md-form my-0">
                        <input class="form-control" style="width:350px;" type="text" placeholder="URL" v-model="urlProvisoriaIframe">
                    </div>
                    <button class="btn btn-primary btn-md my-0 ml-sm-2" @click="atualizarObjAplicacao" type="button" >Atualizar</button>
                </div>
            </div>
        </nav>
        <br/>
        <div class="container">
        <!--{{objPrincipal.objContexto}}
        <br/>
        {{objPrincipal.authGateWay}}-->
            <div class="row">
                <div class="col-md-12 border border-secondary">
                    <Aplicacao 
                        :urliframe="objPrincipal.urlIframe"
                        v-if="mostrarApp" />
                    <Contexto
                        @atualizarContexto="atualizarObjContexto"
                        :contextovaivem="objPrincipal.objContexto"
                        v-if="mostrarContexto" />
                    <GateWay
                        @atualizarTokenGateWay="atualizarObjTokenGateWay"
                        :gatewayvaivem="objPrincipal.authGateWay"
                        v-if="mostrarAuthGateWay" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Aplicacao from "./components/Aplicacao.vue";
import Contexto from "./components/Contexto.vue";
import GateWay from "./components/GateWay.vue";
export default {
    data(){
        return {
            objPrincipal:{
                urlIframe: "",
                objAplicacao: {},
                objContexto: {
                    "Canal.CodigoCanal": 51,
                    "Canal.MBIApikey": "",
                    "Canal.ClientSecret": "",
                    "Canal.NumeroDoTerminal": "",
                    "Canal.NumeroChaveProcessadorQT": "",
                    "Canal.CodigoVersaoTerminal": "0172",
                    "Canal.TamanhoMensagemCanal": "1500",
                    "Canal.InstituicaoLogicaDaEA": "004341",
                    "Canal.NomeDaEstacaoCliente": "WEB-172.30.153.182",
                    "Canal.CodigoInstituicaoFisico": "004341",
                    "Canal.CodigoInstituicaoOperacional": "004341",
                    "Canal.CodigoPlataforma": "WEB",
                    "Canal.Segmento": "G",
                    "Canal.CodigoMaquinaCliente": "123",
                    "Gerente.Funcional": "004001228",
                    "Gerente.Shatu": "822100",
                    "Gerente.OrgaoQT": "",
                    "Gerente.Senha": "822100",
                    "Gerente.NumeroDoToken": "",
                    "Gerente.TipoMovimento": "",
                    "Gerente.Nome": "0",
                    "Gerente.SenhaCriptografada": "0",
                    "Gerente.SenhaOriginal": "0",
                    "Gerente.Nivelac": "111",
                    "Gerente.TipoDeEmpresa": "004341",
                    "Gerente.Orgao": "0374595",
                    "Gerente.CodigoCarteiraSelecionada": "",
                    "Gerente.Racf": "",
                    "Gerente.TokenOAuth": "",
                    "Codigo.Departamento": "0"
                },
                authGateWay: {},
                objTokenDI2: {},
            },
            urlBasePoolApp: "URL_BASE_POOL/",
            urlProvisoriaIframe: "",
            mostrarApp: false,
            mostrarContexto: false,
            mostrarAuthGateWay: false,
        }
    },
    methods:{
        atualizarObjAplicacao(){
            this.objPrincipal.urlIframe = this.urlProvisoriaIframe;
            fetch(`${this.urlBasePoolApp}token`, {
                method: "POST",
                //mode: "cors", // pode ser cors ou basic(default)
                body:{
                    grant_type: "password",
                    username: "usuario",
                    password: "senha",
                    client_id: "client_id",
                    ContextoCanal: JSON.stringify(this.objPrincipal.objContexto)
                }
            }).then(res => res.json()) // retorno da promise
            .then(resultado => {// dados brutos
                this.objPrincipal.objTokenDI2 = resultado;
                var frameApp = document.getElementById("telaDaAplicacao");
                frameApp.contentWindow.postMessage(
                    `{
                        "tokenAutenticacaoPoolAplicacao": "${this.objPrincipal.objTokenDI2}",
                        "codigoCanal": "${this.objPrincipal.objContexto['Canal.CodigoCanal']}",
                        "ambienteParametrizadoCanal": "desenvolvimento",
                        "urlScriptsPoolAplicacao": "${this.urlBasePoolApp}",
                        "contexto": "${JSON.stringify(this.objPrincipal.objContexto)}"
                    }`
                ,"*");
            })
            .catch(err => {// caso algum de falha
                console.error('Houve algum problema durante o tratamento:', err);
            });
        },
        atualizarObjContexto(objContextoNovo){
            this.objPrincipal.objContexto = objContextoNovo;
        },
        atualizarObjTokenGateWay(objGateWayNovo){
            this.objPrincipal.authGateWay = objGateWayNovo;
            this.objPrincipal.objContexto["Gerente.TokenOAuth"] = objGateWayNovo.objToken.access_token;
        },
        mostrarAppAcao(){
            this.mostrarApp = true;
            this.mostrarContexto = false;
            this.mostrarAuthGateWay = false;
        },
        mostrarContextoAcao(){
            this.mostrarApp = false;
            this.mostrarContexto = true;
            this.mostrarAuthGateWay = false;
        },
        mostrarAuthGateWayAcao(){
            this.mostrarApp = false;
            this.mostrarContexto = false;
            this.mostrarAuthGateWay = true;
        },
        getTokenDI2(){
            fetch(`${this.urlBasePoolApp}token`, {
                method: "POST",
                //mode: "cors", // pode ser cors ou basic(default)
                body:{
                    grant_type: "password",
                    username: "usuario",
                    password: "senha",
                    client_id: "client_id",
                    ContextoCanal: JSON.stringify(this.objPrincipal.objContexto)
                }
            }).then(res => res.json()) // retorno da promise
            .then(resultado => {// dados brutos
                console.log(resultado);
                this.objTokenDI2 = resultado;
            })
            .catch(err => {// caso algum de falha
                console.error('Houve algum problema durante o tratamento:', err);
            });
        }
    },
    components:{
        Contexto,
        GateWay,
        Aplicacao
    },
    created() {
        this.mostrarApp = true;
    },
}
</script>