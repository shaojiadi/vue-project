
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

//import "@babel/polyfill";     //将es6转换为浏览器支持的es5,支持低版本浏览器
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Input, Table, message, Pagination,ConfigProvider,Tree,Modal,Form,Button,Select,Radio,Dropdown,Menu,TreeSelect   } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './config/mUtils'
import component from './components/'

let instance = null;

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
  Menu,
  TreeSelect,
]

// const app = createApp(App);
// app.config.productionTip = false;  //阻止启动生产消息

// components.forEach(component => {
//   app.use(component)
// })

// app.config.globalProperties.$message = message;   //添加ant全局消息


// app.use(store).use(router).mount('#app')

function render(props = {}) {
  const { container } = props;

  instance = createApp(App);
  instance.config.productionTip = false;  
  components.forEach(component => {
    instance.use(component)
  })
  Object.keys(component).forEach((key) => {
    console.log(key,component,999);
    instance.component(key,component[key])
  });
  instance.use(store).use(router);
  instance.mount(container ? container.querySelector("#app") : "#app");
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("%c ", "color: green;", "vue3.0 app bootstraped");
}

export async function mount(props) {
  render(props);
  instance.config.globalProperties.$onGlobalStateChange =
    props.onGlobalStateChange;
  instance.config.globalProperties.$setGlobalState = props.setGlobalState;
}

export async function unmount() {
  instance.unmount();
  instance._container.innerHTML = "";
  instance = null;
}








