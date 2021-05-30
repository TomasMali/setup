export default {

    setFidsCompetitions(state, payload) {
        state.fidsCompetitions = payload.fidsCompetitionObj
    },

    setMyCompetitions(state, payload) {
        state.myCompetitions = payload.myCompetitionObj
    }

};