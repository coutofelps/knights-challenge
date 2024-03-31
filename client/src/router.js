import Vue from 'vue'
import VueRouter from 'vue-router'
import KnightList from './views/components/KnightList.vue'
import KnightDetails from './views/components/KnightDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'KnightList',
    component: KnightList,
  },
  {
    path: '/knight/add',
    name: 'KnightAdd',
    component: KnightDetails,
  },
  {
    path: '/knight/edit/:id',
    name: 'KnightEdit',
    component: KnightDetails,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '',
  routes
})

export default router
