import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue"
import Login from "../views/Login.vue"
import Register from '../views/Register.vue'
import DefaultLayout from '../components/DefaultLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'
import Surveys from '../views/Surveys.vue'
import store from "../store";


const routes=[
    {
        path:'/',
        redirect: '/dashboard',
        name:'Dashboard',
        component:DefaultLayout,
        meta:{requredAuth: true}, //neophodna autentifikacija
        children:[
            {path:'/dashboard',name: 'Dashboard',component:Dashboard},
            {path:'/surveys',name: 'Surveys',component:Surveys}
        ]
    },
    {
        path: "/auth",
        redirect: "/login",
        name: "Auth",
        component: AuthLayout,
        meta: {isGuest: true},
        children: [
          {
            path: "/login",
            name: "Login",
            component: Login,
          },
          {
            path: "/register",
            name: "Register",
            component: Register,
          },
        ],
    },
    
];

const router=createRouter({
    history:createWebHistory(),
    routes
})
//korisnik mora biti ulogovan i token nije null
router.beforeEach((to,from,next)=>{
if(toString.meta.requredAuth && !store.state.user.token){
    next({name:'Login'})
}else if(store.state.user.token && toString.meta.isGuest){
    next({name: 'Dashboard'});
}else{
    next();
}
});



export default router