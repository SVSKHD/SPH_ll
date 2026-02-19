import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home.vue'
import Layout from '../components/layout/layout.vue'

const routes = [
    {
        path: '/', name: 'Layout', component: Layout, children: [
            { path: '/', name: 'Home', component: Home }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router