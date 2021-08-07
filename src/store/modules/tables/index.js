import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
    namespaced: true,
    // root global state
    state() {
        return {
            dances: null,
            disciplines: null,
            judges_disciplines: null,
            judges_licenses: null,
            officials_licenses: null,
            officials_roles: null,
            sectors_discipline: null,
            unit_type: null,
            age_category: null,
            classe: null,
            competition_type: null,
            judging_systems: null,
            rounds: null,
            roles: null,
        };
    },
    mutations,
    actions,
    getters,
};