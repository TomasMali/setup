export default {
    userId(state) {
        return state.userId;
    },
    email(state) {
        return state.email;
    },
    token(state) {
        return state.token;
    },
    isAuthenticated(state) {
        return !!state.token;
    },
    role(state) {
        return state.role;
    },
    rolename(state) {
        return state.rolename;
    },
    didAutoLogout(state) {
        return state.didAutoLogout;
    },
};