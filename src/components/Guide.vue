<template>
  <div class="guide-container">
    <div class="light-area" ref="light-area">
      <div class="triangle" :style="{
          'transform': `translateX(calc(-50% + ${positionArr[index].offsetX || '0px'})) rotate(-180deg)`
      }" />
      <slot>
        <p class="describe">{{text}}</p>
        <el-button type="primary" @click="doNext" size="mini">知道了</el-button>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isMark: {
      type: Boolean,
      default: false,
    },
    positionArr: {
      type: Array,
      default: () => [
        {
          width: '100px',
          height: '65px',
          left: 'calc(100vw - 138px)',
          top: '38px',
          text: "点击可全屏展示",
          offsetX: "12px",
        },
        {
          width: '160px',
          height: '65px',
          left: 'calc(100vw - 175px)',
          top: '38px',
          text: "点击可退出总览界面",
          offsetX: "70px",
        },
        {
          width: '200px',
          height: '60px',
          top: '115px',
          left: '190px',
          text: "点击可查看1号炉详细信息"
        },
        {
          width: '200px',
          height: '60px',
          top: '115px',
          left: 'calc(100vw - 215px)',
          text: "点击可查看2号炉详细信息",
          offsetX: "38px",
        },
      ]
    }
  },
  data() {
    return {
      index: 0
    }
  },
  computed: {
    text() {
      return this.positionArr[this.index].text || "测试数据";
    }
  },
  mounted() {
    this.initDom()
  },
  methods: {
    initDom() {
      if (Array.isArray(this.positionArr) && this.positionArr.length > 0) {
        this.resetStyle(this.index)
      }
    },
    resetStyle(index) {
      this.$refs['light-area'].style.width = this.positionArr[index].width;
      //   this.$refs['light-area'].style.height = this.positionArr[index].height;
      if (this.positionArr[index].top || this.positionArr[index].top == 0) {
        this.$refs['light-area'].style.top = this.positionArr[index].top;
      }
      if (this.positionArr[index].left || this.positionArr[index].left == 0) {
        this.$refs['light-area'].style.left = this.positionArr[index].left;
      }
      //   if (this.positionArr[index].bottom || this.positionArr[index].bottom == 0) {
      //     this.$refs['light-area'].style.bottom = this.positionArr[index].bottom;
      //   }
      //   if (this.positionArr[index].right || this.positionArr[index].right == 0) {
      //     this.$refs['light-area'].style.right = this.positionArr[index].right;
      //   }
    },
    doNext() {
      if (this.index == this.positionArr.length - 1) {
        this.$emit("over");
        return;
      }
      this.index++;
      this.resetStyle(this.index)
    }
  }

}
</script>

<style scoped lang="scss">
.guide-container {
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 100000;
  left: 0;
  top: 0;
}
.light-area {
  transition: 0.2s;
  background: #f5f5f5;
  border-radius: 3px;
  position: fixed;
  padding: 8px 10px;
  min-width: 130px;
  box-shadow: 0 0 5px #ccc;
  .triangle {
    position: absolute;
    transform: translateX(-50%) rotate(-180deg);
    top: -17px;
    left: 50%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-radius: 8px;
    border-top-color: #f5f5f5;
  }
  .describe {
    font-size: 14px;
    margin: 5px 0;
  }
  .el-button {
    padding: 5px 7px;
    font-size: 12px !important;
    float: right;
    margin-top: 5px;
  }
}
</style>