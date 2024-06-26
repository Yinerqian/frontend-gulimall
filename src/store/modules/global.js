import storage from "good-storage"


const state = {
  batchList: storage.get('batchList') || [],
}

const mutations = {
  SET_BATCHLIST: (state, batchList) => {
    storage.set('batchList', batchList)
    state.batchList = batchList
  },
}

const actions = {
  setBatchList({ commit }, data) {
    commit('SET_BATCHLIST', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
