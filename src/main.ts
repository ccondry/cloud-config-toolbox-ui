import 'buefy/dist/buefy.css'
import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Buefy from 'buefy'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(Buefy)
app.mount('#app')
