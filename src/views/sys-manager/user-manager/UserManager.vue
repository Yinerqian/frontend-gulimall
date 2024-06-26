<template>
  <div class="container">
    <vxe-toolbar>
      <template #buttons>
        <el-form class="search-bar2" title-width="120px" inline>
          <el-form-item label="账号/用户昵称">
            <el-input v-model.trim="_searchForm.keyword" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch()">查 询</el-button>
            <el-button @click="onReset(loadData)">重 置</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template #tools>
        <el-button type="primary" @click="_onWillAdd">新增用户</el-button>
      </template>
    </vxe-toolbar>
    <div class="table-style">
      <vxe-table :data="_tableList" ref="table" height="auto" :row-config="{ isHover: true }" show-header-overflow show-overflow>
        <vxe-column type="seq" width="50px" />
        <vxe-column field="loginName" title="账号"></vxe-column>
        <vxe-column field="nickName" title="用户昵称" vxe-column></vxe-column>
        <vxe-column title="用户状态" width="100" field="disabled">
          <template #default="{ row }">
            <UserStatusTag v-if="row.disabled" :value="row.disabled" />
          </template>
        </vxe-column>
        <vxe-column field="phone" title="手机号码" vxe-column></vxe-column>
        <vxe-column field="lastLoginDate" title="上次登录时间" vxe-column></vxe-column>
        <vxe-column title="操作" width="200">
          <template #default="{ row }">
            <el-link type="primary" @click="_onWillView(row.userId)">查 看</el-link>
            <span>
              <el-divider direction="vertical"></el-divider>
            </span>
            <el-link type="primary" @click="_onWillEdit(row.userId)">编 辑</el-link>
            <span>
              <el-divider direction="vertical"></el-divider>
            </span>
            <el-link type="danger" @click="onDelete(row)">删 除</el-link>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
    <el-footer class="page-footer">
      <el-pagination class="table-pagination" :current-page="_pagination.pageNum" :page-size="_pagination.pageSize" @size-change="_onPageSizeChange(arguments, loadData)" @current-change="_onPageNumchange(arguments, loadData)" :total="_pagination.total" />
    </el-footer>
    <EditUserDialog v-model.trim="_isShowSubDialog" :primaryId="_primaryId" :currentTenantId="curTenantId" :readonly="_readonly" @close="loadData(curTenantId)" />
  </div>

</template>

<script>
import { queryByPage, deleteByUserId } from "@/api/modules/sys-user";
import UserStatusTag from "@/views/components/UserStatusTag";

export default {
  name: "UserManager",
  extends: Table2form.default,
  components: {
    EditUserDialog: (resolve) => require(["./EditUserDialog"], resolve),
    UserStatusTag,
  },
  data() {
    return {
      pageListApi: queryByPage,
      delRowApi: deleteByUserId,
      tenantName: "",
      tenantList: [],
      curTenantId: 0,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    onSearch() {
      this._loadData().then((res) => {
        // 如果还有其他操作,可以继续.then, res就是pageListApi返回的东西
      });
    },
    loadData(tenantId) {
      this._loadData().then((res) => {
        // 如果还有其他操作,可以继续.then, res就是pageListApi返回的东西
        this._tableList = res.content.list;
      });
    },
    onReset() {
      this._pagination.pageNum = 1; // 分页变回1
      this._searchForm.keyword = null
      // this._searchForm.keyword = null; // 查询条件清空
      this._loadData().then((res) => {
        // 如果还有其他操作,可以继续.then, res就是pageListApi返回的东西
      });
    },

    onDelete(row) {
      this._onDelete(row.userId, row.loginName).then(
        (res) => {
          this.loadData(this.curTenantId);
        }
      );
    },
    /**
     *  密码重置
     * @param userId
     */
    resetPassword(userId) {
      this.$confirm("此操作将对密码进行重置, 是否继续?", "提示", {
        confirmButtonText: "确定重置",
        cancelButtonText: "取 消",
        type: "warning",
      })
        .then(() => {
          resetPassword(userId).then((res) => {
            this.$message({
              type: "success",
              message: "密码重置成功!",
            });
          });
        })
        .catch(() => { });
    },
  },
};
</script>

<style scoped lang="scss">
.tenant-list {
  .title {
    font-size: 14px;
    color: #333;
    line-height: 32px;
    padding: 3px 10px;
    // margin-bottom: 8px;
    cursor: pointer;
    border-bottom: 1px solid #f2f2f2;
    border-left: 2px solid transparent;
    &:hover {
      background: #f8fafb;
    }
  }
  .active-title {
    color: #1a94f7;
    font-weight: 600;
    border-left: 2px solid #1a94f7;
    background: #f8fafb;
    font-size: 16px;
  }
}
.el-aside {
  margin-bottom: 0px;
}
::v-deep .custom-tree-node {
  width: 100%;
  &:hover {
    .action-wrap {
      opacity: 1;
    }
  }
  .action-wrap {
    opacity: 0.1;
    margin-left: 100px;
    .el-link {
      line-height: 16px;
    }
  }
}

::v-deep .el-tree-node__content {
  height: 34px;
  border-left: 2px solid transparent;
}

::v-deep .el-tree-node:focus {
  & > .el-tree-node__content {
    border-left: 2px solid #1a94f7;
  }
}
</style>
