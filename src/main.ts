import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import FullPage from "vue-fullpage.js/src/FullPage.vue";
import HeaderVue from './components/header.vue';
import FooterVue from './components/footer.vue';

Vue.component('full-page', FullPage);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component('header-vue', HeaderVue);
Vue.component('footer-vue', FooterVue);


import '../public/font/montserrat.css';
import '../public/sass/account.helper.scss';
import '../public/sass/fullpage-override.scss';
import '../public/sass/checkbox.scss';
import '../public/sass/base.scss';


Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
