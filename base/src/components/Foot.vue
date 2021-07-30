<template>
  <div>
    <div>{{title}}</div>
    <div>{{home.name}}</div>
    <input type="text" v-model="username">
    <br>
    <br>
    <input type="text" v-model="password">
    <br>
    <br>
    <button @click="doLogin">提交</button>
  </div>
</template>

<script>
import event from '../model/event'
export default {
  name: 'foot',
  data(){
    return {
      username: '',
      password: ""
    }
  },
  props: {
    home: Object,
    title: String
  },
  emits: {
    submit:({
      username,
      password
    })=>{
      if(username!=''&&password!=''){
        return true
      }else {
        console.error('用户名密码不能为空');
        return false;
      }
    }
  },
  mounted(){
    event.on('toLogin',(data)=>{
      //监听广播
      console.log(data);
    })
  },
  methods:{
    doLogin(){
      this.$emit('submit',{
        username: this.username,
        password: this.password
      })
    }
  }

}
</script>

<style lang="scss" scoped>

</style>