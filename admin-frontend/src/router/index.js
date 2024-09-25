import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/HomePage.vue';
import UserLogin from '../views/UserLogin.vue';
import UserRegister from '../views/UserLogin.vue';
import ApplicationDeployment from '../views/ApplicationDeployment.vue';
import KubectlInterface from '../views/KubectlInterface.vue';
import ClusterManagement from '../views/ClusterManagement.vue';
import NodeManagement from '../views/NodeManagement.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: UserLogin },
  { path: '/register', component: UserRegister },
  { path: '/clusters/management', component: ClusterManagement },
  { path: '/clusters/nodes', component: NodeManagement },
  { path: '/applications', component: ApplicationDeployment },
  { path: '/kubectl', component: KubectlInterface },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;