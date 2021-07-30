<template>
  <div class="about">
    <v-header />
    <h1>This is an about page</h1>
    <Foot :title="title" :home="this" @submit="getInfo"/>
    <br>
    <v-input v-model:keyword="keyword"></v-input>
    {{keyword}}
    <h2>username组件</h2>
    <v-username v-model:firstName="firstName" v-model:lastName="lastName"></v-username>
    <br>
    {{firstName}}-- {{lastName}}
    <br>
    <v-button @click="getData()">提交</v-button>
    <hr>
    <br>
    <input type="text" v-model="username" @keyup="getData()">
    <ul>
      <li v-for="(item,index) in list" :key="index">{{item}}</li>
    </ul>
    <br>
    <br>
    <v-button class="primary">提交</v-button>
    <h2>自定义Attribute继承</h2>
    <date-picker data-time="2020-01-25" data-aid="1"></date-picker>
  </div>
</template>

<script>
// import axios from 'axios';

import Foot from '@/components/Foot.vue'
import head from '@/components/header.vue'
import input from '@/components/input.vue'
import userName from '@/components/user-name.vue'
import button from '@/components/button.vue'
import DatePicker from '@/components/DatePicker.vue'

export default {
  name: 'About',
  components: {
    Foot,
    'v-header':head,
    'v-input':input,
    'v-username': userName,
    'v-button': button,
    'date-picker': DatePicker
  },
  data(){
    return {
      title: '这是一个底部',
      name: 'jd',
      keyword: '6666',
      firstName: '',
      lastName: '',
      list: [],
      username: '',
      timer: ''
    }
  },
  methods: {
    getInfo(data){
      console.log(data);
    },
    getData(){
      /* var api = "http://test-trgj.test176.cn/channel/channel/getChannelIdByUrl?url=http://test-trgj.test176.cn/";
      this.Axios.get(api).then((res)=>{
        console.log(res);
      }).catch((err)=>{
        console.log(err);
      }) */
      
      //https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=golang&cb=xxxx     百度的回调函数用cb代替
      if(this.username!=''){
        clearTimeout(this.timer);  //清除定时器     函数防抖实现
        this.timer = setTimeout(()=>{
          this.fetchJsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+this.username,{
            jsonpCallback: 'cb'
          }).then((res)=>{
            return res.json()
          }).then((json)=>{
            this.list = json.s;
          }).catch((error)=>{
            console.log(error);
          })
        },2000)
      }else {
        this.list = [];
      }
    }
  }
}
</script>


<style lang="scss">

</style>