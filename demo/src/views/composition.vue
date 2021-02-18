<template>
  <div>
    {{title}}
    <br>
    {{userInfo.username}}
    <br>
    {{userInfo.age}}
    <br>
    <button @click="getUserName">获取username</button>
    <button @click="getTitle">获取title</button>
    <button @click="setUserName">修改username</button>
    <button @click="setTitle">修改title</button>
    <input type="text" v-model="title">
    {{description}}
    <input type="text" v-model="description">
  </div>
</template>

<script>
import {reactive, ref,toRefs} from 'vue'
export default {
  setup(){
    //ref reactive 定义响应式数据
    var title = ref("这是一个标题");      //ref 定义字符传、Number\bool\数组
    var userInfo = reactive({            //reactive定义对象 
      username: '张三',
      age: 20
    })
    var article = reactive({
      description: '我是一个新闻',
      click: 200
    })
    //获取reactive定义的数据
    var getUserName = ()=>{
      alert(userInfo.username)
    }
    //获取ref定义的数据
    var getTitle = ()=>{
      alert(title.value)
    }
    //修改reactive定义的数据
    var setUserName = ()=>{
      userInfo.username = '李斯'
    }
    //修改ref定义的数据
    var setTitle = ()=>{
      title.value = '修改后的ref数据'
    }
    return {
      title,
      userInfo,
      getUserName,
      getTitle,
      setUserName,
      setTitle,
      ...toRefs(article)   //解构响应式对象数据，把一个响应式对象转换成普通对象，该普通对象的每个property都是一个ref,和响应式对象property一一对应。
    }
  }
}
</script>

<style>
button {
  margin: 10px
}
</style>