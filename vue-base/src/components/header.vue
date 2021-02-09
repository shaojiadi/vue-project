<template>
  <div @click="sendLogin">这是头部</div>
</template>
<script>
import event from '../model/event.js'
export default {
  data(){
    return {
      msg: '头部组件'
    }
  },
  methods:{
    sendLogin(){
      event.emit('toLogin',this.msg)
    }
  }
}
</script>