<template>
<div ref="box">
  <div class="search-wrap">
    <a-input v-model:value="searchValue" class="search-input" placeholder="请输入字典名称查询" @keyup.enter="searchTree(searchValue)">
      <template #suffix>
        <svg class="icon svg-icon" aria-hidden="true" style="color:#ccc" @click="searchTree(searchValue)">
          <use xlink:href="#iconsearch"></use>
        </svg>
      </template>
    </a-input>
    <svg class="icon svg-icon" aria-hidden="true" @click="$emit('showModal')" style="width:14px;height:14px">
      <use xlink:href="#iconadd"></use>
    </svg>
  </div>
  <!-- expandedKeys指定展开数的节点  expand展开收起节点时触发  auto-expand-parent是否自动展开父节点 -->
  <a-tree :tree-data="treeData" v-model:expandedKeys="expandedKeys" v-if="!isSearch" style="margin-left:8px">
    <template #title="{ key: treeKey, title, sort,children}">
      <div  @mouseenter="iconShow(treeKey)" @mouseleave="iconHidden(treeKey)" class="tree-content">
        <div class="virtual-div"></div>
        <div class="fictitious-wrap">
          <svg class="icon svg-icon" aria-hidden="true" style="margin-right:8px;z-index:99">
            <use xlink:href="#iconfolder"></use>
          </svg>
          <span style="z-index:99">{{ title }}
            <a-dropdown  placement="bottomRight" 
            :getPopupContainer="
              triggerNode => {
                return triggerNode.parentNode;
              }
            "
            >
              <svg class="icon svg-icon" aria-hidden="true" style="margin-top:4px;float:right;z-index:99" v-show="isShow==treeKey" @mouseenter="onContent(treeKey,children)" >
                <use xlink:href="#iconmore1"></use>
              </svg>  

              <template #overlay> 
                <a-menu @click="({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)" @mouseenter="iconShow(treeKey)"  @mouseleave="iconHidden(treeKey)" style="padding:18px 0;width:100px">
                  <div class="ant-dropdown-arrow"></div>
                  <a-menu-item key="1" @click="$emit('showModal')">添加机构</a-menu-item>
                  <a-menu-item key="2" @click="stop()">停用</a-menu-item>
                  <a-menu-item key="3" @click="useDic()">启用</a-menu-item>
                  <a-menu-item key="3" :disabled="sort==1" @click="move(treeKey,title,'up')">上移</a-menu-item>
                  <a-menu-item key="3" :disabled="sort==sortLength">下移</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </span>
        </div>
      </div>
    
    </template>
  </a-tree>

  <div class="tree-wrap" v-if="isSearch">
    <div class="tree-search-wrap-box">
      <p class="tree-search-wrap-title">一级</p>
      <ul class="tree-search-wrap-content">
        <li>
          <svg class="icon svg-icon" aria-hidden="true" style="margin-right:8px">
            <use xlink:href="#iconfolder"></use>
          </svg>
        </li>
      </ul>
    </div>
    <div class="tree-search-wrap-box">
      <p class="tree-search-wrap-title">二级</p>
      <ul class="tree-search-wrap-content">
        <li>
          <svg class="icon svg-icon" aria-hidden="true" style="margin-right:8px">
            <use xlink:href="#iconfolder"></use>
          </svg>
        </li>
      </ul>
    </div>
    <div class="tree-search-wrap-box">
      <p class="tree-search-wrap-title">三级</p>
      <ul class="tree-search-wrap-content">
        <li>
          <svg class="icon svg-icon" aria-hidden="true" style="margin-right:8px">
            <use xlink:href="#iconfolder"></use>
          </svg>
        </li>
      </ul>
    </div>
  </div>

  <!-- 暂无搜索 -->
  <!-- <div v-else class="not-data-img">
    <img src="../assets/no-search.png" alt="">
  </div> -->

  <!-- 暂无数据 -->
  <!-- <div class="no-data">
    <div>
      <svg class="icon svg-icon" aria-hidden="true" style="width:136px;height:92px">
        <use xlink:href="#iconnone1"></use>
      </svg>
      <p>暂无数据</p>
    </div>
  </div> -->

  <a-modal
    v-model:visible="isOpenDialog"
    :confirm-loading="confirmLoading2"
    class="dictionaries-modal"
    :footer="null"
    width="300px"
    :centered="true"
    wrapClassName="delete-dialog"   
    :getContainer="$refs.box"
  >
    <template #closeIcon>
      <svg class="icon svg-icon" aria-hidden="true" style="width:10px;height:10px">
        <use xlink:href="#icondeletex3"></use>
      </svg>
    </template>
    <OperationPop :title="dialogTitle" :content="dialogContent" :icon="operationIcon" @closeDialog="isOpenDialog=false" @errorInfo="errorInfo()" v-if="isOpenDialog"/>
  </a-modal>
</div>
</template>

<script>
import { defineComponent, ref, watch,toRaw, reactive,createVNode, onMounted, onUpdated, nextTick} from 'vue';
import { ExclamationCircleOutlined,QuestionCircleOutlined} from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import {getPopupNode} from '../config/mUtils'

