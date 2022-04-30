import { createApp } from 'vue'
import App from './App.vue'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import VueLazyLoad from 'vue3-lazyload'
import './index.css'

const app = createApp(App);
app.use(VueViewer)
app.use(VueLazyLoad)
app.mount('#app');
