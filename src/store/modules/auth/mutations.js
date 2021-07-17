export default {
    setUser(state, payload) {
        state.token = payload.token;
        state.userId = payload.userId;
        state.email = payload.email;
        state.didAutoLogout = false;
    },
    // serve solo per cambiare pagina, solo quando si fa autologout, cioe quando finisce il tempo
    setAutoLogout(state) {
        state.didAutoLogout = true;
    },
};