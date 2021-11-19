import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import userToken from './userToken'
import sortDetali from './sortDetali'
import sortCart from './sortCart'
import userAddress from './userAddress'


export default new Vuex.Store({
  modules: {
    userToken,
    sortDetali,
    sortCart,
    userAddress
  }
})
