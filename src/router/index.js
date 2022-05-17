import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/components/Login.vue';
import SignUp from '@/components/SignUp.vue';
import Chat from '@/components/Chat.vue';
import Profile from '@/components/Profile.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/sign-up',
        name: 'signup',
        component: SignUp,
    },
    {
        path: '/chat',
        name: 'chat',
        component: Chat,
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
