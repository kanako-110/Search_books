import { createApp } from 'vue';
import App from './App.vue';
import VueLazyLoad from 'vue3-lazyload';

createApp(App)
	.use(VueLazyLoad)
	.mount('#app');
