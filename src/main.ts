import { createApp } from 'vue';
import App from './App.vue';
import VueLazyLoad from 'vue3-lazyload';
import VPagination from '@hennge/vue3-pagination';

createApp(App)
	.use(VueLazyLoad)
	.component('v-pagination', VPagination)
	.mount('#app');
