<template>
  <button class="default">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["firstName","lastName"],
}
</script>

<style lang="scss" scoped>
.default {
  padding: 5px 10px;
  background: orange;
  color: #fff;
  border: none;
}
.primary {
  background: #f00;
  color: #fff;
}
</style>