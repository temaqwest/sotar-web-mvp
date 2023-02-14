import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/styles/main.css'
import { useGlobalStore } from '@/stores/global'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const globalStore = useGlobalStore()
globalStore.setGlobalUrl('sotar.online')

app.mount('#app')
