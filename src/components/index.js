import Vue from 'vue';

import './UI';

import AppHeader from './AppHeader.vue';
import AppContent from './AppContent.vue';
import DataTable from './DataTable.vue';

Vue.component('app-header', AppHeader);
Vue.component('app-content', AppContent);
Vue.component('data-table', DataTable);
