import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from '/src/router/routes.js'

// Determine the type of history to use based on environment variables or defaults
const createHistory = import.meta.env.VITE_ROUTER_MODE === 'history'
    ? createWebHistory
    : (import.meta.env.VITE_ROUTER_MODE === 'hash'
        ? createWebHashHistory
        : createMemoryHistory)

const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
  history: createHistory(import.meta.env.VITE_ROUTER_BASE || '/')
})

export default Router
