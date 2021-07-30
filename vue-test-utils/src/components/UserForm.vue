<template>
  <div>
    <div class="title">
      <div v-for="(item,index) in label" :key="index" class="item-title">
        {{item}}
      </div>
    </div>
    <div>
      <div v-for="(item,index) in contain" :key="index" class="contain">
        <p>{{item.id}}</p>
        <p>{{item.username}}</p>
        <p>{{item.email}}</p>
        <p>{{item.sex==0?'男':'女'}}</p>
        <p>
          <template v-for="(items,index) in item.hobby">
            <span :key="index" v-if="items==1">篮球 </span>
            <span :key="index" v-if="items==2">读书 </span>
            <span :key="index" v-if="items==3">插画 </span>
          </template>
        </p>
        <p>
          <button @click="remove(index)">delete</button>
          <button @click="edit(index)">修改</button>
        </p>
      </div>
    </div>
    <ModifyPanel v-if="isShow"  @save="save"   @cancel="isShow=false"/>
  </div>
</template>

<script>
import ModifyPanel from './modifyPanel.vue'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      label: [
        'id','用户名','邮箱','性别','爱好','操作'
      ],
      contain: [
        {
          id: 1,
          username: '小红',
          email: 'xiaohong@qq.com',
          sex: 0,
          hobby: [1],
        },
        {
          id: 2,
          username: '小敏',
          email: 'xiaohong@qq.com',
          sex: 0,
          hobby: [1],
        },
        {
          id: 3,
          username: '小兰',
          email: 'xiaohong@qq.com',
          sex: 1,
          hobby: [1],
        },
        {
          id: 4,
          username: '小强',
          email: 'xiaohong@qq.com',
          sex: 1,
          hobby: [1],
        }
      ],
      editIndex: 0,
      isShow: false
    }
  },
  components: {
    ModifyPanel
  },
  methods: {
    remove(index){
      this.contain.splice(index,1)
    },
    edit(index){
      this.editIndex = index;
      this.isShow = true;
    },
    save(val){
      console.log(this.contain[this.editIndex]);
      if(val.username){
        this.contain[this.editIndex].username = val.username;
      }
      if(val.email){
        this.contain[this.editIndex].email = val.email;
      }
      if(val.sex){
        this.contain[this.editIndex].sex = val.sex;
      }
      if(val.hobby){
        this.contain[this.editIndex].hobby = val.hobby;
      }
      this.isShow = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title ,.contain{
    display: flex;
  }

  .item-title ,.contain>p {
    width: 150px; 
    text-align: center;
  }
</style>
