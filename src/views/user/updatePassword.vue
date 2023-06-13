<template>
  <div>
    <el-dialog :visible.sync="showUpdatePassword" @close="close" title="update password">
      <el-form ref="updatePassword" :model="formData" :rules="rules" size="mini" label-width="140px"
               label-position="left">
        <el-form-item label="old password：" prop="oldPassword">
          <el-input v-model="formData.oldPassword" placeholder="please input old password"
                    clearable show-password maxlength="16" minlength="6" show-word-limit
                    :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="new password：" prop="newPassword">
          <el-input v-model="formData.newPassword" type="text" placeholder="contain alphabet and number，6-16 characters"
                    clearable show-password maxlength="16" minlength="6" show-word-limit
                    :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="again：" prop="reWriteNewPassword">
          <el-input v-model="formData.reWriteNewPassword" placeholder="contain alphabet and number，6-16 characters"
                    clearable show-password maxlength="16" minlength="6" show-word-limit
                    :style="{width: '100%'}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">cancel</el-button>
        <el-button type="primary" @click="handelConfirm">confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { updatePassword } from '../../api/users'

  export default {
    inheritAttrs: false,
    components: {},
    props: {
      showUpdatePassword: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        showDialog: false,
        formData: {
          oldPassword: undefined,
          newPassword: undefined,
          reWriteNewPassword: undefined,
        },
        rules: {
          oldPassword: [{
            required: true,
            message: '请输入旧密码',
            trigger: 'change'
          }],
          newPassword: [{
            required: true,
            message: '请输入新密码',
            trigger: 'change',
          },{
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
            message: '包含字母和数字,6-16个字符',
            trigger: 'change'
          }],
          reWriteNewPassword: [{
            required: true,
            message: '请输入再次输入新密码',
            trigger: 'change'
          },{
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
            message: '包含字母和数字,6-16个字符',
            trigger: 'change'
          }],
        },
      }
    },
    computed: {},
    watch: {},
    created () {
    },
    mounted () {
    },
    methods: {
      close () {
        this.$emit('changeShow', 'false')
      },
      handelConfirm () {
        this.$refs['updatePassword'].validate(valid => {
          if (!valid || this.formData.newPassword !== this.formData.reWriteNewPassword) return
          this.updatePassword()
          this.$emit('changeShow', 'false')
        })

      },
      async updatePassword(){
        const {data} = await updatePassword(this.formData.oldPassword,this.formData.newPassword)
        this.$message({
            message:data.message,
            type:'success'
          },
        )
      }
    }
  }

</script>
<style>
</style>
