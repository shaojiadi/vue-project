<template>
  <div class="about">
    <v-header />
    <h1>This is an about page</h1>
    <Foot :title="title" :home="this" @submit="getInfo"/>
  </div>
</template>

<script>
import Foot from '@/components/Foot.vue'
import head from '@/components/header.vue'

export default {
  name: 'About',
  components: {
    Foot,
    'v-header':head
  },
  data(){
    return {
      title: '这是一个底部',
      name: 'jd'
    }
  },
  methods: {
    getInfo(data){
      console.log(data);
    }
  }
}
</script>


<style lang="scss">

</style>