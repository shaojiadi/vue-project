import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),  //默认
  history: createWebHistory(window.location.pathname),  //默认
  // history: createMemoryHistory(window.__POWERED_BY_QIANKUN__ ? "/" : "/"),
  routes
})


export default router
