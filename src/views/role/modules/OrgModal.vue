<template>
  <a-modal
    title="操作"
    :width="600"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="父级ID" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-input v-decorator="['pid', {}]" disabled/>
        </a-form-item>
        <a-form-item label="图标路径" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-input v-decorator="['icon', {}]"/>
        </a-form-item>
        <a-form-item label="菜单名称" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-input v-decorator="['name', {}]"/>
        </a-form-item>

        <a-form-item label="路由路径" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-input v-decorator="['code', {}]"/>
        </a-form-item>
        <a-form-item label="排序" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-input v-decorator="['sequence', {}]"/>
        </a-form-item>
        <a-form-item label="备注" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-textarea  v-decorator="['remark', {}]"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { addMeum} from '@/api/manage'
export default {
  name: 'OrgModal',
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      confirmLoading: false,
      mdl: {}
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
    console.log('form::', this.form)
  },
  created() {},
  methods: {
    add(id) {
      this.edit({ pid: id })
      
    },
    edit(record) {
      this.mdl = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...record })
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const _this = this
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('form values', values)

          _this.confirmLoading = true
          

          addMeum(values).then(() => {
              _this.$message.success('保存成功')
              _this.$emit('ok')
            })
            .catch(() => {
              // Do something
            })
            .finally(() => {
              _this.confirmLoading = false
              _this.close()
            })
        }
      })
    },
    handleCancel() {
      this.close()
    }
  }
}
</script>
