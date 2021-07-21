<template>
  <div class="box-wrap flex-box">
    <div class="left-box">
      <TagList @showModal="showModal"/>
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
            <div class="block-header-right" @click="editDicInfo">
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
              <p :class="baseInfo.isStop?'stop-class':'nostop-class'">{{baseInfo.isStop?'是':'否'}}</p>
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
              <p class="ellipsis menu-manage-detail-value">{{baseInfo.updateCreateTime?new Date(baseInfo.updateCreateTime).format('yyyy-MM-dd hh:mm:ss'):''}}</p>
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
              <button class="menu-button" @click="addDictionaryData">添加</button>
            </div>
          </div>
          <a-table
            :columns="columns"
            :data-source="data"
            :pagination="false"
            :loading="loading"
            @change="handleTableChange"
            :row-key="record => record.id"
            bordered
            class="main-table"
            >
              <template #status="{record, index}">
                <span :class="record.status==0?'role-group-gray':'role-group'"></span>{{record.status==0?'已停用':'已启用'}}
              </template>
              <template #cz>
                <a class="edit-font" @click="openDialog">编辑</a>
                <a class="edit-font">|</a>
                <a class="edit-font" @click="deleteList">删除</a>
              </template>
          </a-table>
        </div>
      </div>
      <!-- 暂无数据 -->
      <!-- <div class="no-data">
        <div>
          <svg class="icon svg-icon" aria-hidden="true" style="width:136px;height:92px">
            <use xlink:href="#iconnone1"></use>
          </svg>
          <p>暂无数据</p>
        </div>
      </div> -->
    </div>
    <!-- 字典分类 -->
    <a-modal
      :title="isEdit?'编辑字典分类':'添加字典分类'"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      class="dictionaries-modal"
      :footer="null"
      width="560px"
    >
      <DictionaryClassification @closeDialog="visible=false" v-if="visible"  :isEdit="isEdit"/>
    </a-modal>

    <!-- 删除弹窗 -->
    <a-modal
      v-model:visible="deleteDilog"
      :confirm-loading="confirmLoading2"
      class="dictionaries-modal"
      :footer="null"
      width="300px"
      :centered="true"
      wrapClassName="delete-dialog"   
    >
      <template #closeIcon>
        <svg class="icon svg-icon" aria-hidden="true" style="width:10px;height:10px">
          <use xlink:href="#icondeletex3"></use>
        </svg>
      </template>
      <OperationPop :title="dialogTitle" :content="dialogContent" :icon="operationIcon" @closeDialog="deleteDilog=false"/>
    </a-modal>

    <!-- 字典数据值 -->
    <a-modal
      :title="isEdit?'编辑字典数据值':'添加字典数据值'"
      v-model:visible="visibleDictionaryData"
      :confirm-loading="confirmLoading2"
      @ok="handleOk2"
      class="dictionaries-modal"
      :footer="null"
      width="560px"
    >
      <DictionaryValue @closeDialog="visibleDictionaryData=false" v-if="visibleDictionaryData" :isEdit="isEdit"/>
    </a-modal>

  </div>
</template>
<script>
import { defineComponent, ref, watch,toRaw, reactive,createVNode} from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import {queryData} from '../service/getData'
import { Modal } from 'ant-design-vue';
//列表
const columns = [
  {
    title: '序号',
    dataIndex: 'name',
    width: 44,
    align: 'center',
  },
  {
    title: '数据值名称',
    dataIndex: 'gender',
    width: 148,
    align: 'center'
  },
  {
    title: '数据键值',
    dataIndex: 'email',
    width: 108,
    align: 'center',
    ellipsis: true
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 64,
    align: 'center',
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 108,
    align: 'center',
    ellipsis: true,
    slots: {
      customRender: 'status',
    },
  },
  {
    title: '创建时间',
    width: 155,
    dataIndex: 'createtime',
    align: 'center',
    ellipsis: true
  },
  {
    title: '操作',
    width: 129,
    dataIndex: 'cz',
    align: 'center',
    ellipsis: true,
    slots: {
      customRender: 'cz',
    },
  },
];

