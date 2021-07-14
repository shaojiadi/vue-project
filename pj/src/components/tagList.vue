<template>
  <div>
    <a-input v-model:value="searchValue" class="search-input" placeholder="请输入字典名称查询" @keyup.enter="searchTree(searchValue)">
      <template #suffix>
        <svg class="icon svg-icon" aria-hidden="true" style="color:#ccc" @click="searchTree(searchValue)">
          <use xlink:href="#iconsearch"></use>
        </svg>
      </template>
    </a-input>
    <svg class="icon svg-icon" aria-hidden="true" @click="$emit('showModal')">
      <use xlink:href="#iconadd"></use>
    </svg>
  </div>
  <!-- expandedKeys指定展开数的节点  expand展开收起节点时触发  auto-expand-parent是否自动展开父节点 -->
  <a-directory-tree :tree-data="treeData" v-model:expandedKeys="expandedKeys" v-if="!isSearch">
    <template #title="{ key: treeKey, title, sort,children}">
      <div class="fictitious-wrap" @mouseenter="iconShow(treeKey)" @click="iconHidden(treeKey)" @mouseleave="iconHidden(treeKey)">
        <svg class="icon svg-icon" aria-hidden="true" style="margin-right:8px">
          <use xlink:href="#iconfolder"></use>
        </svg>
        <span>{{ title }}</span>
      </div>
     
      <a-dropdown :trigger="['hover']"  placement="bottomCenter" @mouseenter="iconShow(treeKey)" @mouseleave="iconHidden(treeKey)">
        <svg class="icon svg-icon" aria-hidden="true" style="margin-top:4px;position: absolute;right: 0;" v-if="isShow==treeKey" @mouseenter="onContent(treeKey,children)" >
          <use xlink:href="#iconmore1"></use>
        </svg>  

       
        <template #overlay> 
          <!-- #overlay同v-slot一样-->
          <a-menu @click="({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)">
            <div class="ant-dropdown-arrow"></div>
            <a-menu-item key="1" @click="$emit('showModal')">添加机构</a-menu-item>
            <a-menu-item key="2" @click="stop()">停用</a-menu-item>
            <a-menu-item key="3" @click="useDic()">启用</a-menu-item>
            <a-menu-item key="3" :disabled="sort==1" @click="move(treeKey,title,'up')">上移</a-menu-item>
            <a-menu-item key="3" :disabled="sort==sortLength">下移</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </template>
  </a-directory-tree>

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
</template>

<script>
import { defineComponent, ref, watch,toRaw, reactive,createVNode, onMounted, onUpdated} from 'vue';
import { ExclamationCircleOutlined,QuestionCircleOutlined} from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';

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

    onMounted(()=>{
      removeClass()
    })

    onUpdated(()=>{
      removeClass()
    })

    const removeClass = ()=>{
      let icon = document.getElementsByClassName('ant-tree-iconEle');
      for(var i = 0;i<icon.length;i++){
        icon[i].innerHTML = ''
      }

    }

    //停用
    const stop = ()=>{
      Modal.confirm({
        title: '您确定要停用该字典吗？',
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode(
          'div',
          {
            style: 'color:#666666;',
          },
          '停用后，该字典将无法使用，请谨慎操作！',
        ),

        onOk() {
          console.log('OK');
        },

        onCancel() {
          console.log('Cancel');
        },

        class: 'test',
      });
    }

    //启用
    const useDic = ()=>{
      Modal.confirm({
        title: '您确定要启用该字典吗？',
        icon: createVNode(QuestionCircleOutlined),
        content: createVNode(
          'div',
          {
            style: 'color:#666666;',
          },
          '启用后，该字典将允许重新被使用！',
        ),

        onOk() {
          console.log('OK');
        },

        onCancel() {
          console.log('Cancel');
        },

        class: 'test',
      });
    }


    //初始化
    const sortLength = ref(1);
    const onContent = (treeKey,children)=>{
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
      iconHidden
    }
  }
})
</script>

<style lang="scss" scoped>
  .search-input {
    margin: 0 8px 8px 0;width: 226px;
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
    // width: 60px;
    // position: absolute;
    // height: 24px;
    // left: -60px;
    // background: #f00;
    flex:1;
  }
</style>