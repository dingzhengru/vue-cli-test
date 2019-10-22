import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'



console.log(process.env.BASE_URL);

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue')
  },
  // {
  //   path: '/*',
  //   name: 'error',
  //   component: () => import('../views/404.vue')
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
