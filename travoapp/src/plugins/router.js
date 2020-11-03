import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './../../src/components/homepage/HomePage.vue';
import DashPage from './../components/homepage/DashPage.vue';

Vue.use(Router)

export default new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({
        y: 0
    }),
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: HomePage
        },
        {
            path: '/bucket/:id',
            name: 'dashpage',
            component: DashPage,
            props: true
        }
    ]
})