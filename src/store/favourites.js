// Store для избранных фото

const FAV_KEY = "favourites"

export default {
  state: {
    favourites: []
  },
  getters: {
    getFavourites(state) {
      return state.favourites
    }
  },
  mutations: {
    // Добавление фото в избранное с ключом
    ADD_TO_FAVOURITES(state, payload) {
      state.favourites.push(payload)
      localStorage.setItem(FAV_KEY, JSON.stringify(state.favourites))
    },
    // Загрузка фото из local storage
    GET_FAVOURITES(state) {
      state.favourites = JSON.parse(localStorage.getItem(FAV_KEY) || "[]")
    },
    // Удаление фото из избранного
    REMOVE_FROM_FAVOURITES(state, payload) {
      state.favourites.splice(state.favourites.indexOf(payload), 1)
      localStorage.setItem(FAV_KEY, JSON.stringify(state.favourites))
    }
  },
  actions: {
    addToFavourites({ commit }, payload) {
      commit("ADD_TO_FAVOURITES", payload)
    },
    getFavourites({ commit }) {
      commit("GET_FAVOURITES")
    },
    removeFromFavourites({ commit }, payload) {
      commit("REMOVE_FROM_FAVOURITES", payload)
    }
  }
}
