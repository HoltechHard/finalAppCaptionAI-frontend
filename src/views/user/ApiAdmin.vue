<template>

  <div style="width: 100%;height: 100%">
    <!--  用户列表卡片-->
    <el-card class="box-card" style="width: 100%;height: 100%">
      <div slot="header" class="clearfix">
        <span>API Admin</span>
      </div>
      <ApiRoleAdmin :apiRoleWindowVisible="apiRoleWindowVisible" @changeShow="changeShowApiRoleWindowVisible"
      :choosedRowUrl="choosedRowUrl" @getAllApi="getAllApi"></ApiRoleAdmin>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="search API：">
          <el-input clearable v-model="api" placeholder="input API"></el-input>
        </el-form-item>
        <el-form-item label="choose module：">
        <el-select v-model="module" placeholder="choose module">
          <el-option
            v-for="item in moduleOptions"
            :key="item.moduleName"
            :label="item.moduleName"
            :value="item.moduleName">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getAllApi">search</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="reset">reset</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :show-overflow-tooltip="true"
        :data="apiList"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="url"
          label="URL"
        >
        </el-table-column>
        <el-table-column
          prop="module"
          label="module"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="description"
        >
        </el-table-column>
        <el-table-column
          prop="role"
          label="role"
          >
        </el-table-column>

        <el-table-column
          :show-overflow-tooltip="true"
          label="option"
          width="140px">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" icon="el-ico-delete" @click="changeShowApiRoleWindowVisible(scope.row.url)">
              Authenticated Role
            </el-button>
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
  import { Message } from 'element-ui'
  import { getAllApi } from '../../api/userRole'
  import { getModuleOptions } from '../../api/users'
  import ApiRoleAdmin from './ApiRoleAdmin'

  export default {
    name: 'ApiAdmin',
    data () {
      return {
        api:undefined,
        module:undefined,
        moduleOptions:undefined,
        apiRoleWindowVisible: false,
        choosedRowUrl:undefined,
        choosedRowUserInfo: [],
        formInline: {
          user: '',
          region: '',
          city: '',
        },
        apiList: [],
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
      this.getAllApi()
      this.getModuleOptions()
    },
    components: {
      ApiRoleAdmin
    },

    methods: {
      //控制角色配置界面是否显示
      changeShowApiRoleWindowVisible(data){
        if (data === 'false') {
          this.apiRoleWindowVisible = false
        } else {
          this.choosedRowUrl = data
          this.apiRoleWindowVisible = true
        }
      },
      //获取所有模块名称
      async getModuleOptions(){
        const data = await getModuleOptions();
        this.moduleOptions = data.data.data.modules;
      },
      handleSizeChange (val) {
        this.size = val
        this.getAllApi()
      },
      handleCurrentChange (val) {
        this.current = val
        this.getAllApi()
      },
      async getAllApi () {
        const { data } = await getAllApi(this.api,this.module,this.current, this.size)
        this.apiList = data.data.apiList
        this.total = data.data.total
      },
      //重置表单
      async reset () {
        this.api=''
        this.module=''
        this.getAllApi()
        Message.closeAll()
        this.$message('已重置搜索条件！')
      },
    }
  }
</script>

<style scoped lang="less">

</style>
