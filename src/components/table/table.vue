<template>
  <div class="wrap">
    <Dropdown
      v-if="showFilter"
      trigger="custom"
      :visible.sync="visible"
      class="selectList"
      placement="right-start"
      @on-clickoutside="clickoutsideHandle"
    >
      <!-- <a href="javascript:void(0)" @click="handleOpen"> -->
      <Icon type="ios-list-box-outline" @click="handleOpen" size="30"></Icon>
      <!-- </a> -->
      <DropdownMenu slot="list">
        <DropdownItem>
          <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll"
          >全选
          </Checkbox>
        </DropdownItem>
        <CheckboxGroup
          v-model="selCol"
          @on-change="checkBoxChangeHandle"
        >
          <template v-for="(item, index) in filterDownList">
            <DropdownItem :key='index' :disabled="index === 0">
              <Checkbox :disabled="index === 0" :label="item.key">{{item.title}}</Checkbox>
            </DropdownItem>
          </template>
        </CheckboxGroup>
      </DropdownMenu>
    </Dropdown>
    <i-table
      :columns="filtersColumns" 
      :data="cData"
      @on-selection-change= "selectionChange"
    >
    </i-table>
    <i-button type="primary" style="float: left; margin: 10px;" v-if="hasSelection" @click="deleteRows">删除</i-button>
    <div class="page-box"  v-if="showPage">
      <Page class="pagination" 
        :current="curPage" 
        :total="total" 
        :show-sizer="showSizer"
        show-total
        :show-elevator="showElevator"
        :size="size"
        :page-size="pSize"
        :page-size-opts="pageSizeList"
        :class-name="className"
        :styles="styles"
        :transfer="transfer"
        @on-change="pageChange"
        :placement="placement"
        @on-page-size-change="pageSizeChange" 
      >
      </Page>
    </div>
  </div>
</template>
<script>
export default {
  name: 'hst-table',
  props: {
    tableData: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    showPage: {
      type: Boolean,
      default: true
    },
    pageSize: {
      type: Number,
      default: 15
    },
    // 总页数
    total: {
      type: Number
    },
    // 当前页数 用来改变page-size
    currentPage: {
      type: Number,
      default: 1
    },
    // 是否显示分页
    showSizer: {
      type: Boolean,
      default: true
    },
    pageSizeList: {
      type: Array,
      default: () => [10, 20, 50, 100, 200]
    },
    // 显示电梯，可以快速切换到某一页
    showElevator: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    size: {
      type: String
    },
    className: {
      type: String
    },
    styles: {
      type: Object
    },
    transfer: {
      type: Boolean,
      default: false
    },
    showDelete: {
      type: Boolean,
      default: true
    },
    showFilter: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.updateTable()
    this.columns.map((item) => {
      if (item.key !== 'action' && item.type !== 'selection' && item.type !== 'index' && item.sel !== 0) {
        this.allCol.push(item.key)
        this.selCol.push(item.key)
      }
    })
  },
  computed: {
    /**
     * 判断列表属性是否含有选择选项
     */
    hasSelection () {
      if (!this.showDelete) return false
      for (let { type } of this.columns) {
        if (type === 'selection') return true
      }
      return false
    },
    cData () {
      return this.tableData
    },
    filterDownList () {
      return this.columns.filter((item) => {
        return item.key !== 'action'
      })
    },
    filtersColumns () {
      return this.columns.filter((item) => {
        return this.selCol.some((item1) => {
          return item.key === item1 || item.type === 'index'
        })
      })
    }
  },
  data () {
    return {
      curPage: this.currentPage,
      pSize: this.pageSize,
      selectionList: [],
      visible: false,
      indeterminate: true,
      checkAll: false,
      allCol: [],
      selCol: []
    }
  },
  methods: {
    checkBoxChangeHandle (data) {
      if (data.length === this.allCol.length) {
        this.checkAll = true
        this.indeterminate = false
      } else {
        this.checkAll = false
        this.indeterminate = true
      }
    },
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = !this.checkAll
        this.indeterminate = false
      } else {
        this.checkAll = false
        this.indeterminate = true
      }
      if (this.checkAll) {
        this.selCol = this.allCol
      } else {
        this.selCol = [
          this.allCol[0]
        ]
      }
    },
    clickoutsideHandle () {
      this.visible = !this.visible
    },
    handleOpen () {
      this.visible = !this.visible
    },
    pageChange (num) {
      this.selectionList = []
      this.curPage = num
      this.$emit('update:currentPage', num)
      this.updateTable()
    },
    pageSizeChange (num) {
      this.pSize = num
      if (this.curPage === 1) {   // 修改bug 大于第一页时，切换每页数，会同时触发 pageChange
        this.$emit('update:pageSize', num)
        this.updateTable()
      }
    },
    condictionChange () {
      this.takeOnSearch = false
    },
    searchTable () {
      this.curPage = 1
      this.takeOnSearch = true
      this.updateTable()
    },
    updateTable () {
      let params = {
        curPage: this.curPage,
        pageSize: this.pSize
      }
      this.$emit('updateTable', params)
    },
    /**
     * 列数据选中事件
     */
    selectionChange (data) {
      this.selectionList = data
      this.$emit('on-selection-change', data)
    },
    deleteRows () {
      if (this.selectionList.length === 0) {
        this.$Message.info('请选择要删除的行')
        return
      }
      this.$emit('deleteRows', this.selectionList)
    }
  },
  watch: {
    currentPage: {
      immediate: true,
      handler (val) {
        this.curPage = val
      }
    },
    pageSize: {
      immediate: true,
      handler (val) {
        this.pSize = val
      }
    }
  }
}
</script>
<style lang="less" scoped>
.wrap {
  .search-room {
    margin-bottom: 10px;
    text-align: left;
  }
  .selectList {
    position: relative;
    right: 0;
    cursor: pointer;
  }
}
.search-btn {
  color: #fff;
  height: 32px;
  line-height: 32px;
  background: #2db7f5;
  display: inline-block;
  padding: 0 15px;
  border-radius: 5px;
}
.select-style {
  width: 160px;
}
.page-box {
  margin-top: 10px;
  text-align: right;
  padding-right: 10px;
}
</style>