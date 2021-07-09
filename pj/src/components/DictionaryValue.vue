<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item ref="name" label="字典类型">
      <a-input v-model:value="formState.name" placeholder="请输入字典名称" :maxlength="30" disabled/>
    </a-form-item>
    <a-form-item label="数据值名称" name="region">
      <a-input v-model:value="formState.region" placeholder="请输入数据值名称" :maxlength="30"/>
    </a-form-item>
    <a-form-item label="数据键值"  name="date1">
      <a-input  v-model:value="formState.date1" placeholder="请输入数据键值"/>  
    </a-form-item>
    <a-form-item label="排序"  name="sort">
      <a-input  v-model:value="formState.sort" placeholder="请输入排序"/>  
    </a-form-item>
    <a-form-item label="状态" name="type">
      <a-radio-group v-model:value="formState.type">
        <a-radio value="1"> 启用</a-radio>
        <a-radio value="2">停用</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit" style="width:100px">确定</a-button>
      <a-button style="margin-left: 10px;width:100px" @click="$emit('closeDialog')" class="btn">取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { defineComponent, ref, watch,toRaw, reactive} from 'vue';
import { message } from 'ant-design-vue'
import * as global from '../config/mUtils'

export default defineComponent({
  setup(props,ctx){
    //form表单
    const formRef = ref();
    const formState = reactive({
      name: '',
      region: undefined,
      date1: undefined,
      type: "1",
      sort: undefined
    });
    const rules = {
      region: [
        {
          required: true,
          message: '请输入数据值名称',
          trigger: 'blur',
        },
      ],
      date1: [
        {
          required: true,
          message: '请输入数据键值',
          trigger: 'blur',
        },
        {
          pattern: global.number2,
          message: '数据键值为0到100的正整数',
          trigger: 'blur',
        }
      ],
      sort: [
        {
          required: true,
          message: '请输入排序',
          trigger: 'blur',
        },
        {
          pattern: global.number,
          message: '排序为自然数',
          trigger: 'blur',
        }
      ],
      type: [
        {
          required: true,
          message: '请选择字典属性',
          trigger: 'change',
        },
      ],
    };

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          // console.log('values', formState, toRaw(formState));
          message.success('添加字典成功！');
          ctx.emit('closeDialog')
        })
        .catch(error => {
          console.log('error', error);
        });
    };

    return {
      //form表单
      formRef,
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 14,
      },
      other: '',
      formState,
      rules,
      onSubmit,
    }
  }
})
</script>

<style>

</style>