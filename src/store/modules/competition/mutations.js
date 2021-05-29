export default {

    setCompetitions(state, payload) {
        state.competitions = payload.competitionObj
    },

    setMyCompetitions(state, payload) {
        state.myCompetitions = payload.myCompetitionObj
    }

};