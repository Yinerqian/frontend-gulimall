<template>
    <el-container id="permission-container" class="container">
    <el-container class="tree-container">
      <el-header class="tree-header">
        <el-button type="primary" @click="onAddGroup">新增权限分组</el-button>
      </el-header>
      <Empty v-if="!_tableList || _tableList.length == 0" class="permission-not-content" />
      <el-main v-else>
        <el-card class="permission-card" shadow="never" v-for="group in _tableList" :key="group.groupId" @mouseenter.native="groupMouseenter(group.groupId)" @mouseleave.native="groupMouseleave">
          <div slot="header">
            <div style="display: flex">
              <span class="permission-title">{{group.groupName}}</span>
<!--              <span style="align-self: end; margin-left: 10px; font-size: 12px">{{group.sort || 0}}</span>-->
            </div>
            <div v-show="group.groupId == groupOptionId">
              <el-button type="text" size="medium" @click="onGroupEdit(group.groupId)">编辑分组</el-button>
              <el-button type="text" size="medium" @click="onGroupDelete(group.groupId, group.groupName)">删除分组</el-button>
            </div>
          </div>
          <el-col :span="4" v-for="permission in group.permissionList" :key="permission.permissionId" class="permission-col" @mouseenter.native="permissionMouseenter(permission.permissionId)" @mouseleave.native="permissionMouseleave">
            <el-card shadow="hover">
              <span class="permission-content">{{permission.permissionName}}</span>
            </el-card>
            <div class="permission-option" v-show="permission.permissionId == permissionOptionId">
              <el-button type="text" size="medium" icon="el-icon-edit" @click="_onWillEdit(permission.permissionId)"></el-button>
              <el-button type="text" size="medium" icon="el-icon-delete" @click="_onDelete(permission.permissionId, permission.permissionName)"></el-button>
            </div>
            <div v-if="permission.permissionType" :class="permission.permissionType + ' permission-tag'">
              <div>{{permission.permissionTypeName}}</div>
            </div>
          </el-col>
          <el-col :span="4" class="permission-col">
            <el-card shadow="hover" @click.native="onAddPermission(group.groupId)" class="permission-add-button">
              <div class="permission-add-content">
                <i class="el-icon-plus"></i>
                <span>新增权限</span>
              </div>
            </el-card>
          </el-col>
        </el-card>
      </el-main>
    </el-container>

    <EditPermissionGroupDialog v-model.trim="isShowGroupDialog" :groupId="_searchForm.groupId" :groupList="_tableList" :readonly="_readonly" @close="_afterClose" />
    <EditPermissionDialog v-model.trim="_isShowSubDialog" :groupId="_searchForm.groupId" :primaryId="_primaryId" :readonly="_readonly" @close="_afterClose" />
  </el-container>
</template>

<script>
import {
  listPermissions,
  findByGroupId,
  deleteByPermissionGroupId,
  deleteByPermissionId,
} from "@/api/modules/sys-permission";

export default {
  extends: Table2form.default,
  components: {
    EditPermissionDialog: (resolve) =>
      require(["./EditPermissionDialog"], resolve),
    EditPermissionGroupDialog: (resolve) =>
      require(["./EditPermissionGroupDialog"], resolve),
    Empty: (resolve) =>
      require(["@/components/Empty"], resolve),
  },
  created() {
    this._searchForm.isNotPage = true;
    this._loadData()
  },
  data() {
    return {
      groupOptionId: null,
      permissionOptionId: null,
      isShowGroupDialog: false,
      pageListApi: listPermissions,
      delRowApi: deleteByPermissionId,
    };
  },
  methods: {
    onAddGroup() {
      this._searchForm.groupId = null;
      this._readonly = false;
      this.isShowGroupDialog = true;
    },
    onGroupEdit(groupId) {
      this._searchForm.groupId = groupId;
      this.isShowGroupDialog = true;
      this._readonly = false;
    },
    onGroupDelete(groupId, keyName, msg = '你确定删除这一行数据吗？') {
      if (keyName) {
        msg = `你确定删除 <strong style="text-decoration:underline;font-size:15px">${keyName}</strong> 吗？`
      }
      this.$confirm(msg, "确认信息", {
        dangerouslyUseHTMLString: true,
        distinguishCancelAndClose: true,
        confirmButtonText: '确定删除',
        cancelButtonText: '取 消',
        type: "warning",
      }).then(() => {
        findByGroupId(groupId).then(res => {
          findByGroupId(groupId).then(res => {
            if (res.content && res.content.length > 0) {
              this.$notify({
                title: '警告',
                message: '该分组下还有权限，无法删除',
                type: 'warning'
              });
            } else {
              deleteByPermissionGroupId(groupId).then((res) => {
                if (res.successFlag) {
                  this._loadData();
                }
              });
            }
          })
        })
      });
    },
    onAddPermission(groupId) {
      this._searchForm.groupId = groupId;
      this._isShowSubDialog = true;
      this._readonly = false;
      this._primaryId = "";
    },
    groupMouseenter(groupId) {
      this.groupOptionId = groupId;
    },
    groupMouseleave() {
      this.groupOptionId = null;
    },
    permissionMouseenter(permissionId) {
      this.permissionOptionId = permissionId;
    },
    permissionMouseleave() {
      this.permissionOptionId = null;
    },
  },
};
</script>

<style lang="scss">
#permission-container {
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
  }
  .permission-not-content {
    margin: auto;
  }
}
</style>
