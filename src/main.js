import { createApp } from 'vue';
import App from './App.vue';

import './assets/global.less';

const app = createApp(App);

import router from './router/index.js';
app.use(router);

// Mounted to #app
app.mount('#app');
