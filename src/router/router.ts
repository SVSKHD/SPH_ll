import { createRouter, createWebHistory } from 'vue-router'
import Lock from '../pages/lock.vue'
import Home from '../pages/home.vue'
import Layout from '../components/layout/layout.vue'

const routes = [
    {
        path: '/', name: 'Lock', component: Lock
    },
    {
        path: '/home', name: 'Layout', component: Layout, children: [
            { path: '', name: 'Home', component: Home }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router