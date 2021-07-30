
<template>
  <div>
    <input type="text" placeholder="请输入内容" :value="keyword" @input="$emit('update:keyword',$event.target.value)">
  </div>
</template>

<script>
export default {
  props: ["keyword"],
}
</script>

<style lang="scss" scoped>
input {
  width: 400px;
  height: 32px;
  line-height: 32px;;
}
</style>