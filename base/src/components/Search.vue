<template>
  <div>
    {{num}}
    <div>
      <input type="text" v-model="nums">
      {{nums}}
    </div>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  ref,
  //watchEffect
  watch,
  onMounted
} from "vue"
export default {
  props: ['title'],
  //生命周期函数先执行setup，setup中也有自己的生命周期钩子，除了beforeCreate和created
  setup(title){
    console.log(title);
    let data = reactive({
      num: 1
    })
    let nums = ref('')
   /*  watchEffect(()=>{ //无论数据有无改变都会触发
      console.log(`num=${data.num}`);
    })  */

    watch(data,()=>{ //懒执行，仅在监听源变更时才执行回调。可以指定数据监听。
      console.log(`num=${data.num}`);
    })
    watch(nums,(newData,oldData)=>{  //新值 旧值
      console.log(newData,oldData);
    })
    onMounted(()=>{
      console.log('onMounted');
    })
    setTimeout(()=>{
      data.num++;
    },1000)
    return {
      ...toRefs(data),
      nums
    }
  }
}
</script>

<style>

</style>