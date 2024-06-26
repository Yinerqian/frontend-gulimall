<template>
  <div class="container">
    <el-form :model="_form" ref="form" :rules="rules" style="width: 50%">
      <el-row>
        <el-col :span="10">
          <el-form-item label="登录名" prop="loginName">
            <el-input v-model.trim="_form.loginName" maxlength="100"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model.trim="_form.phone" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model.trim="_form.nickName" maxlength="100"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="20">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model.trim="_form.email" maxlength="100"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <br>
      <el-form-item>
        <el-row type="flex" justify="start" align="bottom">
          <el-button size="small" type="primary" @click="onConfirm('form')">保存更改</el-button>
          <el-button size="mini" type="danger" @click="_onWillEdit(userInfo.userId)">修改密码</el-button>
          <el-button size="mini" @click="$router.back()">返 回</el-button>
        </el-row>
      </el-form-item>
    </el-form>
    <EditProfileDialog v-model.trim="_isShowSubDialog" :primaryId="_primaryId" :readonly="_readonly" @close="_afterClose" />
  </div>

</template>

<script>
import { findByUserId, updateByUserId } from "@/api/modules/sys-user";
import { Storage } from '@/utils'

export default {
  extends: Table2form.default,
  components: {
    EditProfileDialog: (resolve) => require(["./EditProfileDialog"], resolve),
  },
  data() {
    return {
      rules: {
        loginName: [this._mustValid()],
        email: [{ pattern: /^\w{3,12}@\w{1,5}\.[a-z]{2,3}$/, message: "邮箱格式不正确", trigger: 'blur' }],
        phone: [this._mustValid()],
      },
      readonly: true,
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    userInfo() {
      return Storage.get('userInfo');
    },
  },
  methods: {
    loadData() {
      findByUserId(this.userInfo.userId).then((res) => {
        this._form = res.content;
        sessionStorage.setItem("initForm", JSON.stringify(res.content));
      });
    },
    onConfirm(formName) {
      if (JSON.stringify(this._form) === sessionStorage.getItem("initForm")) {
        this.$message("未修改信息");
        return;
      }
      this._form.userType = 1;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateByUserId(this._form).then((res) => {
            if (res.content === 1) {
              this.loadData();
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.container {
}
</style>
