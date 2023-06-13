<template>
    <div style="width: 100px">
      <el-dialog :visible.sync=addOrMinusPointsWindowVisable @close="close()" :title="choosedUsername">
<el-form ref="elForm" :model="formData" :rules="rules" label-position="right">
  <el-form-item label="请选择奖励或扣除：" prop="addOrMinus">
        <el-select v-model="formData.addOrMinus" placeholder="请选择奖励或扣除">
          <el-option
            label="奖励积分"
            value="1">
          </el-option>
          <el-option
            label="扣除积分"
            value="2">
          </el-option>
        </el-select>
  </el-form-item>
  <el-form-item label="积分数：" prop="points">
    <el-input v-model="formData.points" placeholder="请输入增加或扣除的积分数" clearable :style="{width: '100%'}">
    </el-input>
  </el-form-item>
  <el-form-item label="原因：" prop="reason">
    <el-input v-model="formData.reason"  placeholder="请输入更改积分原因" clearable :style="{width: ''}">
    </el-input>
  </el-form-item>
</el-form>
        <div slot="footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import { getPlans } from '../../api/training'
  import { insertPointsRecordById } from '../../api/users'
  export default {
    name: 'AddOrMinusPoints',
    data(){
      return {
        formData:{
          addOrMinus: undefined,
          points: undefined,
          reason: undefined,
        },
        rules: {
          points: [{
            required: true,
            pattern: "^[0-9]*$",
            message: '请输入数字',
            trigger: 'change'
          }],
        }
      }
    },
    props:{
      addOrMinusPointsWindowVisable:{
        type: Boolean,
        default: false
      },
      choosedUserId:undefined,
      choosedUsername:undefined
    },
    created(){
      this.getPlans()
    },
    methods:{
      close(){
        this.$emit('changeShow', 'false')
      },
      async insertPointsRecordById(){
        await insertPointsRecordById(this.choosedUserId,this.formData.reason,this.formData.addOrMinus,this.formData.points)
      },
      async confirm(){
        this.$refs['elForm'].validate(valid => {
          if (!valid) return;
          this.insertPointsRecordById()
          this.$emit('getWeekPlan')
        this.close()
        })
      },
      //获取所有可选计划
      async getPlans(){
        const data = await getPlans();
        this.planList = data.data.data.planList;
      },
    },
    watch:{
      }
  }
</script>

<style scoped>

</style>
