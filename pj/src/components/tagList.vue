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
    <template #title="{ key: treeKey, title }">
      <svg class="icon svg-icon" aria-hidden="true" style="margin-right:8px">
        <use xlink:href="#iconfolder"></use>
      </svg>
      <a-dropdown :trigger="['hover']">
        <!-- :visible="true" -->
        <span>{{ title }}</span>
        <template #overlay> 
          <!-- #overlay同v-slot一样-->
          <a-menu @click="({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)">
            <a-menu-item key="1" @click="$emit('showModal')">添加机构</a-menu-item>
            <a-menu-item key="2" @click="stop()">停用</a-menu-item>
            <a-menu-item key="3" @click="useDic()">启用</a-menu-item>
            <a-menu-item key="3">上移</a-menu-item>
            <a-menu-item key="3">下移</a-menu-item>
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
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          {
            title: '0-0-0-0',
            key: '0-0-0-0',
          },
          {
            title: '0-0-0-1',
            key: '0-0-0-1',
          },
          {
            title: '0-0-0-2',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          {
            title: '0-0-1-0',
            key: '0-0-1-0',
          },
          {
            title: '0-0-1-1',
            key: '0-0-1-1',
          },
          {
            title: '0-0-1-2',
            key: '0-0-1-2',
          },
        ],
      },
    ],
  },
];
export default defineComponent({
  setup() {
    //树形图
    const searchValue = ref('');
    const onContextMenuClick = (treeKey, menuKey) => {
      console.log(`treeKey: ${treeKey}, menuKey: ${menuKey}`);
    };

    const expandedKeys = ref(['0-0-0', '0-0-1']);
    watch(expandedKeys, () => {
      console.log('expandedKeys', expandedKeys);
    });

    //停用
    const stop = ()=>{
      Modal.confirm({
        title: '您确定要停用该字典分类吗？',
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode(
          'div',
          {
            style: 'color:#666666;',
          },
          '停用后，该字典分类将无法正常使用！',
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
        title: '您确定要启用该字典分类吗？',
        icon: createVNode(QuestionCircleOutlined),
        content: createVNode(
          'div',
          {
            style: 'color:#666666;',
          },
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

    return {
      // 树形图
      searchValue,
      treeData,
      onContextMenuClick,
      expandedKeys,
      stop,
      useDic
    }
  }
})
</script>

<style lang="scss" scoped>
  .search-input {
    margin: 0 8px 8px 0;width: 226px;
  }
</style>