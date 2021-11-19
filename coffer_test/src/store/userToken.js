export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        }
    },
    getters: {
        getSortage: function (state) {
            // if (!state.token) {
            //     state.token = JSON.parse(localStorage.getItem('token'))
            // }
            return state.token
        }
    },
    mutations: {
        $_setStorage(state, value) {
            state.token = value;
            localStorage.setItem('token', value)
        },
        $_removeStorage(state) {
            state.token = null;
            localStorage.removeItem('token')
        }
    },
}