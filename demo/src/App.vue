<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <div>
      <button @click="setTitle">改变父组件的title</button>
    </div>
    <h3>{{title}}</h3>
  </div>
  <router-view/>   <!--动态挂载组件-->
</template>

<script>
import {ref,provide} from "vue"
export default {
  /* data(){
    return {
      title:'app组件里面的标题'
    }
  }, */
   /*  provide: {
    title: 'app根组件里面的标题'
  } */
  /* provide(){
    return {
       titles: this.title       //不会改变子组件,无响应式，解决：composition api
    }
  },
  methods: {
    setTitle(){
      this.title = '改变根组件的标题'
    }
  } */
  setup(){
    let title = ref('app根组件里面的标题');
    let setTitle = ()=>{
      title.value = '改变根组件的标题'
    }
    provide('title',title)
    return {
      title,
      setTitle
    }
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
