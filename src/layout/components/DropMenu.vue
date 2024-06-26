<template>
  <div class="right-menu">
    <template v-if="userInfo && userInfo.userId">
      <span class="nickname">{{ userInfo && userInfo.nickName }}</span>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper" v-if="userInfo">
          <!-- <el-badge :value="20" :max="100" class="item" :title="`${20}条告警信息`" type="warning" :hidden="false"> -->
            <SvgIcon class-name="boy" v-if="!userInfo || userInfo.gender == 1 || !userInfo.gender" style="font-size: 35px;" />
            <SvgIcon class-name="girl" v-if="userInfo.gender == 2" style="font-size: 35px;" />
          <!-- </el-badge> -->
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="onRouter">个人信息</el-dropdown-item>
          <!-- <el-dropdown-item @click.native="onRouter">告警信息</el-dropdown-item> -->
          <el-dropdown-item divided @click.native="logout">
            <span style>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    <div v-else class="no-login">
      还未登录！
      <el-button @click="doLogout" class="logout" type="primary">登 录</el-button>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@/components/svg-icon/SvgIcon.vue";
import { Storage } from '@/utils/index.js'
import { userLogout } from "@/api/OAuth";
export default {
  name: "DropMenu",  // 框架右上角用户下拉选项菜单
  components: {
    SvgIcon,
  },
  data() {
    return {
      hasMessage: true
    };
  },
  created() {
  },
  computed: {
    userInfo() {
      return Storage.get("userInfo")
    },
  },
  methods: {
    logout() {
      this.$confirm("你确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定退出",
        cancelButtonText: "取 消",
        type: "warning",
      })
        .then(() => {
          Storage.clear()
          this.doLogout();
        })
        .catch((err) => {
          
        });
    },
    doLogout() {
      userLogout().then(res => {
        this.$router.replace({
          path: "/login",
        });
      })
    },
    onRouter() {
      this.$router.push('/sys-manager/profile-manager')
    },
  },
};
</script>

<style scoped lang="scss">
.right-menu {
  float: right;
  height: 100%;
  line-height: 32px;
  display: flex;
  align-items: center;
  .nickname {
    margin-right: 5px;
    font-size: 14px;
    color: #999;
  }

  &:focus {
    outline: none;
  }

  .right-menu-item {
    display: inline-block;
    padding: 0px 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .avatar-container {
    margin-right: 30px;

    .avatar-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      border-radius: 50%;
      width: 38px;
      height: 38px;

      .user-avatar {
        cursor: pointer;
        width: 34px;
        height: 34px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -25px;
        top: 17px;
        font-size: 16px;
      }
    }
  }

  .no-login {
    font-size: 14px;
    color: #444;
  }
  .logout {
    margin-right: 20px;
  }
}
::v-deep .el-badge__content.is-fixed {
  top: 7px;
  line-height: 15px;
  right: 8px;
  box-shadow: 0 0 7px #666;
  transition: 0.4s;
  // &:hover {
  //   box-shadow: 0 0 0px transparent;
  // }
}
</style>