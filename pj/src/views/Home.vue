<template>
  <div class="home">
    <div class="flex-box">
      <div class="icon"> 
        <div></div>
      </div>
      <div>日志管理</div>
    </div>
    <div style="margin:15px 0 14px 0">
      <a-input-search  v-model:value="texts" placeholder="请输入ID/操作IP/机构ID/应用IA" style="width: 400px" @search="onSearch"/>
    </div>
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  data(){
    return {
      texts: ''
    }
  },
  methods: {
    onSearch(value) {
      // this.texts = value;
    },
  }
}
</script>

<style scoped lang="scss">
  .home {
    width: 100%;
    height: 100%;
    padding: 14px;
    .icon {
      width: 16px;
      height: 16px;
      background: #198EEB;
      position: relative;
      margin-right: 10px;
      div {
        width: 6px;
        height: 6px;
        background: #fff;
        position: absolute;
        bottom: 2px;
        left: 2px;
      }
    }
  }
</style>
