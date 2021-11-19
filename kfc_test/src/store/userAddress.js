import axios from 'axios'
export default {
    namespaced: true,
    state() {

        return {
            //所有地址
            allAddress: [],
            //当前选择地址
            nowAddress: {},

        }
    },

    actions: {
        //异步查询所有地址接口
        async findAllAddress(store, params) {
            const res = await axios({
                method: "GET",
                url: "/findAddress",
                params,
            })
            store.commit('updateAllAddress', res.data.result)
        },
        //异步根据aid查询地址接口
        async findNowAddress(store, params) {
            const res = await axios({
                method: "GET",
                url: "/findAddressByAid",
                params,
            })

            store.commit('updateNowAddress', res.data.result[0])
        },
        //新增地址接口
        async addAddress(store, data) {
            const res = await axios({
                method: "POST",
                url: "/addAddress",
                data,
            })
        },
        //删除地址接口
        async deleteAddress(store, data) {
            const res = await axios({
                method: "POST",
                url: "/deleteAddress",
                data,
            })
            console.log(res.data);
        },
        //编辑地址接口
        async editAddress(store, data) {
            const res = await axios({
                method: "POST",
                url: "/editAddress",
                data,
            })

        },

    },
    getters: {
        getDefaultAddress(state) {

            state.allAddress.forEach(element => {
                if (element.isDefault == 1) {
                    state.nowAddress = element
                }
            });
            return state.nowAddress
        }
    },
    mutations: {
        //更新所有地址
        updateAllAddress(state, value) {
            state.allAddress = value;
        },
        //更新当前选择地址
        updateNowAddress(state, value) {
            state.nowAddress = value
        }
    },
}