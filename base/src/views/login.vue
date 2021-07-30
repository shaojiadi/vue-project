<template>
<div>
  <h2>获取用户信息</h2>
  <div>
    <input type="text" v-model="firstName" placeholder="firstName" style="margin-bottom:20px">
  </div>
  <div>
    <input type="text" v-model="lastName" placeholder="lastName" style="margin-bottom:20px">
  </div>
  <div>
    {{fullName}}
  </div>
  <div>
    <input type="text" v-model="score" placeholder="判断是否及格" style="margin-bottom:20px">
  </div>
  <div>
    {{pass}}
  </div>
  <Search :title="title"/>
</div>
</template>

<script>
import {reactive,toRefs,computed} from "vue"
import Search from "@/components/Search.vue"

export default {
  setup(){
    //原始对象 非响应式数据
    /* let obj = {
      username: '',
      age: ''
    } */


    let userInfo = reactive({
      firstName: '',
      lastName: '',
      score: 78
    })
  //  userInfo = readonly(userInfo)  //传入一个对象（响应式或普通）或ref,返回一个原始对象的只读代理，变成非响应式数据

    let fullName = computed(()=>{
      return userInfo.firstName+' '+userInfo.lastName
    })
    let pass = computed(()=>{
      if(userInfo.score>=60){
        return '及格'
      }else {
        return '不及格'
      }
    })
    return {
      ...toRefs(userInfo),
      fullName,
      pass
    }
  },
  data(){
    return {
      title: '一首诗'
    }
  },
  components: {
    Search
  }
}
</script>

<style lang="scss">
  h2 {
    text-align: center;
  }
</style>