<template>

  <div style="width: 100%;height: 100%">
    <!--  用户列表卡片-->
    <el-card class="box-card" style="width: 100%;height: 100%">
      <div slot="header" class="clearfix">
        <span>Role Admin</span>
      </div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input clearable v-model="role" placeholder="input role"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getallRolesPageList">search</el-button>
          <el-button type="info" icon="el-icon-refresh" @click="addRole">add</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :show-overflow-tooltip="true"
        :data="rolesList"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="index"
          width="60px">
        </el-table-column>
        <el-table-column
          prop="role"
          label="ID"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="option"
          width="100px">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" icon="el-ico-edit" @click="disabledRole(scope.row.id)">forbidden</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import { getAllVocations } from '../../api/vocations'
  import { Message } from 'element-ui'
  import { addRole, disabledRole, getAllRoles, getAllRolesPageList } from '../../api/userRole'

  export default {
    name: 'Users',
    data () {
      return {
        role:'',
        updateVisible: false,
        addVisible: false,
        authorityVisible:false,
        choosedRowUserInfo: [],
        formInline: {
          user: '',
          region: '',
          city: '',
        },
        rolesList: [],
        current: 1,
        total: undefined,
        size: 5,

        allVocationsList: undefined,
        vocation: '',
      }
    },

    /**
     * 创建组件时调用
     */
    created () {
      this.getallRolesPageList()
    },
    components: {
    },

    methods: {
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
      //悬浮窗提示
      message (tip) {
        this.$message(tip)
      }
      ,
      handleSizeChange (val) {
        this.size = val
        this.getallRolesPageList()
      },
      handleCurrentChange (val) {
        this.current = val
        this.getallRolesPageList()
      },
      async getallRolesPageList () {
        const { data } = await getAllRolesPageList(this.role,this.current, this.size)
        this.rolesList = data.data.rolesList
        this.total = data.data.total
      },
      async addRole(){
        if(this.role !=null&&"") {
          await addRole(this.role)
          this.role = ''
          await this.getallRolesPageList()
          this.$message("completed")
        }else {
          this.$message("input role name")
        }
      },

      async disabledRole(ID){
        await disabledRole(ID)
        this.$message("this role is forbidden")
      }
    }
  }
</script>

<style scoped lang="less">

</style>
