import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(Router);

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () => import(../views/About.vue')

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: () => import('../views/About.vue') },
    { path: '/privacy', name: 'privacy', component: () => import('../views/Privacy.vue') },
    { path: '/validate/:id', name: 'validate', component: () => import('../views/Validate.vue') },
    { path: '/account', name: 'account', title: 'account', component: () => import('../views/account.vue') },
    { path: '/schedule', name: 'schedule', title: 'schedule', component: () => import('../views/Schedule.vue') },
    { path: '/note', name: 'sendnote', title: 'sendnote', component: () => import('../views/send-note.vue') },
];

const router = new Router({
    mode: 'history',
    fallback: true,
    routes: routes,
    base: process.env.BASE_URL,

});

export default router;

