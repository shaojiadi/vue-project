<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <Comp :titleInfo="{value:'待办事项',color:'green'}"></Comp>
</template>

<script lang="ts">
  export default defineComponent({
  name: 'App',
})
</script>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Comp from './components/Comp.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
