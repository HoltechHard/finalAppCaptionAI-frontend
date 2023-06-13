<template>
    <div style="width: 100px">
      <el-dialog :visible.sync=apiRoleWindowVisible @close="close()" @>
          <el-transfer
            v-model="rolesHasThisAuthority"
            :titles="['no authority','has authority']"
            :data="rolesList"
            :props="{
       key: 'role',
      label: 'role',
    }"
>
<!---->
          </el-transfer>
        <div slot="footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import { getAllRoles, selectRolesHasThisAuthority, updateRolesHasAuthorityById, } from '../../api/userRole'

  export default {
    name: 'ApiRoleAdmin',
    data(){
      return {
        rolesHasThisAuthority:undefined,
        confirmData:[],
        hasRoles:[],
        rolesList:[],
      }
    },
    props:{
      apiRoleWindowVisible:{
        type: Boolean,
        default: false
      },
      choosedRowUrl:{}
    },
    created(){

    },
    methods:{
      async getAllRoles(){
        const allRoles = await getAllRoles()
        this.rolesList = allRoles.data.data.roleList
      },
      close(){
        this.rolesHasThisAuthority = ""
        this.$emit('changeShow', 'false')
      },
      async confirm(){
        this.confirmData = [];
        for (let i = 0; i < this.rolesHasThisAuthority.length; i++) {
          if(this.rolesHasThisAuthority[i]!="")
            this.confirmData.push(this.rolesHasThisAuthority[i])
        }
        await updateRolesHasAuthorityById(this.choosedRowUrl,this.confirmData)
        this.$emit('getAllApi')
        this.close()
      }
    },
    watch:{
      async apiRoleWindowVisible(){
        this.getAllRoles()
        const data = await selectRolesHasThisAuthority(this.choosedRowUrl)
        this.rolesHasThisAuthority = data.data.data.rolesHasThisAuthority
      }
    }
  }
</script>

<style scoped>

</style>
