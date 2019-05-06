<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="角色ID">
              <a-input placeholder="请输入"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="状态">
              <a-select placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary">查询</a-button>
              <a-button type="primary" style="margin-left: 8px" @click="userVisible=true">新增用户</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table size="default" :columns="columns" :data="loadData">
      <div slot="expandedRowRender" slot-scope="record" style="margin: 0">
         <a-table size="mini" :columns="roleColumns" :dataSource="record.rloes">
           
         </a-table>
      </div>
      <span slot="action" slot-scope="text, record" style="display:inline-block;width:200px;">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical"/>
        <a @click="addRoles(record)">添加角色</a>
        <a-divider type="vertical"/>
        <a-dropdown>
          <a class="ant-dropdown-link"> 更多 <a-icon type="down"/></a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">禁用</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>
    <a-modal title="新增用户" style="top: 20px;" :width="500" v-model="userVisible" @ok="handleOk">
      <a-form :autoFormCreate="(form)=>{this.form = form}">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用户名称"
          hasFeedback
          validateStatus="success"
        >
          <a-input placeholder="请输入用户名称" v-model="mdl.id"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态"
          hasFeedback
          validateStatus="warning"
        >
          <a-select v-model="mdl.status">
            <a-select-option value="1">正常</a-select-option>
            <a-select-option value="2">禁用</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
     <a-modal title="新增角色" style="top: 20px;" :width="500" v-model="rolesVisible" @ok="handleOk">
      <a-form :autoFormCreate="(form)=>{this.form = form}">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="角色"
          hasFeedback
          validateStatus="warning"
        >
          <a-select
            mode="multiple"
            v-model="mdl.roles"
          >
            <a-select-option value="1">admin</a-select-option>
            <a-select-option value="2">user</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态"
          hasFeedback
          validateStatus="warning"
        >
          <a-select v-model="mdl.status">
            <a-select-option value="1">正常</a-select-option>
            <a-select-option value="2">禁用</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getRoleList, getServiceList } from '@/api/manage'

export default {
  name: 'TableList',
  components: {
    STable
  },
  data() {
    return {
      userVisible: false,
      rolesVisible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: null,
      mdl: {},

      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '用户名称',
          dataIndex: 'id'
        },
        {
          title: '状态',
          dataIndex: 'status'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime'
        },
        {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 角色表格头
      roleColumns:[
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '角色名称',
          dataIndex: 'id'
        },
        {
          title: '状态',
          dataIndex: 'status'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime'
        },
        {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getRoleList(parameter).then(res => {
          console.log('getRoleList', res)
          return res.result
        })
      },

      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created() {
    getServiceList().then(res => {
      console.log('getServiceList.call()', res)
    })

    getRoleList().then(res => {
      console.log('getRoleList.call()', res)
    })
  },
  methods: {
    addRoles(){
      this.rolesVisible = true;
    },
    handleEdit(record) {
      this.mdl = Object.assign({}, record)

      this.mdl.permissions.forEach(permission => {
        permission.actionsOptions = permission.actionEntitySet.map(action => {
          return { label: action.describe, value: action.action, defaultCheck: action.defaultCheck }
        })
      })

      this.userVisible = true
    },
    handleOk() {},
    onChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>
