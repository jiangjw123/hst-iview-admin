<template>
  <div>
    <hst-table
      :columns="columns" 
      :tableData="tableData"
      :showSearch="false"
      :total="total"
      :pageSize.sync="pageSize"
      :currentPage.sync="curPage"
      :showFilter="true"
      @updateTable="updateTable"
    >

    </hst-table>
  </div>
</template>
<script>
import hstTable from '@/components/table'
export default {
  data () {
    return {
      pageSize: 10,
      curPage: 1,
      total: 0,
      tableData: [],
      columns: [
        {
          key: 'id',
          title: '用户id'
        },
        {
          key: 'roomId',
          title: '房间id'
        },
        {
          key: 'createTime',
          title: '创建时间'
        },
        {
          key: 'email',
          title: '邮箱地址'
        },
        {
          key: 'title',
          title: '名称'
        }
      ]
    }
  },
  components: {
    hstTable
  },
  methods: {
    updateTable () {
      this.getTable()
    },
    getTable () {
      this.axios.get(`/getTable?curPage=${this.curPage}&pageSize=${this.pageSize}`).then((res) => {
        let result = res.data.data.result
        this.tableData = result
        this.total = res.data.data.total
        console.log(res.data)
      })
    }
  }
}
</script>