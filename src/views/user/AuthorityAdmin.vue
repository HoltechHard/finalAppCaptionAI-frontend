<template>
    <div style="width: 100px">
      <el-dialog :visible.sync=showDialog @close="close()">
          <el-transfer
            v-model="hasRoles"
            :titles="['not has','has roles']"
            :data="rolesList"
            :props="{
       key: 'role',
      label: 'role',
    }"
>
<!---->
          </el-transfer>
        <div slot="footer">
          <el-button @click="close">cacel</el-button>
          <el-button type="primary" @click="confirm">confirm</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import { getAllRoles, getRolesById, updateRolesById, } from '../../api/userRole'

  export default {
    name: 'AuthorityAdmin',
    data(){
      return {
        confirmData:[],
        hasRoles:[],
        showDialog: false,
        rolesList:[],
      }
    },
    props:{
      authorityVisible:{
        type: Boolean,
        default: false
      },
      choosedRowUserInfo:{

      }
    },
    created(){
      this.getAllRoles();
    },
    methods:{
      async getAllRoles(){
        const allRoles = await getAllRoles()
        this.rolesList = allRoles.data.data.roleList
      },
      close(){
        this.$emit('changeShow', 'false')
      },
      async confirm(){
        this.confirmData = [];
        for (let i = 0; i < this.hasRoles.length; i++) {
          if(this.hasRoles[i]!="")
            this.confirmData.push(this.hasRoles[i])
        }
        await updateRolesById(this.choosedRowUserInfo.id,this.confirmData)
        this.close()
      }
    },
    watch:{
      async authorityVisible(){
        this.showDialog = this.authorityVisible;
        const hasRoles = await getRolesById(this.choosedRowUserInfo.id)
        this.hasRoles = hasRoles.data.data.rolesList
      }
    }
  }
</script>

<style scoped>

</style>
