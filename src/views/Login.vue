<template>
  <kinesis-container class="login-container">
    <!-- <kinesis-element :strength="-30" class="color-circle1" />
    <kinesis-element :strength="2" class="color-circle2" type="scale" />
    <kinesis-element :strength="-10" class="color-circle3" />
    <kinesis-element :strength="20" class="color-circle4" type="depth" />
    <kinesis-element :strength="-16" class="color-circle5" />
    <kinesis-element :strength="18" class="color-circle6" /> -->
    <div class="mask">
      <div class="login-wrap">
        <h2></h2>
        <el-form label-width="0px" class="login-form" ref="loginForm" :model="loginForm" :rules="rules" label-position="top">
          <el-form-item prop="userName">
            <span slot="label">
              <svg-icon class="icon" class-name="yonghu" />
              <div class="placeholder">用户名</div>
            </span>
            <label>
              <el-input class="label-input" v-model.trim="loginForm.userName" @focus="unAtive = true" @blur="unAtive = false" />
            </label>
          </el-form-item>
          <el-form-item :style="pswAtive ? 'margin-top: 60px' : 'margin-top: 40px'" prop="password">
            <span slot="label">
              <svg-icon class="icon" class-name="mima" />
              <div class="placeholder">密 码</div>
            </span>
            <label>
              <el-input class="label-input" v-model.trim="loginForm.password" show-password @focus="pswAtive = true" @blur="pswAtive = false"></el-input>
            </label>
          </el-form-item>
        </el-form>
        <el-button class="login-btn" type="primary" @click="doLogin">登 录</el-button>
      </div>
    </div>
  </kinesis-container>
</template>

<script>
import { queryUserInfo, userLogin } from "@/api/OAuth";
import { queryUserFlatPermissions } from "@/api/permission.js"
import { Storage } from '@/utils/index.js'
import SvgIcon from "@/components/svg-icon/SvgIcon";
import Vue from 'vue'
import { KinesisContainer, KinesisElement } from 'vue-kinesis'
import md5 from "js-md5"
Vue.component('kinesis-container', KinesisContainer)
Vue.component('kinesis-element', KinesisElement)
import router from "@/router";

export default {
  extends: Table2form.default,
  components: { SvgIcon },
  data() {
    return {
      loginForm: {},
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      unAtive: false,
      pswAtive: false,
    }
  },
  methods: {
    onfocus() {
      this.unAtive = true;
    },
    doLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let password = md5(md5(this.loginForm.password))
          userLogin({password, userName: this.loginForm.userName})
            .then(res => {
              Storage.set("accessToken", res.content)
              queryUserInfo().then((userRes) => {
                  Storage.set("userInfo", userRes.content)
                  Storage.set("userBtnPermissions", userRes.content.userPermissions)
                  let userMenuPermissions = []
                  queryUserFlatPermissions().then(res => {
                    if (this.$util.ToolFun.checkListLen(res.content)) {
                      res.content.forEach(item => {
                        if (this.$util.ToolFun.checkListLen(item.permissionList)) {
                          item.permissionList.forEach(ele => {
                            userMenuPermissions.push(ele.menuUrl)
                          })
                        }
                      })
                      console.log("userMenuPermissions===", userMenuPermissions)
                      if (this.$util.ToolFun.checkListLen(userMenuPermissions)) {
                        Storage.set("userMenuPermissions", userMenuPermissions);
                        console.log("Storage.getAll()====", Storage.get("userMenuPermissions"))
                        console.log("this.$router===", this.$router)
                        router.push({
                          path: "/sys-manager/user-manager"
                        })
                      }
                    } else {
                      Notification.error({
                        title: "错误",
                        message: '用户权限配置错误',
                      })
                    }
                  })
                })
            })
        }
      })
    },
  },
};
</script>

<style scoped lang="scss">
.login-container {
  width: 100vw;
  height: 100vh;
  color: #fff;
  background: url("~@/assets/bg.png");
  // background-size: 120% 120%;
  .mask {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: radial-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8));
  }
  .login-wrap {
    width: 500px;
    height: 550px;
    border: 1px solid #295ea2;
    // background-image: radial-gradient(rgba(41,94,162, .1), rgba(41,94,162, .8));
    background: rgba(41, 94, 162, 0.2);
    padding: 10px;
    margin-bottom: 0;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
    .login-form {
      width: 80%;
      margin-top: 20px;
      padding: 0 10px;
    }
    ::v-deep .el-input__inner {
      height: 42px;
      line-height: 42px;
      background: transparent;
      color: #fff;
    }
    ::v-deep .el-input__icon {
      line-height: 44px;
    }
    .login-btn {
      width: 50%;
      margin-top: 50px;
      line-height: 22px;
      font-size: 22px !important;
      border-radius: 5px;
    }
    h2 {
      width: 100%;
      height: 50px;
      margin-bottom: 35px;
      background: url("~@/assets/用户登录.png") no-repeat;
      background-position: center center;
    }
    .icon {
      font-size: 18px;
      fill: #fff;
      // position: absolute;
      // left: 0;
      // top: 0;
    }
    .placeholder {
      color: #fff;
      font-size: 16px;
      margin-left: 8px;
      display: inline-block;
    }
    // label {
    //   position: relative;
    // }
  }
}
.color-circle1,
.color-circle2,
.color-circle3,
.color-circle4,
.color-circle5,
.color-circle6 {
  position: fixed;
  border-radius: 50%;
}
.color-circle1 {
  background-color: #eaf1fa;
  width: 32vw;
  height: 32vw;
  bottom: -13vw;
  left: -16vw;
  border-radius: 50%;
}
.color-circle2 {
  border: 25px solid #f2eafa;
  width: 16vw;
  height: 16vw;
  top: 1%;
  left: 20%;
}
.color-circle3 {
  background: #faf9ea;
  width: 16vw;
  height: 16vw;
  top: 60%;
  left: 40%;
}
.color-circle4 {
  width: 0;
  height: 0;
  border: 30px solid transparent;
  border-bottom-color: #eafaf2;
  border-radius: 0;
  top: 5%;
  right: 40%;
}
.color-circle5 {
  background: #faeaea;
  width: 5vw;
  height: 5vw;
  top: 25%;
  right: 20%;
}
.color-circle6 {
  border: 15px solid #fcffe6;
  width: 10vw;
  height: 10vw;
  top: 60%;
  right: 6%;
}

::v-deep .el-form-item__error {
  // margin-left: 30px;
  margin-top: 5px;
}
::v-deep input.el-input__inner {
  border: 1px solid #dcdfe6;
    &:hover {
    border-color: #337ab7;
  }
}
::v-deep .el-form-item {
  transition: 0.2s ease-out;
}
</style>
