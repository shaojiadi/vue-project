<template>
  <div>
    <a-table
    :columns="columns"
    :data-source="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
    :row-key="record => record.login.uuid"
    bordered
    class="main-table"
    :scroll="{ x: 'calc(700px + 50%)'}"
    >
    </a-table>
  </div>
</template>
<script>
import {defineComponent,reactive, ref,toRefs,onMounted,watch} from 'vue'
import {queryData} from '../service/getData'


const columns = [
  {
    title: '序号',
    dataIndex: 'name',
    width: 44,
    align: 'center',
  },
  {
    title: 'ID',
    dataIndex: 'gender',
    width: 236,
    align: 'center'
  },
  {
    title: '操作IP地址',
    dataIndex: 'email',
    width: 92,
    align: 'center',
    ellipsis: true
  },
  {
    title: '机构ID',
    dataIndex: 'email',
    width: 236,
    align: 'center',
    ellipsis: true
  },
  {
    title: '应用IAID',
    dataIndex: 'email',
    width: 236,
    align: 'center',
    ellipsis: true
  },
  {
    title: '用户代理',
    width: 117,
    dataIndex: 'email',
    align: 'center',
    ellipsis: true
  },
  {
    title: '请求URL',
    width: 158,
    dataIndex: 'email',
    align: 'center',
    ellipsis: true
  },
  {
    title: '操作方式',
    width: 68,
    dataIndex: 'email',
    align: 'center',
    ellipsis: true
  },
  {
    title: '创建时间',
    width: 142,
    dataIndex: 'email',
    align: 'center',
    ellipsis: true
  },
  {
    title: '创建人',
    width: 68,
    dataIndex: 'email',
    align: 'center',
    ellipsis: true
  },
  {
    title: '最后更新时间',
    width: 142,
    dataIndex: 'email',
    align: 'center',
    ellipsis: true
  },
  {
    title: '更新人',
    width: 68,
    dataIndex: 'email',
    align: 'center',
    ellipsis: true
  },
];

export default defineComponent({
  setup(props){
    const pagination = reactive({
      pageSize: 10, // 默认每页显示数量
      showTotal: total => `共 ${total} 条`, // 显示总数
      showSizeChanger: true, // 显示可改变每页数量
      pageSizeOptions: ['10', '20', '30', '40'], // 每页数量选项
      showSizeChange: (current, pageSize) => this.pageSize = pageSize, // 改变每页数量时更新显示
    })


    watch(props,(newValue,oldValue)=>{
      const content = ref(newValue)
      console.log(content.value);
    })


    return {
      pagination,
    }
  },
  props: ['content'],
  data() {
    return {
      data: [],
      loading: false,
      columns,
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    },
    fetch(params = {}) {
      this.loading = true;
      queryData({
        results: 10,
        ...params,
      }).then(({ data }) => {
        const pagination = { ...this.pagination };
        pagination.total = 200;
        this.loading = false;
        this.data = data.results;
        this.pagination = pagination;
      });
    },
  },
  updated(){
    var div = document.querySelector('.ant-pagination-total-text');
    var div2 = document.querySelector('.ant-pagination-options');
    if(div&&div2){
      let div3 = div.cloneNode(true);
      div.parentNode.insertBefore(div3,div2);
      // div.parentNode.appendChild(div3);　
      div.parentNode.removeChild(div)
    }
  },
});
</script>

<style lang="scss" scoped>

</style>
