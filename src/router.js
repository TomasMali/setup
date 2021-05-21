import { createRouter, createWebHistory } from 'vue-router'

import PagePubblic from './components/pubblic/PagePubblic.vue'
import PagePrivate from './components/private/PagePrivate.vue'
import UserRegister from './pages/auth/UserRegister.vue'
import UserLogin from './pages/auth/UserLogin.vue'
import NotFound from './pages/NotFound.vue'
import ResetPassword from './pages/auth/ResetPassword.vue'
import ChangePassword from './pages/auth/ChangePassword.vue'
import store from './store/index.js'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/public' },
        { path: '/public', component: PagePubblic },
        { path: '/private', component: PagePrivate, meta: { privateProtection: true } },

        { path: '/register', component: UserRegister, meta: { registerProtection: true } },
        { path: "/login", component: UserLogin, meta: { loginProtection: true } },
        { path: '/resetPassword', component: ResetPassword, meta: { resetProtection: true } },
        { path: '/changePassword', component: ChangePassword, meta: { changeProtection: true } },

        { path: '/:notFound(.*)', component: NotFound }
    ]
});


/**
 * To -> is the route where we are going to
 */
router.beforeEach(function(to, _, next) {
    // se è  rischiesta la protezione e non siamo autenticati, blocco l'utente
    if (to.meta.privateProtection && !store.getters.isAuthenticated) {
        next('/login')
    }
    // se sono loggato e voglio fare il login
    if (to.meta.loginProtection && store.getters.isAuthenticated) {
        next('/private')
    }
    // se sono loggato e voglio fare la registrazione
    if (to.meta.registerProtection && store.getters.isAuthenticated) {
        next('/private')
    }

    // se sono loggato non posso resettare la password
    if (to.meta.resetProtection && store.getters.isAuthenticated) {
        next('/private')
    }

    // se sono loggato non posso cambiare la password
    if (to.meta.changeProtection && store.getters.isAuthenticated) {
        next('/private')
    }


    next()
})

export default router