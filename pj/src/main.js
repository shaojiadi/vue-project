//import "@babel/polyfill";     //将es6转换为浏览器支持的es5,支持低版本浏览器
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Input, Table, message, Pagination,ConfigProvider,Tree,Modal,Form,Button,Select,Radio,Dropdown,Menu  } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const components = [
  Input,
  Table,
  Pagination,
  ConfigProvider,
  Tree,
  Modal,
  Form,
  Button,
  Select,
  Radio,
  Dropdown,
  Menu
]


const app = createApp(App);
app.config.productionTip = false;  //阻止启动生产消息

components.forEach(component => {
  app.use(component)
})

app.config.globalProperties.$message = message;   //添加ant全局消息


app.use(store).use(router).mount('#app')
