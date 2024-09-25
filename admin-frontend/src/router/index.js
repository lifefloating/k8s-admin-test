import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/HomePage.vue';
import UserLogin from '../views/UserLogin.vue';
import UserRegister from '../views/UserRegister.vue';
import ApplicationDeployment from '../views/ApplicationDeployment.vue';
import KubectlInterface from '../views/KubectlInterface.vue';
import ClusterManagement from '../views/ClusterManagement.vue';
import NodeManagement from '../views/NodeManagement.vue';

const routes = [
//   { path: '/', component: Home },
  { path: '/login', component: UserLogin },
  { path: '/register', component: UserRegister },
  { path: '/cluster/management', component: ClusterManagement },
  { path: '/cluster/nodes', component: NodeManagement },
  { path: '/applications', component: ApplicationDeployment },
  { path: '/kubectl', component: KubectlInterface },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;