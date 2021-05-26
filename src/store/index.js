import { createStore } from 'vuex'


import authModule from './modules/auth/index.js'
import eventModule from './modules/event/index.js'
import competitionModule from './modules/competition/index.js'
import tabsModule from './modules/tables/index.js'
//import requestModule from 

const store = createStore({
    modules: {
        auth: authModule,
        event: eventModule,
        competition: competitionModule,
        tab: tabsModule,
    },

})


export default store