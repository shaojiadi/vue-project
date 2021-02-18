<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" :home="this"/>
    <button @click="success">执行Mixin方法</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import baseMixin from '@/mixin/baseMixin'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mixins: [baseMixin],
  data(){
    return {
      title: '6666'
    }
  }
}
</script>
