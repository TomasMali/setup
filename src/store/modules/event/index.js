import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

export default {
    namespaced: true,
    // root global state
    state() {
        return {
            events: null,
        }
    },
    mutations,
    actions,
    getters
}