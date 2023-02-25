import './assets/styles/main.css'
import { useGlobalStore } from '@/stores/global'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router).mount('#app')

const globalStore = useGlobalStore(pinia)
globalStore.setGlobalUrl('sotar.online')
