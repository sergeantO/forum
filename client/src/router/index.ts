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
    path: '/profile/:userId',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "login" */ '../views/Profile.vue'),
  },
  {
    path: '/notes',
    name: 'Notes',
    component: () => import(/* webpackChunkName: "login" */ '../views/Notes.vue'),
  },
  {
    path: '/my-articles',
    name: 'MyArticles',
    component: () => import(/* webpackChunkName: "login" */ '../views/MyArticles.vue'),
  },
  {
    path: '/bookmarks',
    name: 'Bookmarks',
    component: () => import(/* webpackChunkName: "login" */ '../views/Bookmarks.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue'),
  },
  {
    path: '/article/edit/new',
    name: 'New Article',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewArticle.vue'),
  },
  {
    path: '/article/edit/:id',
    name: 'Article Edit',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewArticle.vue'),
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: () => import(/* webpackChunkName: "about" */ '../views/Article.vue'),
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
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return new Promise( (resolve, reject) => {
        setTimeout(() => {
          resolve({ selector: to.hash, behavior: 'smooth', offset: { y: 120, x: 0 }  })
        }, 1200);
      })
    }
  },
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
