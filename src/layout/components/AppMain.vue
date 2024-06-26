<template>
  <section class="app-main" id="app-main">
    <!-- <transition name="fade-transform" mode="out-in"> -->
    <keep-alive>
      <router-view :key="layout.key+$route.path" v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view :key="layout.key+$route.path" v-if="!$route.meta.keepAlive"/>
    <!-- </transition> -->
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  inject: {
    layout: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  // min-height: calc(100vh - 50px);
  // max-height: calc(100vh - 200px);
  height: calc(100vh - 74px);
  width: 100%;
  position: relative;
  overflow: auto;
  background: #fafafa;
  padding: 10px;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    // min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
