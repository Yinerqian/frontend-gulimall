<template>
  <el-container class="page-container">
    <el-header class="page-header">
      <el-form class="search-bar" inline @submit.native.prevent @keyup.enter.native="_onSearchTable(_loadData)">
        <el-form-item>
          <el-input v-model.trim="_searchForm.keyword" maxlength="100" placeholder="账号 / 用户昵称"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="actions-wrap">
            <el-button icon="cii-icon-search" type="primary" @click="onSearch()">查询</el-button>
            <el-button icon="cii-icon-reset" @click="onReset(loadData)">重置</el-button>
          </div>
        </el-form-item>
        <el-form-item class="search-bar-add">
          <el-button icon="cii-icon-add" type="primary" @click="_onWillAdd">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="page-main">
      <el-table v-loading="_loading" :data="_tableList" border style="width: 100%">
        <el-table-column type="index" :index="_tableIndex" label="序号" width="60" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="brandId" label="品牌id" header-align="center" align="center"></el-table-column>
        <el-table-column prop="name" label="品牌名" header-align="center" align="center"></el-table-column>
        <el-table-column prop="logo" label="logo" header-align="center" align="center">
          <template v-slot="scope">
            <el-image
                style="width: 80px; height: 80px"
                :src="scope.row.logo"
                fit="fill"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="descript" label="介绍" header-align="center" align="center"></el-table-column>
        <el-table-column prop="showStatus" label="显示状态" header-align="center" align="center"></el-table-column>
        <el-table-column prop="firstLetter" label="检索首字母" header-align="center" align="center"></el-table-column>
        <el-table-column prop="sort" label="排序" header-align="center" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" header-align="center" align="center" width="180">
          <template v-slot="scope">
            <el-link type="primary" @click="_onWillView(scope.row.brandId)">查 看</el-link>
            <span>
              <el-divider direction="vertical"></el-divider>
            </span>
            <el-link type="primary" @click="_onWillEdit(scope.row.brandId)">编 辑</el-link>
            <span>
              <el-divider direction="vertical"></el-divider>
            </span>
            <el-link type="danger" @click="_onDelete(scope.row.brandId, scope.row.name)">删 除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class="page-footer">
      <el-pagination class="table-pagination" :current-page="_pagination.pageNum" :page-size="_pagination.pageSize" @size-change="_onPageSizeChange(arguments, pageTenants)" @current-change="_onPageNumchange(arguments, pageTenants)" :total="_pagination.total" />
    </el-footer>
    <EditBrandDialog v-model.trim="_isShowSubDialog" :primaryId="_primaryId" :readonly="_readonly" @close="loadData()"/>
  </el-container>
</template>

<script>
import {pageBrand, deleteBrandById} from "@/api/modules/gulimall-product/gulimall-brand";
import EditBrandDialog from "_v/gulimall-product/brand-manager/EditBrandDialog";
import {ossSign} from "@/api/modules/gulimall-file/gulimall-file";

export default {
  extends: Table2form.default,
  components: {
    EditBrandDialog
  },
  data() {
    return {
      pageListApi: pageBrand,
      delRowApi: deleteBrandById
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    test() {
      ossSign().then(res => {
        console.log("res====", res)
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
      this._searchForm = {}
      this._loadData().then((res) => {
        // 如果还有其他操作,可以继续.then, res就是pageListApi返回的东西
      });
    },
  },
};
</script>

<style scoped lang="scss">

</style>

