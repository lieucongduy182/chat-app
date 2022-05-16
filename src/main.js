import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@/assets/index.css';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'

const app = createApp(App);

app.use(Antd);

app.use(router).mount('#app');