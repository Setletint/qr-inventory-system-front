import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Auth from '../pages/Auth.vue';
import Dashboard from '../pages/Dashboard.vue';
import Settings from '../pages/Settings.vue';
import ItemDetail from '../pages/ItemDetail.vue';
import Calendar from '../pages/Calendar.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/auth', component: Auth },
  { path: '/dashboard', component: Dashboard },
  { path: '/settings', component: Settings },
  { path: '/item/:id', component: ItemDetail, props: true },
  { path: '/item/calendar/:id', component: Calendar, props: true },
  { path: '/:pathMatch(.*)', component: Home}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;