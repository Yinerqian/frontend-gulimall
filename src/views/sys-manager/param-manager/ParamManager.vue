<template>
  <div class="container">
    <vxe-toolbar>
      <template #buttons>
        <el-form class="search-bar2" inline>
          <el-form-item label="参数名称">
            <el-input v-model.trim="_searchForm.configName" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch()">查 询</el-button>
            <el-button @click="onReset(loadData)">重 置</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template #tools>
        <el-button type="primary" @click="clickTest()">测试</el-button>
        <el-button type="primary" @click="_onWillAdd">新增参数</el-button>
      </template>
    </vxe-toolbar>
    <div class="table-style">
      <vxe-table :data="_tableList" ref="table" height="auto" :row-config="{ isHover: true }" show-header-overflow show-overflow>
        <vxe-column type="seq" width="50px" />
        <vxe-column field="configName" title="参数名称" ></vxe-column>
        <vxe-column field="configCode" title="参数编码" ></vxe-column>
        <vxe-column field="configValue" title="参数值" ></vxe-column>
        <vxe-column field="remark" title="备注" ></vxe-column>
        <vxe-column field="updatedTime" title="更新时间" width="180" ></vxe-column>
        <vxe-column title="操作" width="200">
          <template #default="{ row }">
            <el-link type="primary" @click="_onWillView(row.configId)">查 看</el-link>
            <span>
              <el-divider direction="vertical"></el-divider>
            </span>
            <el-link type="primary" @click="_onWillEdit(row.configId)">编 辑</el-link>
            <span>
              <el-divider direction="vertical"></el-divider>
            </span>
            <el-link type="danger" @click="_onDelete(row.configId, row.configName)">删 除</el-link>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
    <el-footer class="page-footer">
      <el-pagination class="table-pagination" :current-page="_pagination.pageNum" :page-size="_pagination.pageSize" @size-change="_onPageSizeChange(arguments, pageTenants)" @current-change="_onPageNumchange(arguments, pageTenants)" :total="_pagination.total" />
    </el-footer>
    <EditParamDialog v-model.trim="_isShowSubDialog" :primaryId="_primaryId" :readonly="_readonly" @close="loadData()"/>
  </div>
  <!-- </el-container> -->
</template>

<script>
import {deleteByConfigId, queryByPage} from "@/api/modules/sys-param";
import EditParamDialog from "@/views/sys-manager/param-manager/EditParamDialog";
import {listCategoryTree} from "@/api/modules/gulimall-product/gulimall-product";

export default {
  extends: Table2form.default,
  components: {
    EditParamDialog
  },
  data() {
    return {
      pageListApi: queryByPage,
      delRowApi: deleteByConfigId,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    clickTest() {
      listCategoryTree().then(res => {
        console.log("拿到的分类树=======", res)
      })
    },
    onSearch() {
      this._loadData().then((res) => {
      });
    },

    loadData() {
      this._loadData().then((res) => {
        this._tableList = res.content.list;
      });
      //   }
    },
    onReset() {
      this._pagination.pageNum = 1; // 分页变回1
      this._searchForm.configName = null; // 查询条件清空
      this._loadData().then((res) => {
        // 如果还有其他操作,可以继续.then, res就是pageListApi返回的东西
      });
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
  // .action-wrap {
  //   opacity: 1;
  // }
}
</style>

