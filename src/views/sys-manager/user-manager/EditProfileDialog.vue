<template>
  <el-dialog v-dialogDrag  title="修改密码" :visible="_visible" @open="onOpen" @close="_onCloseDialog" @closed="onClosed" width="300px">
    <el-form v-if="isPwdSwitch" label-width="90px" :model="_form" :disabled="readonly" ref="form" :rules="rules" v-loading="_formLoading">
      <el-row>
        <el-col :span="24">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input :maxlength="100" v-model.trim="_form.oldPassword" show-password />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="新密码" prop="newPassword">
            <el-input :maxlength="100" v-model.trim="_form.newPassword" show-password />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input :maxlength="100" v-model.trim="_form.checkPassword" show-password />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-row type="flex" :gutter="20" justify="center">
        <el-button @click="onConfirm('form')" type="primary">确定保存</el-button>
        <el-button @click="_onCloseDialog">关 闭</el-button>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import { updatePassword } from "@/api/modules/sys-user";
import { Storage } from '@/utils'
import { userLogout } from "@/api/OAuth";

export default {
  extends: Table2form.default,
  model: {
    prop: "_visible", //v-model 接受的值就是 显示与隐藏
    event: "_display",
  },
  props: {
    _visible: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    primaryId: [String, Number],
  },
  components: {},
  data() {
    var validatePass = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this._form.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      updateRowApi: updatePassword,
      isPwdSwitch: false,
      rules: {
        oldPassword: [this._mustValid()],
        newPassword: [this._mustValid()],
        checkPassword: [
          { validator: validatePass, trigger: "blur" },
          this._mustValid(),
        ],
      },
    };
  },
  computed: {
    userInfo() {
      return Storage.get('userInfo')
    },
  },
  methods: {
    onConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let userId = this.userInfo.userId;
          this._form.userId = userId
          updatePassword(this._form).then((res) => {
            if (res.successFlag) {
              this._onCloseDialog();
              this.$message({
                type: "success",
                message: "密码修改成功，请重新登录",
              });
              setTimeout(() => {
                this.$router.push({
                  path: "/home",
                });
                Storage.clear();
                Storage.session.clear();
                userLogout().then(res => {
                  this.$router.replace({
                    path: "/login",
                  });
                })
              }, 3000);
            } else {
              this.$message({
                type: "error",
                message: res.message,
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    onOpen() {
      this.isPwdSwitch = true;
    },
    onClosed() {
      this.isPwdSwitch = false;
    },

  },
};
</script>

<style scoped lang="scss"></style>
