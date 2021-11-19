export default {
    namespaced: true,
    state: {
        //购物车选中的商品
        sids: sessionStorage.getItem('sids') ? sessionStorage.getItem('sids').split(',') : [],
    },
    getters: {

    },
    mutations: {
        //设置所需商品
        setSids(state, value) {
            state.sids = value
            sessionStorage.setItem('sids', value)
        },
    },
}