<template>
  <a-card :bordered="false">
    <a-row :gutter="24">
     
      <a-col :span="12">
         <a-input-search placeholder="input search text"  @search="onSearch"/>
        <s-tree
          :dataSource="orgTree"
          :openKeys.sync="openKeys"
          :search="true"
          @click="handleClick"
          @add="handleAdd"
          @edit="handleEdit"
          @dele="handleDele"
          @titleClick="handleTitleClick"></s-tree>
      </a-col>
      <a-button type="primary" @click="addFirstMeum">新增一级菜单</a-button>
    </a-row>

    <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" />
  </a-card>
</template>

<script>
import STree from '@/components/Tree/Tree.vue'
import { STable } from '@/components'
import OrgModal from './modules/OrgModal'
import { getOrgTree, getServiceList } from '@/api/manage'

export default {
  name: 'TreeList',
  components: {
    STable,
    STree,
    OrgModal
  },
  data () {
    return {
      openKeys: ['key-01'],

      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: 'no'
        },
        {
          title: '成员名称',
          dataIndex: 'description'
        },
        {
          title: '登录次数',
          dataIndex: 'callNo',
          sorter: true,
          needTotal: true,
          customRender: (text) => text + ' 次'
        },
        {
          title: '状态',
          dataIndex: 'status',
          needTotal: true
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
          sorter: true
        },
        {
          table: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getServiceList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      },
      orgTree: [],
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created () {
    getOrgTree().then(res => {
      this.orgTree = res.result
    })
  },
  methods: {
    addFirstMeum(){
      let newMeum = {
        'key': 'key-0100',
        'title': '新菜单',
        'icon': 'mail'
      }
      this.orgTree.push(newMeum)
    },
    handleClick (e) {
      console.log('handleClick', e)
      this.queryParam = {
        key: e.key
      }
      this.$refs.table.refresh(true)
    },
    handleAdd (item) {
      console.log('add button, item', item)
      this.$message.info(`提示：你点了 ${item.key} - ${item.title} `)
      this.$refs.modal.add(item.key)
    },
    handleEdit(item){
      console.log('编辑')
    },
    handleDele(item){
      console.log('删除')
    },
    handleTitleClick (item) {
      console.log('handleTitleClick', item)
    },
    titleClick (e) {
      console.log('titleClick', e)
    },
    handleSaveOk () {

    },
    handleSaveClose () {

    },

    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>

<style lang="less">
  .custom-tree {

    /deep/ .ant-menu-item-group-title {
      position: relative;
      &:hover {
        .btn {
          display: block;
        }
      }
    }

    /deep/ .ant-menu-item {
      &:hover {
        .btn {
          display: block;
        }
      }
    }

    /deep/ .btn {
      display: none;
      position: absolute;
      top: 0;
      right: 10px;
      width: 20px;
      height: 40px;
      line-height: 40px;
      z-index: 1050;

      &:hover {
        transform: scale(1.2);
        transition: 0.5s all;
      }
    }
  }
</style>
