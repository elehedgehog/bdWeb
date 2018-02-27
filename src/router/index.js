import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/Login'
const ResourceEntry = resolve => require(['../components/ResourceEntry'], resolve)
const FlowChart = resolve => require(['../components/home/flowChart.vue'], resolve)
const DataDeal = resolve => require(['../components/dataDeal/dataDeal'], resolve)
const ResourceManage = resolve => require(['../components/resourceManage/resourceManage'], resolve)
const DataServer = resolve => require(['../components/dataServer/dataServer'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'resourceEntry',
      component: ResourceEntry,
      children: [
        { path: '', name: 'index', component: FlowChart },      
        { path: 'dataDeal', name: 'dataDeal', component: DataDeal }, 
        { path: 'resourceManage', name: 'resource', component: ResourceManage },  
        { path: 'dataServer', name: 'dataServ', component: DataServer },      
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) 
      return savedPosition
    else 
      return { x: 0, y: 0 }
  }
})