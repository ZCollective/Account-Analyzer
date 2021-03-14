import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: () => import(/* webpackChunkName: "analyzed" */ '../views/Analysis.vue')
  }
]

const router = new VueRouter({
  base: '/analyzer',
  routes
})

export default router
