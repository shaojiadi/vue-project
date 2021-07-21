<template>
  <div>
    <div class="flex-box3">
      <svg class="icon svg-icon" aria-hidden="true" style="width:20px;height:20px">
        <use :xlink:href="icon"></use>
      </svg>
      <span class="dialog-title">{{title}}</span>
    </div>
    <p class="dialog-content">{{content}}</p>
    <div style="margin-left:32px" v-if="title!='停用失败！'">
      <a-button type="primary" @click="onSubmit()" class="btn">确定</a-button>
      <a-button style="margin-left: 10px;background: #f5f5f5;" @click="$emit('closeDialog')" class="btn">取消</a-button>
    </div>
    <div v-else style="text-align:center">
      <a-button type="primary" class="btn sure-btn" @click="$emit('closeDialog')">我知道了</a-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted} from 'vue';
  export default defineComponent({
    props: ['title','content','icon'],
    setup(props,ctx){
      const onSubmit = ()=>{
        let {title} = props;
        if(title=="您确定要停用该字典分类吗？"){
          ctx.emit('errorInfo')
        }
      }

      return {
        onSubmit
      }
    }


  })
</script>

<style lang="scss" scoped>
  .dialog-title {
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    margin-left: 10px;
  }

  .dialog-content {
    font-size: 12px;
    font-weight: 400;
    color: #666666;
    margin: 10px 0 18px 32px;
  }

  .btn {
    width: 90px;
    height: 26px;
  }

  .sure-btn {
    width: 100px;
  }

</style>