// 树形图
const treeData = [
  {
    title: '0-0',
    key: '0-0',
    sort: 1,
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        sort: 1,
        children: [
          {
            title: '0-0-0-0',
            key: '0-0-0-0',
            sort: 1
          },
          {
            title: '0-0-0-1',
            key: '0-0-0-1',
            sort: 2
          },
          {
            title: '0-0-0-2',
            key: '0-0-0-2',
            sort: 3
          },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        sort: 2,
        children: [
          {
            title: '0-0-1-0',
            key: '0-0-1-0',
            sort: 1,
          },
          {
            title: '0-0-1-1',
            key: '0-0-1-1',
            sort: 2
          },
          {
            title: '0-0-1-2',
            key: '0-0-1-2',
            sort: 3
          },
          {
            title: '0-0-1-3',
            key: '0-0-1-3',
            sort: 4
          },
        ],
      },
    ],
  }
];
export default defineComponent({
  setup() {
    //树形图
    const searchValue = ref('');
    const onContextMenuClick = (treeKey, menuKey) => {
      // console.log(`treeKey: ${treeKey}, menuKey: ${menuKey}`);
    };

    const expandedKeys = ref(['0-0-0', '0-0-1']);
    watch(expandedKeys, () => {
      console.log('expandedKeys', expandedKeys);
    });


    const dialogTitle = ref('');
    const dialogContent = ref('');
    const operationIcon = ref('');
    const isOpenDialog = ref(false);
     
    //停用
    const stop = ()=>{
      dialogTitle.value = "您确定要停用该字典分类吗？";
      dialogContent.value = "停用后，该字典分类将无法正常使用！";
      operationIcon.value = "#iconwaring_line";
      isOpenDialog.value = true;
    }

    //启用
    const useDic = ()=>{
      dialogTitle.value = "您确定要启用该字典吗？";
      dialogContent.value = "启用后，该字典将允许重新被使用！";
      operationIcon.value = "#iconquestion_line";
      isOpenDialog.value = true;
    }

    //停用失败
    const errorInfo = ()=>{
      isOpenDialog.value = false;
      dialogTitle.value = "停用失败！";
      dialogContent.value = "该机构下有子字典在使用，无法停用！";
      operationIcon.value = "#iconwrong_line";
      isOpenDialog.value = true;
    }

    //初始化
    const sortLength = ref(1);
    const onContent = async(treeKey,children)=>{
      // let div = document.getElementsByClassName('ant-dropdown');
      // await nextTick(()=>{})
      // if(div){
      //  for(var i =0;i<div.length;i++){
      //    let content = div[i];
      //    console.log(content);
      //  }
      // }


      let arr = treeData.filter(item=>{
        return item.key == treeKey
      })
      if(arr.length){
        sortLength.value = treeData.length;
      }else {
        treeData.forEach(item=>{
          let arr2 = item.children.filter((items) =>{
            return items.key == treeKey
          })
          if(arr2.length){
            sortLength.value = item.children.length;
          }else {
            item.children.forEach(item2=>{
              let arr3 = item2.children.filter((item3)=>{
                return item3.key == treeKey
              })
              if(arr3.length){
                sortLength.value = item2.children.length;
              }
            })
          }
        })
      }

    }

    const isShow = ref(false);
    const iconShow = (treeKey)=>{
      isShow.value = treeKey;
      const div = getPopupNode().querySelectorAll('.tree-content')
      console.log(div,77);
      // div[0].style.background = '#fffbe0'
    }
    const iconHidden = (treeKey)=>{
      isShow.value = !treeKey;
    }


    
    const isSearch = ref(false);
    //搜素
    const searchTree = (searchValue)=>{
      if(searchValue){
        isSearch.value = true
      }else {
        isSearch.value = false
      }
    }


    //上移
    const move = (key,title,direction)=>{
  
    }

    const confirmLoading2 = ref(false);

    return {
      // 树形图
      searchValue,
      treeData,
      onContextMenuClick,
      expandedKeys,
      stop,
      useDic,
      move,
      onContent,
      sortLength,
      iconShow,
      isShow,
      searchTree,
      isSearch,
      iconHidden,
      dialogTitle,
      dialogContent,
      operationIcon,
      isOpenDialog,
      errorInfo,
      confirmLoading2
    }
  },
  computed: {},
  methods: {
  }
})
</script>

<style lang="scss" scoped>
  .search-wrap {
    display: flex;
    padding: 14px;
    width: 100%;
    align-items: center;
  }
  .search-input {
    margin-right: 10px;
    width: 226px;
  }

  .tree-search-wrap-box {
    border-bottom: 1px solid #dcdcdc;
    padding-bottom: .5em;
  }

  .tree-search-wrap-title {
    color: #666;
    margin: .5em 0;
  }

  .ant-tree.ant-tree-directory > li span.ant-tree-node-content-wrapper:hover::before, .ant-tree.ant-tree-directory .ant-tree-child-tree > li span.ant-tree-node-content-wrapper:hover::before {
    background-color: #fffbe0;
  }

  //下拉弹窗尖角
  .ant-dropdown-arrow, .ant-dropdown-placement-bottomLeft > .ant-dropdown-arrow, .ant-dropdown-placement-bottomRight > .ant-dropdown-arrow {
    top: -3px;
    left: 36px;
    border-top-color: #fff;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: #fff;
    box-shadow: -2px -2px 5px rgb(0 0 0 / 6%);
  }

  .ant-dropdown-arrow {
    position: absolute;
    z-index: 1;
    display: block;
    // width: 8.48px;
    // height: 8.48px;
    background: transparent;
    border-style: solid;
    border-width: 4.24264069px;
    transform: rotate(
      45deg
    );
  }

  .ant-dropdown .ant-dropdown-menu {
    margin-top: 10px;
  }

  .not-data-img {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width:155px;
      height:60px;  
    } 
  }
  
  .tree-search-wrap-content {
    margin-bottom: 0%;
  }

  .fictitious-wrap {
    display: flex;
    width: 100%;
    align-items: center;
  }


</style>