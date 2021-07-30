<template>
  <h1 :style="{backgroundColor:titleInfo.color}">{{titleInfo.value}}</h1>
  <div>
    {{counter}}
  </div>
  <div>
    {{doublieCounter}}
  </div>

  <!-- 新增代办 -->
  <input type="text" v-model="todoName" @keydown.enter="addTodo(newTodo(todoName))">

  <div v-for="item in items" :key="item.id">
    {{item.name}}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'    
import { Todo, TitleInfo } from '../types'    

export default defineComponent({
  props: {
    titleInfo: {
      type: Object as PropType<TitleInfo>,  //PropType：泛型   PropType<TitleInfo>：泛型类型中的TitleInfo类型
      required: true
    }
  },
  data(){
    return {
      counter: 2,
      items: [] as Todo[], //类型断言
      todoName: ''
    }
  },
  created(){
    this.items.push({
      id: 7,
      name: 'vue3',
      completed: false
    })
  },
  computed: {
    doublieCounter():number {
      return this.counter*2
    }
  },
  methods: {
    newTodo(todoName:string):Todo {     //参数类型是string,返回类型是Todo
      return {
        id: this.items.length+1,
        name: todoName,
        completed: false
      }
    },
    addTodo(todo:Todo): void {     //void任意类型
      this.items.push(todo);
      this.todoName = "";
    }
  }

})
</script>

<style scoped>

</style>