import axios from 'axios'
export default {
    namespaced: true,
    state() {
        // 商品详情
        return {
            // 全部信息
            articleDetali: {},
            // 温度
            goodsTemp: '',
            //糖
            goodsSugar: '',
            //奶油
            goodsCream: '',
            //奶
            goodsMilk: '',
            //购物车商品总数
            allCartCount: 0,
        }


    },

    actions: {
        //异步获取商品信息
        async getarticleDetali(store, params) {
            const res = await axios({
                method: "GET",
                url: "/productDetail",
                params,
            })

            store.commit('updateDetali', res.data.result[0])
        },
        //获取购物车中商品总数量
        async findAllCartCount(store) {
            const res = await axios(
                {
                    method: "GET",
                    url: "/shopcartCount",
                    params: {
                        appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
                        tokenString: localStorage.getItem('token'),
                    },
                }
            )

            store.commit('updateAllCartCount', res.data.result)

        }


    },
    getters: {

    },
    mutations: {
        //更新商品信息
        updateDetali(state, value) {
            state.articleDetali = value
            //温度
            if (value.tem.indexOf("/") != -1)
                state.goodsTemp = value.tem.split("/")
            else state.goodsTemp = [value.tem]
            //糖
            if (value.sugar.indexOf("/") != -1)
                state.goodsSugar = value.sugar.split("/")
            else state.goodsSugar = [value.sugar]
            //奶油
            if (value.cream.indexOf("/") != -1)
                state.goodsCream = value.cream.split("/")
            else state.goodsCream = [value.cream]
            //奶
            if (value.milk.indexOf("/") != -1)
                state.goodsMilk = value.milk.split("/")
            else state.goodsMilk = [value.milk]
        },

        //更新购物车商品总数量
        updateAllCartCount(state, value) {
            state.allCartCount = value
        }
    },
}