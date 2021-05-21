import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

export default {
    // root global state
    state() {
        return {
            userId: null,
            token: null,
            didAutoLogout: false,
            //
            events: null

        }
    },
    mutations,
    actions,
    getters
}