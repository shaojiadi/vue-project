<template>
  <div class="box-wrap">
    <div class="flex-box">
      <div class="icon"> 
        <div></div>
      </div>
      <div>日志管理</div>
    </div>
    <div style="margin:15px 0 14px 0">
      <a-input-search  v-model:value="texts" placeholder="请输入ID/操作IP/机构ID/应用IA" style="width: 400px" @search="onSearch" @keyup.enter="onSearch(texts)"/>
    </div>
    <HelloWorld :content="content"/>
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
      texts: '',
      content: ''
    }
  },
  methods: {
    onSearch(value) {
      this.content = value;
    },
  },
}
</script>

<style scoped lang="scss">
  .box-wrap {
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
