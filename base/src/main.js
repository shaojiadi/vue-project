import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios';
import fetchJsonp from 'fetch-jsonp';


// createApp(App).use(store).use(router).mount('#app')

const app = createApp(App);
app.config.globalProperties.Axios = Axios
app.config.globalProperties.fetchJsonp = fetchJsonp
app.use(store).use(router).mount('#app');