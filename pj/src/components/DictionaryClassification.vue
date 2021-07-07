<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item ref="name" label="字典名称" name="name">
      <a-input v-model:value="formState.name" placeholder="请输入字典名称" :maxlength="30"/>
    </a-form-item>
    <a-form-item label="上级" name="region">
      <a-select v-model:value="formState.region" placeholder="请选择">
        <a-select-option value="shanghai">Zone one</a-select-option>
        <a-select-option value="beijing">Zone two</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="字典类型"  name="date1">
      <a-input v-model:value="formState.date1" placeholder="请输入字典类型" :maxlength="30"/>  
    </a-form-item>
    <a-form-item label="字典属性" name="type">
      <a-radio-group v-model:value="formState.type">
        <a-radio value="1">通用</a-radio>
        <a-radio value="2">与应用相关</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="相关应用" name="applications" v-if="formState.type==2">
      <a-select mode="multiple" v-model:value="formState.applications" placeholder="请选择">
        <a-select-option value="shanghai">Zone one</a-select-option>
        <a-select-option value="beijing">Zone two</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit" style="width:100px">确定</a-button>
      <a-button style="margin-left: 10px;width:100px" @click="resetForm" class="btn">取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { defineComponent, ref, watch,toRaw, reactive} from 'vue';
import { message } from 'ant-design-vue'

export default defineComponent({
  setup(props,ctx){
    //form表单
    const formRef = ref();
    const formState = reactive({
      name: '',
      region: undefined,
      date1: undefined,
      type: "1",
      applications: []
    });
    const rules = {
      name: [
        {
          required: true,
          message: '请输入字典名称',
          trigger: 'blur',
        }
      ],
      region: [
        {
          required: true,
          message: '请选择',
          trigger: 'change',
        },
      ],
      date1: [
        {
          required: true,
          message: '请输入字典类型',
          trigger: 'blur',
        },
      ],
      type: [
        {
          required: true,
          message: '请选择字典属性',
          trigger: 'change',
        },
      ],
      applications: [
        {
          type: 'array',
          required: true,
          message: '请选择',
          trigger: 'blur',
        },
      ]
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

    const resetForm = () => {
      formRef.value.resetFields();
    };

    return {
      //form表单
      formRef,
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      other: '',
      formState,
      rules,
      onSubmit,
      resetForm,
    }
  }
})
</script>

<style>

</style>