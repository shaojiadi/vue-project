<template>
  <teleport to="body">
    <div class="model-bg" v-if="visible">
      <div class="modal-content">
        <button class="close" @click="$emit('closeDialog')">X</button>
        <div class="model-title">{{title}}</div>
        <div class="model-body">
          <slot>
            模态对话框
          </slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  props: ["title","visible"]
}
</script>

<style lang="scss" scoped>
.model-bg {
  background: #000;
  opacity: .7;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
}

.modal-content {
  width: 600px;
  min-height: 300px;
  border: 1px solid #eee;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: #fff;
  .model-title {
    background: #eee;
    color: #000;
    height: 32px;
    line-height: 32px;
    text-align: center;
  }
  .model-body {
    padding: 40px;
  }
  .close {
    position: absolute;
    right: 10px;
    top: 5px;
    padding: 5px;
    border: none;
    cursor: pointer;
  }
}
</style>