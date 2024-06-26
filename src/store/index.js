import Vue from 'vue'
import Vuex from 'vuex'

import app from "./modules/app"
import tagsView from "./modules/tagsView"
import settings from "./modules/settings"
import global from "./modules/global"

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    tagsView,
    settings,
    global
  },
  getters
})

export default store
