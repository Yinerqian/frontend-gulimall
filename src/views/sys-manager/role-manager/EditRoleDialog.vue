<template>
  <el-dialog v-dialogDrag :title="_getFormTitle('角色', primaryId, readonly)" class="role_dialog" :visible="_visible" @open="onOpen" @opened="onOpened" @close="_onCloseDialog" width="60%">
    <el-form label-width="100px" :model="_form" :disabled="readonly" ref="form" :rules="rules" v-loading="_formLoading">
      <el-row>
        <el-col :span="12">
          <el-form-item label="角色名称" prop="roleName">
            <el-input :maxlength="100" v-model.trim="_form.roleName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="角色编码" prop="roleCode">
            <el-input :maxlength="100" v-model.trim="_form.roleCode" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-tabs v-model.trim="activeName" class="role-tabs" type="border-card">
        <el-tab-pane label="关联权限" name="first">
          <el-header class="role-tab-header" v-if="!readonly">
            <el-button type="primary" @click="_isShowSubDialog = true
                            _readonly = false
                            _primaryId = ''
                            subForm = []">添加权限
            </el-button>
          </el-header>
          <el-main :class="!readonly ? 'role-tab-add-main' : 'role-tab-main'">
            <vxe-table :data="_form.permissionList" height="100%" show-header-overflow show-overflow>
              <vxe-column type="seq" width="50px" />
              <vxe-column field="permissionName" title="权限名称" align="left"/>
              <vxe-column field="permissionCode" title="权限编码" align="left"/>
              <vxe-column field="permissionTypeName" title="权限类型">
                <template #default="{ row }">
                  <el-tag :type="row.permissionType == 'MENU' ? '' : 'warning' ">{{row.permissionType == 'MENU' ? '菜单' : '操作'}}</el-tag>
                </template>
              </vxe-column>
              <vxe-column field="menuUrl" title="菜单URL" align="left"/>
              <vxe-column title="操作" width="120" v-if="!readonly">
                <template #default="{ row }">
                  <el-link type="danger" @click="onDelete(row.$index)">移 除</el-link>
                </template>
              </vxe-column>
            </vxe-table>
          </el-main>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div slot="footer">
      <el-row type="flex" :gutter="20" justify="center">
        <el-button @click="onConfirm" v-if="!readonly" type="primary">确定保存</el-button>
        <el-button @click="_onCloseDialog">关 闭</el-button>
      </el-row>
    </div>
    <PermissionListRelDialog v-model.trim="_isShowSubDialog" :primaryId="primaryId" :subForm="_form.permissionList" :readonly="_readonly" @confirmEntity="onConfirmEntity" />
  </el-dialog>
</template>

<script>
import {
  saveRoleInfo,
  updateByRoleId,
  findAllByRoleId,
} from "@/api/modules/sys-role";
import PermissionListRelDialog from "./PermissionListRelDialog";

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
    appArray: {
      type: Array,
      default: function () {
        // 默认值必须为函数，但是返回数组或对象
        return [];
      },
    },
  },
  components: {
    PermissionListRelDialog,
  },
  data() {
    return {
      updateRowApi: updateByRoleId,
      createRowApi: saveRoleInfo,
      getRowApi: findAllByRoleId,
      rules: {
        roleName: [this._mustValid()],
        roleCode: [this._mustValid()],
      },
      loading: false,
      subForm: [],
      activeName: "first", // 默认打开 用户关联tab
      appList: [], // 用户编辑时 查询回显
    };
  },
  methods: {
    onOpen() {
      this.activeName = "first";
    },
    onOpened() {
      this._form = {};
      let params = { roleId: this.primaryId };
      this._loadDialogForm(this.primaryId, params).then((res) => {
        // 有其他操作继续.then, 返回的res就是详情接口的res, 如果是新增res是空对象
        this._form = res.content;
        this.$set(this._form, "permissionList", res.content.permissionList);
      });
    },
    onConfirmEntity(permissionList) {
      this._form.permissionList = permissionList;
    },
    onConfirm() {
      this._onSubmitForm(this.primaryId, this.readonly, {
      }).then((res) => {
        if (res.successFlag) {
          this._form = {};
        } else {
          this._form = {};
          this.$message.error(res.message);
        }
      });
    },
    onDelete(index) {
      this._form.permissionList.splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
.role_dialog {
  .el-dialog__body {
    padding: 20px !important;
  }
  .role-tabs {
    height: 50vh;
    box-shadow: none;
    -webkit-box-shadow: none;
    .el-tabs__content {
      height: calc(100% - 39px);
      .el-tab-pane {
        height: 100%;
      }
    }
    .role-tab-header {
      height: 45px !important;
    }
    .role-tab-add-main {
      height: calc(100% - 45px) !important;
    }
    .role-tab-main {
      height: 100% !important;
    }
    .role-tab-container {
      margin: 0 !important;
      height: 100%;
      .app-tree-aside {
        padding: 0 !important;
        margin-right: 15px !important;
      }
      .role-tab-app-main {
        .el-card__body {
          padding: 20px 0 0 20px !important;
        }
        .el-checkbox {
          margin: 0 20px 20px 0 !important;
        }
      }
      .active-title {
        font-size: 14px;
      }
    }
  }
  .role-box-card {
    margin: 10px 1px 0 0;
    .el-card__header {
      background: #f6faff;
      padding: 12px 20px;
    }
  }
  .role-box-card:nth-child(1) {
    margin-top: 0 !important;
  }
  .role-not-content {
    margin: auto;
  }
}
</style>
