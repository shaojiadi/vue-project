<template>
  <div>
    {{title}}
    <div>
      <button @click="setCount">改变count</button>
    </div>
    count={{count}}
    <div>
      {{reverseTitle}}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

//接口
interface News {
  title:string,
  description: string,
  count: number,
  content?: string   //?可选参数
}

//第一种
/* let newsData:News={
  title: "我是一个新闻",
  description: '新闻描述',
  count: 12
} */

//第二种
let newsData={
  title: "我是一个新闻",
  description: '新闻描述',
  count: 12
} as News

export default defineComponent({
  data(){
    return  newsData
  },
  methods: {
    setCount():void{
      this.count = 123
    }
  },
  computed: {
    reverseTitle():string {
      return this.title.split("").reverse().join("")
    }
  }
})
</script>

<style>

</style>