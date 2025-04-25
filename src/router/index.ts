import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Auth from '../pages/Auth.vue';
import Dashboard from '../pages/Dashboard.vue';
import Settings from '../pages/Settings.vue';
import ItemDetail from '../pages/ItemDetail.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/auth', component: Auth },
  { path: '/dashboard', component: Dashboard },
  { path: '/settings', component: Settings },
  { path: '/item/:id', component: ItemDetail, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;