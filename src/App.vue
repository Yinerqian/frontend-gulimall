<template>
  <div id="app">
    <Loading/>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    Loading: (resolve) => require(['@/components/Loading'], resolve)
  },
  metaInfo() {
    return {
      title:
        this.$store.state.settings.dynamicTitle &&
        this.$store.state.settings.title,
      titleTemplate: (title) => {
        return title
          ? `${title} - ${process.env.VUE_APP_TITLE}`
          : process.env.VUE_APP_TITLE;
      },
    };
  },
};
</script>
<style scoped>
</style>
