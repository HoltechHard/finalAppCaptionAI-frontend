<template>
  <div>
    <el-dialog :visible.sync="showDialog" v-on="$listeners" @open="onOpen" @close="onClose" title="Create account">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
          <el-col :span="12">
            <el-form-item label="ID" prop="username">
              <el-input v-model="formData.username" placeholder="Please input ID" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          </el-col>
          <el-col :span="12">
          </el-col>
          <el-col :span="12">
          </el-col>
          <el-col :span="12">
          </el-col>
          <el-col :span="12">
            <el-form-item label="Date" prop="joinDate">
              <el-date-picker v-model="formData.joinDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                :style="{width: '100%'}" placeholder="choose date" clearable></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="close">cancel</el-button>
        <el-button type="primary" @click="handelConfirm">confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { insertUser } from '../../api/users'

export default {
  props:{
    addVisible:{
      type: Boolean,
      default: false
    },
    allVocationsList:{
      type:undefined,
    }
    },
  inheritAttrs: false,
  components: {},

  data() {
    return {
      showDialog:false,
      formData: {
        username: undefined,
        vocation: undefined,
        department: undefined,
        QQNumber: undefined,
        phoneNumber: undefined,
        joinDate: new Date(),
      },
      rules: {
        username: [{
          required: true,
          message: 'Please input ID',
          trigger: 'blur'
        }],
        vocation: [{
          required: true,
          message: '请选择职业',
          trigger: 'change'
        }],
        department: [{
          required: true,
          message: '请选择分队/总队',
          trigger: 'change'
        }],
        QQNumber: [{
          required: true,
          message: '请输入QQ',
          trigger: 'blur'
        }],
        phoneNumber: [],
        joinDate: [{
          required: true,
          message: '请选择入队时间',
          trigger: 'change'
        }],
      },
      vocationOptions: [{
        "label": "选项一",
        "value": 1
      }],
      departmentOptions: [{
        "label": "分队",
        "value": "分队"
      }, {
        "label": "总队",
        "value": "总队"
      }],
    }
  },
  computed: {},
  created() {

  },
  mounted() {},
  methods: {
    message(tip){
      this.$message(tip)
    },

    handleClose () {
      // 子组件调用父组件方法，并传递参数
      this.$emit('changeShow', 'false')
    },
    onOpen() {},
    onClose() {
      this.$refs['elForm'].resetFields()
      this.$emit('changeShow', 'false')
    },
    close() {
      this.$emit('changeShow', 'false')
    },
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return;
        insertUser(this.formData)
        this.$emit('message','success!')
        this.$emit('getAllUsers')
        this.close()
      })
    },
  },

  watch: {
    // 监听 addVisible 改变
    addVisible () {
      this.showDialog = this.addVisible
    }
  }
}
</script>
<style>
</style>