export default defineComponent({
  setup() {
    // 字典分类模态框
    const visible = ref(false);
    const confirmLoading = ref(false);
    const isEdit = ref(true);

    const showModal = () => {
      visible.value = true;
      isEdit.value = false;
    };

    const handleOk = () => {
      confirmLoading.value = true;
      setTimeout(() => {
        visible.value = false;
        confirmLoading.value = false;
      }, 2000);
    };

    const editDicInfo = ()=>{
      visible.value = true;
      isEdit.value = true;
    }

    // 字典数据值模态框
    const visibleDictionaryData = ref(false);
    const confirmLoading2 = ref(false);
    const addDictionaryData = () => {
      visibleDictionaryData.value = true;
      isEdit.value = false
    };

    const handleOk2 = () => {
      confirmLoading2.value = true;
      setTimeout(() => {
        visibleDictionaryData.value = false;
        confirmLoading2.value = false;
      }, 2000);
    };

    const openDialog = () => {
      visibleDictionaryData.value = true;
      isEdit.value = true;
    }

    const deleteDilog = ref(false);

    const deleteList = ()=>{
      deleteDilog.value = true;
    }

    //基础信息
    const baseInfo = reactive({
      isStop: true,
      updateCreateTime: 1623123250000
    })


    //表格
    const  data = reactive([
      {
        id: 1,
        name: 1,
        gender: '男',
        email: 0,
        sort: 1,
        status: 0,
        createtime: '2020-01-25 10:20:20',
        cz: ''
      },
      {
        id: 1,
        name: 1,
        gender: '男',
        email: 0,
        sort: 1,
        status: 1,
        createtime: '2020-01-25 10:20:20',
        cz: ''
      },
      {
        id: 1,
        name: 1,
        gender: '男',
        email: 0,
        sort: 1,
        status: 0,
        createtime: '2020-01-25 10:20:20',
        cz: ''
      },
      {
        id: 1,
        name: 1,
        gender: '男',
        email: 0,
        sort: 1,
        status: 1,
        createtime: '2020-01-25 10:20:20',
        cz: ''
      },
      {
        id: 1,
        name: 1,
        gender: '男',
        email: 0,
        sort: 1,
        status: 0,
        createtime: '2020-01-25 10:20:20',
        cz: ''
      },
      {
        id: 1,
        name: 1,
        gender: '男',
        email: 0,
        sort: 1,
        status: 1,
        createtime: '2020-01-25 10:20:20',
        cz: ''
      },
      {
        id: 1,
        name: 1,
        gender: '男',
        email: 0,
        sort: 1,
        status: 0,
        createtime: '2020-01-25 10:20:20',
        cz: ''
      },
      {
        id: 1,
        name: 1,
        gender: '男',
        email: 0,
        sort: 1,
        status: 1,
        createtime: '2020-01-25 10:20:20',
        cz: ''
      }
    ]);
    

    return {
      // 字典分类
      visible,
      confirmLoading,
      showModal,
      handleOk,
      editDicInfo,
      isEdit,

      //字典数据值
      visibleDictionaryData,
      confirmLoading2,
      addDictionaryData,
      handleOk2,
      openDialog,
      deleteList,

      //基础信息
      baseInfo,
      data,

      deleteDilog,
    };
  },
  components: {
  },
  mounted() {
    // this.fetch();
  },
  data() {
    return {
      loading: false,
      columns,
      dialogTitle: '您确定要删除该字典数据吗？',
      dialogContent: '删除操作不可逆，请谨慎操作！',
      operationIcon: '#iconwaring_line'
    };
  },
  methods: {
    // handleTableChange(pagination, filters, sorter) {
    //   const pager = { ...this.pagination };
    //   pager.current = pagination.current;
    //   this.pagination = pager;
    //   this.fetch({
    //     results: pagination.pageSize,
    //     page: pagination.current,
    //     sortField: sorter.field,
    //     sortOrder: sorter.order,
    //     ...filters,
    //   });
    // },
    // fetch(params = {}) {
    //   this.loading = true;
    //   queryData({
    //     results: 10,
    //     ...params,
    //   }).then(({ data }) => {
    //     const pagination = { ...this.pagination };
    //     pagination.total = 200;
    //     this.loading = false;
    //     this.data = data.results;
    //     this.pagination = pagination;
    //   });
    // },
  }
});
</script>


<style lang="scss" scoped>
  .left-box {
    width: 280px;
    height: 100%;
    border-right: 1px solid #cccccc;
    padding: 14px;
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


  .edit-font {
    font-size: 12px;
    margin: 0 3px;
  }

  .role-group,.role-group-gray {
    display: inline-block;
    margin-right: 6px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  .role-group {
    background: #4ACFB1;
  }

  .role-group-gray {
    background: #DCDCDC;
  }

  .nostop-class {
    background-color: #C1C1C1;
    color: #fff;
    padding: 0 2px;
  }

  .stop-class {
    background-color: rgb(74,207,177);
    color: #fff;
    padding: 0 2px;
  }
</style>


