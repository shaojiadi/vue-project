<template>
  <div>
    <a-table
    :columns="columns"
    :data-source="data"
    :pagination="false"
    :loading="loading"
    @change="handleTableChange"
    :row-key="record => record.login.uuid"
    bordered
    class="main-table"
    >
      <template slot="name" slot-scope="name"> {{ name.first }} {{ name.last }} </template> 
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
    dataIndex: 'email',
    width: 64,
    align: 'center',
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'email',
    width: 108,
    align: 'center',
    ellipsis: true
  },
  {
    title: '创建时间',
    width: 155,
    dataIndex: 'email',
    align: 'center',
    ellipsis: true
  },
  {
    title: '操作',
    width: 129,
    dataIndex: 'email',
    align: 'center',
    ellipsis: true
  },
];

export default defineComponent({
  setup(props){
    return {
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
  }
});
</script>

<style lang="scss" scoped>

</style>
