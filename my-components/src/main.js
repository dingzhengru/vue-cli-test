import Vue from 'vue'
import App from './App.vue'

// import bootstrap (yarn add --dev jquery popper.js bootstrap)
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// load other js library
// in .vue (import $ from 'jquery')
window.$ = window.jQuery = require('jquery')
window._ = require('lodash')
window._ = require('lodash/core')


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
