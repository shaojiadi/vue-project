<template>
  <div>
    <input type="text" placeholder="firstName" :value="firstName" @input="$emit('update:firstName',$event.target.value)">
    <br>
     <br>
    <input type="text" placeholder="lastName" :value="lastName" @input="$emit('update:lastName',$event.target.value)">
  </div>
</template>

<script>
export default {
  props: ["firstName","lastName"],
}
</script>

<style lang="scss" scoped>
input {
  width: 100px;
  height: 32px;
  line-height: 32px;;
}
</style>