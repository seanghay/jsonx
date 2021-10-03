import Vue from 'vue';
import App from './App.vue';
import 'normalize.css';
import 'codemirror/lib/codemirror.css'
import VueCodemirror from 'vue-codemirror'
import './assets/main.scss';
import 'virtual:windi.css'

new Vue({ 
  el: '#app',
  render: (h) => h(App)
});


Vue.use(VueCodemirror, { })

