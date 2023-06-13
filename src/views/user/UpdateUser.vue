<template>
  <div>
    <el-dialog :visible.sync="showDialog" @close="onClose" title="更改信息">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
          <el-col :span="12">
            <el-form-item label="ID" prop="username">
              <el-input v-model="formData.username" placeholder="请输入ID" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职业" prop="vocation">
              <el-cascader
                :show-all-levels="false"
                v-model="formData.vocation"
                :options="allVocationsList"
                filterable
                :props="{ expandTrigger: 'hover',
                 children:'vocationAfterChangeList',
                 emitPath:false
                 }"
                ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          </el-col>
          <el-col :span="12">
          </el-col>
          <el-col :span="12">
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间" prop="joinDate">
              <el-date-picker v-model="formData.joinDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                :style="{width: '100%'}" placeholder="请选择入队时间" clearable></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { updateUserById } from '../../api/users'

export default {
  props:{
    updateVisible:{
      type: Boolean,
      default: false
    },
    allVocationsList:{

    },
    choosedRowUserInfo:{

    }
    },
  inheritAttrs: false,
  components: {},

  data() {
    return {
      showDialog:false,
      formData: {
        id:undefined,
        username: undefined,
        vocation: undefined,
        department: undefined,
        qqnumber: undefined,
        phoneNumber: undefined,
        joinDate: undefined,
      },
      rules: {
        username: [{
          required: true,
          message: '请输入ID',
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
        qqnumber: [{
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

    async updateUserById(){
      await updateUserById(this.formData)
    },
    handleClose () {
      // 子组件调用父组件方法，并传递参数
      this.$emit('changeShow', 'false')
    },
    onOpen() {},
    onClose() {
      this.$refs['elForm'].resetFields()
      this.$emit('changeShow', 'false')
      this.$emit('getAllUsers')
    },
    close() {
      this.$emit('changeShow', 'false')
      this.$emit('getAllUsers')
    },
     handelConfirm() {
     this.$refs['elForm'].validate (valid => {
        if (!valid) return;
        this.updateUserById()
        this.$emit('message','修改信息完成')
        this.$emit('getAllUsers')
        this.close()
      })
    },
  },

  watch: {
    // 监听 updateVisible 改变
    updateVisible () {
      this.showDialog = this.updateVisible
      this.formData = this.choosedRowUserInfo
    }
  }
}

</script>
<style>
</style>
