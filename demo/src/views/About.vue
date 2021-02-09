<template>
  <div class="about">
    <v-header />
    <h1>This is an about page</h1>
    <Foot :title="title" :home="this" @submit="getInfo"/>
    <br>
    <v-input v-model:keyword="keyword"></v-input>
    {{keyword}}
    <h2>username组件</h2>
    <v-username v-model:firstName="firstName" v-model:lastName="lastName"></v-username>
    <br>
    {{firstName}}-- {{lastName}}
    <br>
    <v-button>提交</v-button>
    <br>
    <br>
    <v-button class="primary">提交</v-button>
    <h2>自定义Attribute继承</h2>
    <date-picker data-time="2020-01-25" data-aid="1"></date-picker>
  </div>
</template>

<script>
import Foot from '@/components/Foot.vue'
import head from '@/components/header.vue'
import input from '@/components/input.vue'
import userName from '@/components/user-name.vue'
import button from '@/components/button.vue'
import DatePicker from '@/components/DatePicker.vue'

export default {
  name: 'About',
  components: {
    Foot,
    'v-header':head,
    'v-input':input,
    'v-username': userName,
    'v-button': button,
    'date-picker': DatePicker
  },
  data(){
    return {
      title: '这是一个底部',
      name: 'jd',
      keyword: '6666',
      firstName: '',
      lastName: ''
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