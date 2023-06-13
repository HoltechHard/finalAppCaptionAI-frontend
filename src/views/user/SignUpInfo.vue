<template>
  <el-dialog :visible.sync="signUpInfoVisible" @close="close" title="报名信息">
  <div style="height: 100%">
    <el-card class="box-card" style="height: 100%">
  <el-table
    :show-overflow-tooltip="true"
    :data="competitionsSignUpInfos"
    border
    style="width: 100%"
  >
    <el-table-column
      type="index"
      label="序号"
    ></el-table-column>
    <el-table-column
      prop="username"
      label="已报名"
      >
    </el-table-column>
  </el-table>
      <div style="margin:10px 0 auto;text-align: center">
    <el-button type="primary" style="width:40%" :disabled="this.signUpButtonDisabled" @click="signUp">报名</el-button>
    <el-button style="width:40%" @click="cancelSignUp">取消报名</el-button>
      </div>
    </el-card>
  </div>
  </el-dialog>
</template>

<script>
  import { addSignUpInfo, cancelSignUp, getSignUpInfo } from '../../api/signUp'

  export default {
    name: 'SignUpInfo',
    props: {
      signUpInfoVisible: {
        type: Boolean,
        default: false
      },
      choosedRowCompetitionId:{
      },
    },
    data(){
      return{
        competitionsSignUpInfos:undefined
      }
    },
    watch: {
      // 监听 addVisible 改变
      async signUpInfoVisible () {
        const data = await getSignUpInfo(this.choosedRowCompetitionId)
        this.competitionsSignUpInfos = data.data.data.competitionsSignUpInfos
      }
    },
    methods:{
      close () {
        this.$emit('changeShow', 'false')
      },
      async getSignUpInfo(){
        const data = await getSignUpInfo(this.choosedRowCompetitionId)
        this.competitionsSignUpInfos = data.data.data.competitionsSignUpInfos
      },
     async signUp(){
       this.signUpButtonDisabled=true
       const {data} = await addSignUpInfo(this.choosedRowCompetitionId)
       this.signUpButtonDisabled=false
       this.getSignUpInfo()
       this.$message({
           message:data.tip,
           type:'success'
         },
         )
      },
      async cancelSignUp(){
        await cancelSignUp(this.choosedRowCompetitionId)
        this.getSignUpInfo()
      }
    }
  }
</script>

<style scoped lang="less">
  /deep/.el-table th > .cell {
    text-align: center;
  }

  /deep/.el-table .cell {
    text-align: center;
    padding: 0px 0;
  }
</style>
