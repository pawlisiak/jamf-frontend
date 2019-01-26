// Import Vue & Vuex
import Vue from 'vue'
import Vuex from 'vuex'

// Import modules
import App from './modules/App'
import NewUser from './modules/NewUser'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    App,
    NewUser
  }
})

export default store
