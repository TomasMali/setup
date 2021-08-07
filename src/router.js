import { createRouter, createWebHistory } from "vue-router";

import PagePubblic from "./components/pubblic/PagePubblic.vue";
import CreateEvents from "./components/private/event/CreateEvents.vue";
import CreateCompetitions from "./components/private/competition/CreateCompetitions.vue";
import UserRegister from "./pages/auth/UserRegister.vue";
import UserLogin from "./pages/auth/UserLogin.vue";
import NotFound from "./pages/NotFound.vue";
import ResetPassword from "./pages/auth/ResetPassword.vue";
import ChangePassword from "./pages/auth/ChangePassword.vue";
import store from "./store/index.js";
import ManageData from "./components/private/management/ManageData.vue";

const router = createRouter({
    history: createWebHistory(),
    base: "/tomi/",
    routes: [
        { path: "/", redirect: "/public" },
        { path: "/public", component: PagePubblic },
        {
            path: "/events",
            component: CreateEvents,
            meta: { privateProtection: true },
        },
        {
            path: "/competitions",
            component: CreateCompetitions,
            meta: { privateProtection: true },
        },

        {
            path: "/register",
            component: UserRegister,
            meta: { registerProtection: true },
        },
        { path: "/login", component: UserLogin, meta: { loginProtection: true } },
        {
            path: "/resetPassword",
            component: ResetPassword,
            meta: { resetProtection: true },
        },
        {
            path: "/changePassword",
            component: ChangePassword,
            meta: { changeProtection: true },
        },

        {
            path: "/manage",
            component: ManageData,
            meta: { privateProtection: true },
        },

        { path: "/:notFound(.*)", component: NotFound },
    ],
});

/**
 * To -> is the route where we are going to
 */
router.beforeEach(function(to, _, next) {
    // se è  rischiesta la protezione e non siamo autenticati, blocco l'utente
    if (to.meta.privateProtection && !store.getters["auth/isAuthenticated"]) {
        next("/login");
    }
    // se sono loggato e voglio fare il login
    if (to.meta.loginProtection && store.getters["auth/isAuthenticated"]) {
        next("/events");
    }
    // se sono loggato e voglio fare il login
    if (to.meta.loginProtection && store.getters["auth/isAuthenticated"]) {
        next("/competitions");
    }
    // se sono loggato e voglio fare la registrazione
    if (to.meta.registerProtection && store.getters["auth/isAuthenticated"]) {
        next("/events");
    }

    // se sono loggato non posso resettare la password
    if (to.meta.resetProtection && store.getters["auth/isAuthenticated"]) {
        next("/events");
    }

    // se sono loggato non posso cambiare la password
    if (to.meta.changeProtection && store.getters.isAuthenticated) {
        next("/events");
    }

    next();
});

export default router;