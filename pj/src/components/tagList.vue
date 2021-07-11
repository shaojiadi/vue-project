<template>
  <div>
    <a-input v-model:value="searchValue" class="search-input" placeholder="请输入字典名称查询">
      <template #suffix>
        <svg class="icon svg-icon" aria-hidden="true" style="color:#ccc">
          <use xlink:href="#iconsearch"></use>
        </svg>
      </template>
    </a-input>
    <svg class="icon svg-icon" aria-hidden="true" @click="$emit('showModal')">
      <use xlink:href="#iconadd"></use>
    </svg>
  </div>
  <!-- expandedKeys指定展开数的节点  expand展开收起节点时触发  auto-expand-parent是否自动展开父节点 -->
  <a-tree :tree-data="treeData" v-model:expandedKeys="expandedKeys">
    <template #title="{ key: treeKey, title, sort,children}">
      <svg class="icon svg-icon" aria-hidden="true" style="margin-right:8px">
        <use xlink:href="#iconfolder"></use>
      </svg>
      <span @mouseenter="getInfo(treeKey)">{{ title }}</span>
      <a-dropdown :trigger="['hover']"  placement="bottomCenter">
        <!-- :visible="true" -->
        <svg class="icon svg-icon" aria-hidden="true" style="margin-top:4px;float:right" v-if="isShow==treeKey" @mouseenter="onContent(treeKey,children)">
          <use xlink:href="#iconmore1"></use>
        </svg>  

       
        <template #overlay> 
          <!-- #overlay同v-slot一样-->
          <a-menu @click="({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)">
            <a-menu-item key="1" @click="$emit('showModal')">添加机构</a-menu-item>
            <a-menu-item key="2" @click="stop()">停用</a-menu-item>
            <a-menu-item key="3" @click="useDic()">启用</a-menu-item>
            <a-menu-item key="3" :disabled="sort==1" @click="move(treeKey,title,'up')">上移</a-menu-item>
            <a-menu-item key="3" :disabled="sort==sortLength">下移{{sortLength}}</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </template>
  </a-tree>
</template>

<script>
import { defineComponent, ref, watch,toRaw, reactive,createVNode} from 'vue';
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
      {
        title: '0-0-2',
        key: '0-0-2',
        sort: 3,
        children: [
          {
            title: '0-0-2-0',
            key: '0-0-2-0',
            sort: 1,
          },
          {
            title: '0-0-2-1',
            key: '0-0-1-1',
            sort: 2
          },
          {
            title: '0-0-2-2',
            key: '0-0-2-2',
            sort: 3
          },
          {
            title: '0-0-2-3',
            key: '0-0-2-3',
            sort: 4
          },
        ],
      }
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
    const getInfo = (treeKey)=>{
      isShow.value = treeKey;
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
      getInfo,
      isShow
    }
  }
})
</script>

<style lang="scss" scoped>
  .search-input {
    margin: 0 8px 8px 0;width: 226px;
  }
</style>