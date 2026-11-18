import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'
import 'buefy/dist/css/buefy.css'
import './assets/style.scss'
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
