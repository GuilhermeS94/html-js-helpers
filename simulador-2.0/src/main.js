import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import App from "./App.vue"
import Aplicacao from "./components/Aplicacao.vue"
import Contexto from "./components/Contexto.vue"
import GateWay from "./components/GateWay.vue"


const rotas = [
    {path: "/", component: Aplicacao},
    {path: "/gateway", component: GateWay},
    {path: "/contexto", component: Contexto},
    { path: "*", redirect: "/" }
];

const roteador = new VueRouter({
    mode: "history",
    routes: rotas
});

new Vue({
    el: "#app",
    router: roteador,
    render: h => h(App)
});