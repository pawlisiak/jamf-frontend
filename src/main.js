// Babel Polyfill for older browsers compatibility
import 'babel-polyfill'

// Import global CSS
import './assets/styles/styles.scss'

// Import Vue library
import Vue from 'vue'

// Import Store
import store from './store'

// Import main component
import App from './App.vue'

// Import common components
import './components/layout'
import './components/ui'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
