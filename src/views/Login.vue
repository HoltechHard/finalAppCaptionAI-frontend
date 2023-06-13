<template>
<!--  登录容器-->
    <div class="login_container">
  <div class="login_box" :style="{width:this.pageInnerWidth>500?'500px':'90%'}">
<!--头像-->
    <div class="avatar_box">
    <img src="../assets/images/Emblem-spbpu.png">
    </div>
    <!--    表单-->
    <div>
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="loginForm">
        <el-form-item>
          <div style="text-align: center">
            <p style="font-size: 20px;font-weight: bold">SPbPU AI</p>
          </div>
        </el-form-item>
        <el-form-item label="" prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('loginForm')" @keyup.enter="login('loginForm')" style="width: 100%">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
    </div>
  </div>
</template>

<script>
  import { login } from '../api/login'
  import { getAllUsers } from '../api/users'

  export default {
    name: 'Login',
    data() {
      return {
        loginResult: {
          isSuccess:false
        },
        loginForm: {
          username:null,
          password:null
        },
        loginRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { max: 5, message: '', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
              // pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
              max: 16,
              trigger: 'blur'
            }
          ]
        },
        pageInnerWidth:'500px',
      };
    },
    created () {
      this.getInnerWidth()
    },

    methods: {
      getInnerWidth(){
        this.pageInnerWidth = window.innerWidth
      },
     async login() {
        const loginResult = await login(this.loginForm.username, this.loginForm.password);
        this.loginResult.isSuccess = loginResult.data.isSuccess
            if (this.loginResult.isSuccess === true) {
              await this.$router.push("/welcome")
            } else {
              this.$message(loginResult.data.message)
              return false;
            };
      },
    }
  }

</script>

<style lang="less" scoped>

  .login_container {
    height: 100%;
    /*border: 1px solid red;*/
    background-color: black;
  }

    .login_box{
      //width: 500px;
      height: 350px;
      /*background-color: white;*/
      border-radius: 3px;
      /*border: 2px solid green;*/
      margin: auto;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      background-color: white;

      .avatar_box{
        background-color: white;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 5rem;
        height: 5rem;
        font-size: 16px;
        border-radius: 50%;
        /*border:1px solid gray;*/
        overflow: hidden;
        padding: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: white;
        }
      }

      .loginForm{
        position: absolute;
        bottom: 0px;
        width: 100%;
        box-sizing: border-box;
        /*border: 1px gray solid;*/
        padding: 20px;
      }
    }
</style>
