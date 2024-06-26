<template>
  <div :class="{ 'has-logo': showLogo }" :style="{
      backgroundColor: settings.sideTheme === 'theme-dark' ? variables.menuBg : variables.menuLightBg,
    }">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar :class="settings.sideTheme" wrap-class="scrollbar-wrapper">
      <el-menu :collapse="isCollapse" :default-active="activeRouter" class="el-menu-vertical-demo" background-color="#3E4770" text-color="#bfcbd9" active-text-color="#ffffff" v-if="menuList && menuList.length > 0">
        <TreeMenuItem :menuList="menuList" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import TreeMenuItem from "./TreeMenuItem"
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import { variables } from "@/css/index.js";
import SvgIcon from "@/components/svg-icon/SvgIcon.vue";
import "@/utils/iconfont";
import { queryUserPermissions } from '@/api/permission'

export default {
  components: { SidebarItem, Logo, SvgIcon, TreeMenuItem },
  data() {
    return {
      menuList: [],
      activeIndex: "0",
    };
  },
  computed: {
    ...mapState(["settings"]),
    ...mapGetters(["sidebarRouters", "sidebar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
    activeRouter() {
      if (this.$route.meta.subpage) {
        return this.$util.Storage.get("preRouter");
      } else {
        this.$util.Storage.set("preRouter", this.$route.path);
        return this.$route.path;
      }
      // $route.path
    },

  },
  watch: {
    '$route.path'(val) {
      
    }
  },
  methods: {
  },
  mounted() {
    queryUserPermissions().then(res => {
      let moduleList = res.content || [];
      if (moduleList.length > 0) {
        moduleList.forEach((element) => {
          if (element.permissionList && element.permissionList.length > 1) {
            element.menuIconClass = element.permissionList[0].menuIconClass;
          }
        });
        this.menuList = moduleList.sort(
          function (a, b) { return b.sort - a.sort; }
        )
      }
      if (this.$route.name == "blank-index") {
        // 如果从首页点进来会首先进入blank路由, 如果是blank就是重定向到第一个菜单
        this.$router.push({ path: this.menuList[0].menuUrl });
      }
    })
  },
};
</script>
<style scoped lang="scss">
.title {
  user-select: none;
}
</style>
