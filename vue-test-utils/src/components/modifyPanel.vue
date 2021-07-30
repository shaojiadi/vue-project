<template>
  <!-- <form action="" method="get"> -->
  <div>
    <p>
      用户名：
      <input type="text" v-model="info.username">
    </p>
    <p>
      邮箱：
      <input type="text" v-model="info.email">
    </p>
    <p>
      性别：
      <input :value="0" type="radio"  name="radiobutton1"  v-model="info.sex">男
      <input :value="1" type="radio"  name="radiobutton1" v-model="info.sex">女
    </p>
    <p>
      爱好：
      <input type="checkbox"  :value="1"  v-model="info.hobby"/><span>篮球</span>
      <input type="checkbox"  :value="2"  v-model="info.hobby"/><span>读书</span>
      <input type="checkbox"  :value="3"  v-model="info.hobby"/><span>插画</span>
    </p>
    <div>
      <button id="btn" @click="$emit('cancel',6)">取消</button>
      <button id="btn2" @click="save">保存</button>
    </div>
  <!-- </form> -->
</div>
</template>

<script>
  export default {
    data() {
      return {
        info: {
          username: '',
          email: '',
          sex: "",
          hobby: [],
        }
      }
    },
    methods: {
      save(){
        console.log(this.info,999);
        this.$emit('save',this.info);
      }
    }
  }
</script>

<style scope>

</style>