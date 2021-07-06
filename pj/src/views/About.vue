<template>
  <div class="box-wrap flex-box">
    <div class="left-box">
      <div>
        <a-input v-model:value="searchValue" class="search-input" placeholder="请输入字典名称查询">
          <template #suffix>
            <svg class="icon svg-icon" aria-hidden="true" style="color:#ccc">
              <use xlink:href="#iconsearch"></use>
            </svg>
          </template>
        </a-input>
        <svg class="icon svg-icon" aria-hidden="true" @click="showModal">
          <use xlink:href="#iconadd"></use>
        </svg>
      </div>
      <a-tree
        :expandedKeys="expandedKeys"
        :auto-expand-parent="autoExpandParent"
        :tree-data="gData"
        @expand="onExpand"
      >
      
        <template #title="{ title }">
          <svg class="icon svg-icon" aria-hidden="true" style="margin-right:8px">
            <use xlink:href="#iconfolder"></use>
          </svg>
          <span v-if="title.indexOf(searchValue) > -1">
            {{ title.substr(0, title.indexOf(searchValue)) }}
            <span style="color: #f50">{{ searchValue }}</span>
            {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
          </span>
          <span v-else>{{ title }}</span>
        </template>
      </a-tree>
    </div>
    <div class="right-box">
      <div class="page-head">
        <svg class="icon svg-icon" aria-hidden="true" style="margin-right:10px">
            <use xlink:href="#icontitle"></use>
        </svg>
        <span>字典类型-用户类型</span>
      </div>
      <div class="menu-manage-detail">
        <div>
          <div class="block-header flex-box2">
            <div class="block-header-left flex-box3">
              <span class="block-header-blue"></span>
              基础信息
            </div>
            <div class="block-header-right">
              <svg class="icon svg-icon" aria-hidden="true" style="margin-right:10px">
                <use xlink:href="#iconedit1"></use>
              </svg>
              <span style="color: #3b8fd9">编辑</span>
            </div>
          </div>
          <ul class="flex-box" style="flex-wrap:wrap">
            <li class="flex-box menu-manage-detail-li">
              <p class="menu-manage-detail-name">代码字典序号:</p>
              <p class="ellipsis menu-manage-detail-value">0101</p>
            </li>
            <li class="flex-box menu-manage-detail-li">
              <p class="menu-manage-detail-name">父类代码序号:</p>
              <p class="ellipsis menu-manage-detail-value">0101</p>
            </li>
            <li class="flex-box menu-manage-detail-li">
              <p class="menu-manage-detail-name">代码字典编码:</p>
              <p class="ellipsis menu-manage-detail-value">0101</p>
            </li>
            <li class="flex-box menu-manage-detail-li">
              <p class="menu-manage-detail-name">字典名称:</p>
              <p class="ellipsis menu-manage-detail-value">0101</p>
            </li>
            <li class="flex-box menu-manage-detail-li">
              <p class="menu-manage-detail-name">字典类型:</p>
              <p class="ellipsis menu-manage-detail-value">0101</p>
            </li>
            <li class="flex-box menu-manage-detail-li">
              <p class="menu-manage-detail-name">是否停用:</p>
              <p class="ellipsis menu-manage-detail-value">否</p>
            </li>
            <li class="flex-box" style="width:100%">
              <p class="menu-manage-detail-name">字典属性:</p>
              <p class="ellipsis menu-manage-detail-value">与应用相关（物资管理系统、资产管理系统、医疗信息平台、发噶就开始大空间）</p>
            </li>
            <li class="flex-box menu-manage-detail-li">
              <p class="menu-manage-detail-name">创建时间:</p>
              <p class="ellipsis menu-manage-detail-value">0101</p>
            </li>
            <li class="flex-box menu-manage-detail-li">
              <p class="menu-manage-detail-name">创建人ID:</p>
              <p class="ellipsis menu-manage-detail-value">否</p>
            </li>
            <li class="flex-box menu-manage-detail-li">
              <p class="menu-manage-detail-name">最后更新时间:</p>
              <p class="ellipsis menu-manage-detail-value">0101</p>
            </li>
            <li class="flex-box menu-manage-detail-li">
              <p class="menu-manage-detail-name">最后更新人ID:</p>
              <p class="ellipsis menu-manage-detail-value">否</p>
            </li>
          </ul>
        </div>
        <!-- 关联信息 -->
        <div>
          <div class="block-header flex-box2">
            <div class="block-header-left flex-box3">
              <span class="block-header-blue"></span>
              关联信息
            </div>
            <div class="block-header-right">
              <button class="menu-button">添加</button>
            </div>
          </div>
          <AssociatedInformation :content="content"/>
        </div>
      </div>
    </div>
    <a-modal
      title="添加字典分类"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      class="dictionaries-modal"
      :footer="null"
    >
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item ref="name" label="Activity name" name="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="Activity zone" name="region">
          <a-select v-model:value="formState.region" placeholder="please select your zone">
            <a-select-option value="shanghai">Zone one</a-select-option>
            <a-select-option value="beijing">Zone two</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Activity time" required name="date1">
          <a-date-picker
            v-model:value="formState.date1"
            show-time
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="Instant delivery" name="delivery">
          <a-switch v-model:checked="formState.delivery" />
        </a-form-item>
        <a-form-item label="Activity type" name="type">
          <a-checkbox-group v-model:value="formState.type">
            <a-checkbox value="1" name="type">Online</a-checkbox>
            <a-checkbox value="2" name="type">Promotion</a-checkbox>
            <a-checkbox value="3" name="type">Offline</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="Resources" name="resource">
          <a-radio-group v-model:value="formState.resource">
            <a-radio value="1">Sponsor</a-radio>
            <a-radio value="2">Venue</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="Activity form" name="desc">
          <a-textarea v-model:value="formState.desc" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">确定</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">取消</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, ref, watch,toRaw, reactive} from 'vue';
