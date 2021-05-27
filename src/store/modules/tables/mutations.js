export default {

    setDances(state, payload) {
        state.dances = payload.obj
    },

    setDisciplines(state, payload) {
        state.disciplines = payload.obj
    },

    setJudges_disciplines(state, payload) {
        state.judges_disciplines = payload.obj
    },

    setJudges_licenses(state, payload) {
        state.judges_licenses = payload.obj
    },

    setOfficials_licenses(state, payload) {
        state.officials_licenses = payload.obj
    },

    setOfficials_roles(state, payload) {
        state.officials_roles = payload.obj
    },

    setSectors_discipline(state, payload) {
        state.sectors_discipline = payload.obj
    },

    setUnit_type(state, payload) {
        state.unit_type = payload.obj
    },

    setAge_category(state, payload) {
        state.age_category = payload.obj
    },

    setClasse(state, payload) {
        state.classe = payload.obj
    },

    setCompetition_type(state, payload) {
        state.competition_type = payload.obj
    },

    setJudging_systems(state, payload) {
        state.judging_systems = payload.obj
    },

    setRounds(state, payload) {
        state.rounds = payload.obj
    },

};