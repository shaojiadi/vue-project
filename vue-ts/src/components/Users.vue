
<template>
  <div>
    <h3>user组件</h3>
    <h4>username={{username}}</h4>
    <button @click="setUsername('小明')">改变username</button>
    <h3>
      {{getUsername()}}
    </h3>
    {{count}}
    <h3>
      {{reverseUsername}}
    </h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed } from 'vue'
interface User{
  username: string,
  age: number,
  setUsername(usernmae:string): void,
  getUsername(): string
}
export default defineComponent({
  setup(){
    //实现接口的第一种写法
    /* let userInfo:User = reactive({
      username: '张三',
      age: 20,
      setUsername(username:string){
        this.username = username
      },
      getUsername(){
        return this.username
      }
    }) */

    //实现接口的第二种写法
    let userInfo = reactive<User>({
      username: '张三',
      age: 20,
      setUsername(username:string){
        this.username = username
      },
      getUsername():string{
        return this.username
      }
    })

    let count = ref<number>(20)    //<>泛型,ref只能通过这种方法指定类型
    let reverseUsername = computed(():string=>{
      return userInfo.username.split("").reverse().join("")
    })

    return {
      ...toRefs(userInfo),
      count,
      reverseUsername
    }

  },
  data(){
  },
  methods: {
   
  }
})
</script>

<style>

</style>