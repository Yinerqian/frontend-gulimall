<template>
  <el-dialog v-dialogDrag id="permission-select-container" title="权限选择" width="50%" :visible="_visible" @close="_onCloseDialog" append-to-body>
    <el-card class="permission-card" shadow="never" v-for="group in permissionList" :key="group.groupId">
      <div slot="header">
        <span class="permission-title">{{group.groupName}}</span>
      </div>
      <el-col :span="8" v-for="permission in group.permissionList" :key="permission.permissionId" class="permission-col">
        <el-card shadow="hover">
          <el-tooltip effect="dark" :content="permission.permissionName" :disabled="permission.permissionName.length < 11" placement="top">
            <span class="permission-content">
              <el-checkbox v-model.trim="permission.checked" :key="permission.permissionCode" @change="changeSelectStatus(permission)" style="margin-right: 5px" />
                {{permission.permissionName}}
            </span>
          </el-tooltip>
        </el-card>
      </el-col>
    </el-card>
    <div slot="footer">
      <el-row type="flex" :gutter="20" justify="center">
        <el-button @click="onConfirm" v-if="!readonly" type="primary">确定保存</el-button>
        <el-button @click="_onCloseDialog">关 闭</el-button>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import { listPermissions } from "@/api/modules/sys-permission";

export default {
  name: "PermissionListRelDialog",
  extends: Table2form.default,
  props: {
    _visible: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    subForm: {
      type: Array,
      default: function () {
        // 默认值必须为函数，但是返回数组或对象
        return [];
      },
    },
  },
  model: {
    prop: "_visible",
    event: "_display",
  },
  data() {
    return {
      permissionList: [],
    };
  },

  watch: {
    _visible(bool) {
      if (bool) {
        this.loadData();
      }
    },
  },

  methods: {
    loadData() {
      this.$set(this._form, "permissionList", this.subForm);
      this.loadAllPermissionList();
    },
    loadAllPermissionList() {
      listPermissions().then((data) => {
        console.log(data,"data");
        // 遍历数据设置已经选择的权限
        let selectedMenu = this.subForm.map(item => {
          return item.permissionId;
        })
        data.content.forEach(group => {
          group.permissionList.forEach(permission => {
            if (selectedMenu.indexOf(permission.permissionId) >= 0) {
              permission.checked = true
            } else {
              permission.checked = false
            }
          })
        })
        this.permissionList = data.content
      });
    },
    changeSelectStatus(permission) {
    },
    onConfirm() {
      // 确定之后将数据发送到父组件中
      let selectPermission = []
      this.permissionList.forEach(group => {
        group.permissionList.forEach(permission => {
          if (permission.checked) {
            selectPermission.push(permission)
          }
        })
      })
      this.$emit("confirmEntity", selectPermission);
      this._onCloseDialog();
    },
  },
};
</script>

<style scoped lang="scss">
#permission-select-container {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  .permission-card {
    margin: 0 20px 20px 20px;
    border-width: 2px;

    .el-card__header {
      background: #f6faff;
      padding: 15px 20px;
    }

    .el-card__header div {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .el-button--text {
        padding: 0;
      }
    }

    .el-card__body {
      padding-right: 0 !important;
    }

    .permission-title {
      font-weight: 600;
    }
  }

  .permission-col {
    margin-bottom: 20px;
    padding-right: 20px;
    position: relative;

    .el-card__body {
      height: 74px;
      padding: 20px 10px !important;
      display: flex;
      align-items: center;
    }

    .permission-option {
      position: absolute;
      bottom: -5px;
      right: 25px;
      z-index: 100;
    }

    .permission-tag {
      position: absolute;
      top: 0;
      right: 30px;
      height: 60px;
      z-index: 99;

      div {
        color: white;
        font-size: 12px;
        transform: scale(0.8);
        position: relative;
        top: 3px;
      }
    }

    .MENU {
      background: white url("~@/assets/permission/menu-tag.png") top left
        no-repeat;
    }

    .OP {
      background: white url("~@/assets/permission/op-tag.png") top left
        no-repeat;
    }

    .permission-add-content {
      span {
        font-size: 12px;
      }

      .el-icon-plus {
        font-size: 14px;
        font-weight: 700;
      }

      color: #409eff;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      height: 44px;
      margin: 0 auto;
    }

    .permission-add-button {
      border: 1px dashed #409eff;
    }
  }

  .permission-content {
    font-size: 14px;
    width: 100%;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    z-index: 100;
    text-align: left;
  }

  .permission-not-content {
    margin: auto;
  }
}
</style>
