<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="'#icon-'+className"></use>
  </svg>
</template>
 
<script>
import "./iconfont";
export default {
  name: "SvgIcon",  // Svg图标组件
  props: {
    iconClass: {
      type: String,
    },
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    },
  },
};
</script>
 
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
}
</style>