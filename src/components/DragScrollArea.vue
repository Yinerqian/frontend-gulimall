<template>
  <div class="drag-area-container" id="drag-area">
    <slot />
  </div>
</template>

<script>
export default {
  name: "DragScrollArea",  // 让此组件包裹让一个可滚动的元素,使其具有可拖拽滚动的能力
  props: {
      targetCss: { // 真正可滚动的目标元素的样式
          type: String,
          default: ".vxe-table--body-wrapper.body--wrapper"
      },
      speed: { // 拖拽速度
          type: Number,
          default: 5
      }
  },
  mounted() {
    this.initDrag();
  },
  methods: {
    initDrag() {
      let dragScrollArea = document.getElementById("drag-area")
      dragScrollArea.onmousedown = (e) => {
        let target = document.querySelector(this.targetCss);
        let fromX = e.clientX;
        let scrollLeft = target.scrollLeft;
        dragScrollArea.onmousemove = (e) => {
          let toX = e.clientX;
          dragScrollArea.style["user-select"] = "none"  // 防止拖拽时候选中元素
          target.scrollLeft = scrollLeft + (fromX - toX)*this.speed;
        }
        dragScrollArea.onmouseup = function (e) {
          dragScrollArea.onmousemove = null;
          dragScrollArea.onmouseup = null;
          dragScrollArea.style["user-select"] = "auto"  // 防止拖拽时候选中元素
        };
      }

    }
  }
}
</script>

<style scoped>
.drag-area-container {
  /* height: 100%; */
}
</style>