import AssociatedInformation from '@/components/AssociatedInformation.vue'
const x = 3;
const y = 2;
const z = 1;
const genData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || genData;
  const children = [];

  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({
      title: key,
      key,
    });

    if (i < y) {
      children.push(key);
    }
  }

  if (_level < 0) {
    return tns;
  }

  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};

generateData(z);
const dataList = [];

const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({
      key,
      title: key,
    });

    if (node.children) {
      generateList(node.children);
    }
  }
};

generateList(genData);

const getParentKey = (key, tree) => {
  let parentKey;

  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];

    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }

  return parentKey;
};

export default defineComponent({
  setup() {
    //树形图
    const expandedKeys = ref([]);
    const searchValue = ref('');
    const autoExpandParent = ref(true);
    const gData = ref(genData);

    const onExpand = keys => {
      expandedKeys.value = keys;
      autoExpandParent.value = false;
    };

    watch(searchValue, value => {
      const expanded = dataList
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, gData.value);
          }

          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      expandedKeys.value = expanded;
      searchValue.value = value;
      autoExpandParent.value = true;
    });

    // 模态框
    const visible = ref(false);
    const confirmLoading = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = () => {
      confirmLoading.value = true;
      setTimeout(() => {
        visible.value = false;
        confirmLoading.value = false;
      }, 2000);
    };

    //form表单
    const formRef = ref();
    const formState = reactive({
      name: '',
      region: undefined,
      date1: undefined,
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    });
    const rules = {
      name: [
        {
          required: true,
          message: 'Please input Activity name',
          trigger: 'blur',
        },
        {
          min: 3,
          max: 5,
          message: 'Length should be 3 to 5',
          trigger: 'blur',
        },
      ],
      region: [
        {
          required: true,
          message: 'Please select Activity zone',
          trigger: 'change',
        },
      ],
      date1: [
        {
          required: true,
          message: 'Please pick a date',
          trigger: 'change',
          type: 'object',
        },
      ],
      type: [
        {
          type: 'array',
          required: true,
          message: 'Please select at least one activity type',
          trigger: 'change',
        },
      ],
      resource: [
        {
          required: true,
          message: 'Please select activity resource',
          trigger: 'change',
        },
      ],
      desc: [
        {
          required: true,
          message: 'Please input activity form',
          trigger: 'blur',
        },
      ],
    };

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log('values', formState, toRaw(formState));
        })
        .catch(error => {
          console.log('error', error);
        });
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    return {
      expandedKeys,
      searchValue,
      autoExpandParent,
      gData,
      onExpand,

      // 模态框
      visible,
      confirmLoading,
      showModal,
      handleOk,

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
    };
  },
  components: {
    AssociatedInformation,
  },
});
</script>


<style lang="scss" scoped>
  .left-box {
    width: 280px;
    height: 100%;
    border-right: 1px solid #cccccc;
    padding: 14px;
  }

  .search-input {
    margin: 0 8px 8px 0;width: 226px;
  }

  .right-box {
    flex: 1;
    padding-left: 14px;
    height: 100%;
    .page-head {
      height: 40px;
      width: 100%;
      border-bottom: 1px solid #ccc;
      line-height: 40px;
    }
  }

  .menu-manage-detail {
    padding-top: 1em;
    .block-header {
      margin: 12px 0;
      .block-header-left {
        .block-header-blue {
          display: inline-block;
          margin-right: 10px;
          width: 4px;
          height: 16px;
          opacity: 1;
          background-color: rgb(25,142,235);
        }
      }
      .block-header-right {
        cursor: pointer;
        .menu-button {
          cursor: pointer;
          height: 26px;
          width: 72px;
          border-radius: 3px;
          background: #fff;
          border: 1px solid #198eeb;
          color: #198eeb;
        }
      }
    }
    .menu-manage-detail-li {
      width: 50%;
    }
    .menu-manage-detail-name {
      line-height: 1.4em;
      margin: 0 10px 0.6em 0;
      width: 118px;
      text-align: right;
      color: #666666;
    }
    .menu-manage-detail-value {
      width: calc(100% - 128px);
    }
  }
</style>


