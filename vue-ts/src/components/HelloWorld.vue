<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="setTitle">改变title</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
let msg:string = 'hellowWord'
export default defineComponent({
  name: 'HelloWorld',
  data() {
    return {
      msg
    }
  },
  methods: {
    setTitle():void{
      this.msg = 'hello word'
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
