<template>
  <div data-title="主页" style="height: 100%">
  <el-container class="mainContainer" >
<!--    头部布局-->
    <el-header>
<!--      logo-->
      <div class="leftBox">
      <img src="../assets/images/polytech-logo-en-big.svg">
      </div>
<!--      标题-->
      <div class="rightBox">

        <el-dropdown>
          <img src="../assets/images/Emblem-spbpu.png">
<!--          下拉菜单-->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-lock" @click.native="changeShowUpdatePassword">update password</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" @click.native="logout">logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <!--    头部布局-->
    <el-container>
      <!--      侧边栏-->
      <el-aside class="wrap" :width="isCollapse?'64px':'200px'">
        <!--        展开收起-->
        <div class="toggle_box" @click="toggleCollapse">|||</div>
        <!--        展开收起-->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="black"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"

          router
          >
          <MenuTree :menuList="this.MenuList"></MenuTree>
        </el-menu>
      </el-aside>
      <!--      侧边栏-->
      <el-container>
        <UpdatePassword :showUpdatePassword="showUpdatePassword" @changeShow="changeShowUpdatePassword"></UpdatePassword>
        <el-main >
          <router-view></router-view>
        </el-main>
        <el-footer>©SPbPU {{this.year}}</el-footer>
      </el-container>
    </el-container>
  </el-container>
  </div>
</template>

<script>
  import MenuTree from '../components/MenuTree'
  import { logout } from '../api/login'
  import { getMenuList } from '../api/users'
  import UpdatePassword from './user/updatePassword'
  export default {
    name: 'Main',
    components: { UpdatePassword, MenuTree },
    data(){
      return{
        showUpdatePassword:false,
        isCollapse:true,
        MenuList:[],
        props: ["menuList","tagList"],
        year:'',
      }
    },
    created(){
      //获取对应菜单
      this.getMenuList();
      this.nowtime();
    },
      methods: {
        //获取当前时间
        nowtime() {
          let nowDate = new Date();
          let date = {
            // 获取当前年份
            year: nowDate.getFullYear(),
          };
          this.year = date.year;
        },
        toggleCollapse(){
          this.isCollapse = !this.isCollapse;
        },
        async logout(){
          logout();
          await this.$router.push("/")
        },
        async getMenuList(){
          const result = await getMenuList();
          this.MenuList = result.data.data.menuList
        },
        changeShowUpdatePassword(data){
          if (data === 'false') {
            this.showUpdatePassword = false
          } else {
            this.showUpdatePassword = true
          }
        },
      }
  }
</script>

<style lang="less" scoped>
.wrap {
  overflow:scroll
}
.wrap::-webkit-scrollbar {
  display: none;
}

  /deep/.el-table th > .cell {
    text-align: center;
  }

  /deep/.el-table .cell {
    text-align: center;
    padding: 0px 0;
  }

  .el-menu{
    background-color: black;
    border-right: none;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

  .mainContainer{
    height: 100%;
  }
  .el-header, .el-footer {
    background-color: black;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    line-height: 60px;

    .leftBox{
      display: flex;
      align-items: center;
      img{
        width: 130px;
        height: 130px;
        padding-left: 20px;
      }
    }
    .rightBox{

      align-items: center;
      .el-dropdown>img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: white;
        display: flex;
      }
      .el-dropdown{
        display: flex;
      }
    }
  }

  .el-aside {
    background-color: black;
    color: black;

    .toggle_box{
      background-color: black;
      font-size: 15px;
      text-align: center;
      font-weight: bold;
      color: white;
      cursor: pointer;
    }
  }

  .el-main {
    background-color: #E9EEF3;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
