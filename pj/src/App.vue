<template>
  <div id="nav" data-name="pf-log">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import './assets/font/iconfont.js';

export default {
  data(){
    return {
      locale: zhCN
    }
  }
}
</script>


<style lang="scss">
@import "assets/css/main.scss";
@import "assets/css/reset.scss";

html {
  overflow: hidden;
}

html,
body {
  width: 100%;
  height: 100%;
  font-size: 14px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
