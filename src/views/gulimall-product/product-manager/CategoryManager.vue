<template>
  <el-container class="page-container">
    <el-aside width="300px" style="height: 100%">
        <el-input style="margin-top: 20px"
                  placeholder="输入关键字进行过滤"
                  v-model="filterText">
        </el-input>
        <el-tree ref="tree" class="my-tree"
                 :data="data"
                 :props="defaultProps"
                 :filter-node-method="filterNode"
                 @node-click="handleNodeClick"/>
    </el-aside>
    <el-main class="page-main">
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
    </el-main>
  </el-container>
</template>

<script>
import {listCategoryTree} from "@/api/modules/gulimall-product/gulimall-product";

export default {
  extends: Table2form.default,
  name: "CategoryManager",
  mounted() {
    this.loadData()
  },
  watch: {
    filterText(val) {
      console.log("val======", val)
      this.$refs.tree.filter(val);
    }
  },
  data() {
    return {
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    };
  },
  methods: {
    loadData(){
      listCategoryTree().then(res => {
        this.data = res.content
      })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      console.log(data);
    }
  }
}
</script>

<style scoped lang="scss">
.my-tree {
  margin-top: 10px;
  height: calc(100% - 65px);
  overflow: auto;
}

</style>
