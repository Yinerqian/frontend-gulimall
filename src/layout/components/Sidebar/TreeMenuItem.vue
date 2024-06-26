<template>
  <div>
    <template v-for="item in menuList">
      <el-submenu :index="item.groupName" v-if="$util.ToolFun.checkListLen(item.children) || $util.ToolFun.checkListLen(item.permissionList)">
        <!-- 当前分组名称 -->
        <template slot="title">
          <SvgIcon :class-name="item.menuIconClass" v-if="item.menuIconClass" style="margin-right: 0px; fill: #BFCBD9;" />
          <span class="title">
            {{ item.groupName }}
          </span>
        </template>

        <!-- 渲染子菜单 -->
        <template v-for="permission in item.permissionList" v-if="$util.ToolFun.checkListLen (item.permissionList)">
          <el-menu-item :index="getUrl(permission)" @click="$router.push(getUrl(permission))">
            <el-row slot="title" type="flex" align="middle">
              <SvgIcon :class-name="permission.menuIconClass" v-if="permission.menuIconClass" style="margin-right: 5px; fill: #BFCBD9;" />
              <span class="title per">
                <el-tooltip :disabled="permission.permissionName.length <= 10" effect="dark" :content="permission.permissionName" placement="right" width="100px">
                  <div class="menu-item">{{permission.permissionName}}</div>
                </el-tooltip>
              </span>
            </el-row>
          </el-menu-item>
        </template>

        <!-- 递归渲染子分组 -->
        <TreeMenuItem :menuList="item.children" v-if="$util.ToolFun.checkListLen (item.children)" />

      </el-submenu>
    </template>
  </div>
</template>

<script>
import SvgIcon from "@/components/svg-icon/SvgIcon.vue";
export default {
  name: "TreeMenuItem",
  props: ['menuList'],
  components: { SvgIcon },
  data() {
    return {

    }
  },
  methods: {
    onRouter(item) {
      if (!item.menuUrl && this.$util.ToolFun.checkListLen(item.permissionList)) {
        this.$router.push({
          path: item.permissionList[0].menuUrl,
        });
      } else if (item.menuUrl) {
        this.$router.push({
          path: item.menuUrl,
        });
      }
    },
    getUrl(item) {
      if (!item.menuUrl && this.$util.ToolFun.checkListLen(item.permissionList)) {
        return item.permissionList[0].menuUrl
      } else if (item.menuUrl) {
        return item.menuUrl
      }
    },
  },
}
</script>

<style scoped>
.per {
  font-size: 13px;
  display: inline-block;
  max-width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.menu-item {
  max-width: 170px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
