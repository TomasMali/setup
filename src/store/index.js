import { createStore } from 'vuex'


import authModule from './modules/auth/index.js'
//import requestModule from 

const store = createStore({
    modules: {
        auth: authModule
    },

})


export default store