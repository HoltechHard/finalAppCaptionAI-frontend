<template>

  <div style="width: 100%;height: 100%">
    <!--  用户列表卡片-->
    <el-card class="box-card" style="width: 100%;height: 100%">
      <div slot="header" class="clearfix">
        <span>User List</span>
      </div>
      <el-form :inline="true" :model="users" class="demo-form-inline">
        <el-form-item label="ID：">
          <el-input clearable v-model="users.username" placeholder="请输入ID">请输入用户名</el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getAllUsersNormalInfo">查询</el-button>
          <el-button type="info" icon="el-icon-refresh" @click="resetUsers">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :show-overflow-tooltip="true"
        :data="usersList"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="60px">
        </el-table-column>
        <el-table-column
          prop="username"
          label="ID"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="joinDate"
          label="创建时间"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import { getAllUsers, getAllUsersNormalInfo, isForbiddenUserById } from '../../api/users'
  import insertUser from '../../views/user/insertUser'
  import { getAllVocations } from '../../api/vocations'
  import { Message } from 'element-ui'
  import UpdateUser from './UpdateUser'
  import AuthorityAdmin from './AuthorityAdmin'
  import AddOrMinusPoints from './AddOrMinusPoints'

  export default {
    name: 'Users',
    data () {
      return {
        addOrMinusPointsWindowVisable:false,
        updateVisible: false,
        addVisible: false,
        authorityVisible:false,
        choosedUserId:undefined,
        choosedUsername:undefined,
        choosedRowUserInfo: [],
        usersList: [],
        current: 1,
        total: undefined,
        size: 10,
        users: {
          username: '',
          department: '',
          vocation: '',
        },

        allVocationsList: undefined,
        vocation: '',
      }
    },

    /**
     * 创建组件时调用
     */
    created () {
      this.getAllUsersNormalInfo()
    },
    components: {
      AddOrMinusPoints,
      AuthorityAdmin,
      UpdateUser,
      insertUser
    },

    methods: {
      //控制奖惩积分界面是否显示
      showAddOrMinusPointsWindowVisable(data){
        if (data === 'false') {
          this.addOrMinusPointsWindowVisable = false
        } else {
          this.choosedUserId = data.id
          this.choosedUsername = data.username
          this.addOrMinusPointsWindowVisable = true
        }
      },
      async isForbiddenUserById(id,isForbidden){
        await isForbiddenUserById(id,isForbidden);
        await this.getAllUsersNormalInfo();
      },
      showAuthorityWindow (data) {
        this.authorityVisible = true
        this.choosedRowUserInfo = data
      },
      closeAuthorityWindow(data){
        if (data === 'false') {
          this.authorityVisible = false
        } else {
          this.authorityVisible = true
        }
      },
      //获取全部职业
      async getAllVocations () {
        const { data } = await getAllVocations()
        this.allVocationsList = data.data.allVocationsList
      },
      //悬浮窗提示
      message (tip) {
        this.$message(tip)
      }
      ,
      // 监听 子组件弹窗关闭后触发，有子组件调用
      showAdd (data) {
        if (data === 'false') {
          this.addVisible = false
        } else {
          this.addVisible = true
        }
        this.getAllUsersNormalInfo()
      },
      handleSizeChange (val) {
        this.size = val
        this.getAllUsersNormalInfo()
      },
      handleCurrentChange (val) {
        this.current = val
        this.getAllUsersNormalInfo()
      },
      async getAllUsersNormalInfo () {
        const users = JSON.stringify(this.users)
        const { data } = await getAllUsersNormalInfo(this.current, this.size, users)
        this.usersList = data.data.records
        this.total = data.data.total
      },
      //重置表单
      async resetUsers () {
        this.users.username = ''
        this.users.department = ''
        this.users.vocation = ''
        this.getAllUsersNormalInfo()
        Message.closeAll()
        this.message('已重置搜索条件！')
      },
    }
  }
</script>

<style scoped lang="less">

</style>
