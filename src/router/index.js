import Vue from 'vue'
import VueRouter from 'vue-router'
import Downloading from '../views/Downloading.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Downloading',
    component: Downloading
  },
  {
    path: '/finished',
    name: 'Finished',
    component: () => import('../views/Finished.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
