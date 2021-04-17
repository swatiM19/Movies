import Vue from 'vue';
import VueRouter from 'vue-router';
import MovieContent from '../components/MovieContent.vue';
import Home from '../components/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/movie/:id',
    name: 'MovieContent',
    props: true,
    component: MovieContent,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
