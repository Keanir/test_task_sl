import Vue from "vue"
import Vuex from "vuex"

import loading from "./loading"
import breeds from "./breeds"
import favourites from "./favourites"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loading,
    breeds,
    favourites
  }
})
