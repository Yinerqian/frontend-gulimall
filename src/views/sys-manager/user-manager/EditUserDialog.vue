<template>
  <el-dialog v-dialogDrag  :title="_getFormTitle('用户', primaryId, readonly)" :visible="_visible" @close="_onCloseDialog" @opened="onOpened">
    <el-form label-width="100px" :model="_form" :disabled="readonly" ref="form" :rules="rules" v-loading="_formLoading">
      <el-row>
        <el-col :span="24">
          <el-form-item label="账号" prop="loginName">
            <el-input :maxlength="100" v-model.trim="_form.loginName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="用户昵称" prop="nickName">
            <el-input :maxlength="100" v-model.trim="_form.nickName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="手机号" prop="phone">
            <el-input :maxlength="50" v-model.trim="_form.phone" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="邮箱" prop="email">
            <el-input :maxlength="100" v-model.trim="_form.email" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="有效期" prop="expired">
            <el-date-picker
                v-model="_form.expired"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="用户状态" prop="disabled">
            <el-radio v-model.trim="_form.disabled" label="0">启用</el-radio>
            <el-radio v-model.trim="_form.disabled" label="1">禁用</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="关联角色">
            <div v-if="!readonly">
              <el-button type="primary" @click="
                                  _isShowSubDialog = true
                                  _readonly = false
                                  _primaryId = ''
                                  subForm = []">添加角色</el-button>
            </div>
            <el-table :data="_form.roleList" style="margin-top: 15px;" height="200px">
              <el-table-column type="index" :index="_tableIndex" label="#" width="50" />
              <el-table-column prop="roleName" label="角色名称" />
              <el-table-column fixed="right" label="操作" width="120" v-if="!readonly">
                <template slot-scope="scope">
                  <el-link type="danger" @click="onDelete(scope.$index)">移 除</el-link>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div slot="footer">
      <el-row type="flex" :gutter="20" justify="center">
        <el-button @click="onConfirm" v-if="!readonly" type="primary">确定保存</el-button>
        <el-button @click="_onCloseDialog">关 闭</el-button>
      </el-row>
    </div>

    <RoleListRelDialog v-model.trim="_isShowSubDialog" :primaryId="_primaryId" :subForm="_form.roleList" :readonly="_readonly" @confirmEntity="onConfirmEntity" />
  </el-dialog>
</template>

<script>
import { findByUserId, saveUserInfo, updateByUserId } from "@/api/modules/sys-user";
import RoleListRelDialog from "./RoleListRelDialog";

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
    currentTenantId: {
      type: Number,
    },
    primaryId: [String, Number],
  },
  components: {
    RoleListRelDialog,
  },
  data() {
    return {
      updateRowApi: updateByUserId,
      createRowApi: saveUserInfo,
      getRowApi: findByUserId,
      value: '',
      rules: {
        loginName: [this._mustValid()],
        nickName: [this._mustValid()],
      },
      subForm: [],
    };
  },
  methods: {
    onOpened() {
      this._loadDialogForm(this.primaryId, {
        userId: this.primaryId,
      }).then((res) => {
        // 有其他操作继续.then, 返回的res就是详情接口的res, 如果是新增res是空对象
        this._form = res.content;
        // this.$set(this._form, "roleList", res.content.roleList);
      });
      // 用户状态初始化
      this.$set(this._form, "disabled", "0");
    },
    /**
     *  监听子页面传入的数据
     * @param roleList
     */
    onConfirmEntity(roleList) {
      this._form.roleList = roleList;
    },

    /**
          新增/修改 确定按钮
         */
    onConfirm() {
      this._form.currentTenantId = this.currentTenantId;
      this._form.userType = 1; // 用户类型，0-管理员 1-普通用户 2-开发者
      this._onSubmitForm(this.primaryId, this.readonly, this._form)
        .then((res) => { })
        .catch((err) => {
          if (!err.response.data.successFlag) {
            // 拦截器已提示 不用额外处理
          }
        });
    },
    onDelete(index) {
      this._form.roleList.splice(index, 1);
    },
    disablePastDates(date) {
      const now = new Date();
      return date <= now;
    }
  },
};
</script>
<style scoped lang="scss"></style>
