import Vue from 'vue'
import Vuex from 'vuex'

import StoreProduct from './product.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        product: StoreProduct
    }
})
