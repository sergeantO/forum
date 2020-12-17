import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/invite/:invite',
    name: 'Invite',
    props: true,
    component: () => import(/* webpackChunkName: "login" */ '../views/Invite.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "login" */ '../views/Profile.vue'),
  },
  {
    path: '/notes',
    name: 'Notes',
    component: () => import(/* webpackChunkName: "login" */ '../views/Notes.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue'),
  },
  {
    path: '/article/:id',
    name: 'Article',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Article.vue'),
  },
  {
    path: '/new-article',
    name: 'NewArticle',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/NewArticle.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const regex = /\/invite\/.*/i;

  const publicPages = ['/login', '/'];
  const authRequired = !publicPages.includes(to.path) && !regex.test(to.path);
  const loggedIn = localStorage.getItem('user');

  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
