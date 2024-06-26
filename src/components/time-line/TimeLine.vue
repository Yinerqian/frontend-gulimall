<template>
  <div :class="['timeline-container', {
    'timeline--vertical': direction == 'vertical',
    'timeline--horizontal': direction == 'horizontal',
  }]">
    <slot />
  </div>
</template>

<script>
import LeaderLine from './leader-line.min.js';
export default {
  name: "TimeLine",
  props: {
    direction: {
      type: String,
      default: "horizontal"
    },
    animateLink: {
      type: Boolean,
      default: false
    },
    linkConfig: {
      type: Object,
      default: () => ({// 线条基本配置
        endPlug: "behind",
        dash: { animation: true },
        // dash: true,
        // middleLabel: "加废钢",
        path: "straight",
        size: 5,
        hide: true,
        color: "rgba(38,136,243,.6)",
        animOptions:
          { duration: 10, timing: [0.58, 0, 0.42, 1] }
      })
    },
    scrollClassName: {
      type: String,
    },
  },
  provide() {
    return {
      timeline: this,
    };
  },
  data() {
    return {
      lineArr: []
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.initLine()
    // })
  },
  methods: {
    initLine() {
      let scrollDom = document.querySelector(this.scrollClassName);
      let timeLineItems = this.$children.filter(item => item.$options.name == 'TimeLineItem')
      timeLineItems.sort((a, b) => a.$vnode.key - b.$vnode.key)  // 按照1,2,3,4,5 顺序排序
      if (timeLineItems && timeLineItems.length > 0) {
        timeLineItems.forEach((item, index) => {
          if (index < timeLineItems.length - 1) {
            const curKey = item.$vnode.key
            const nextKey = timeLineItems[index + 1].$vnode.key
            this.lineArr.push(new LeaderLine(
              document.getElementById("line-" + curKey),
              document.getElementById("line-" + nextKey),
              {
                ...this.linkConfig,
              }
            ));
          }
        })
        if (this.animateLink) {
          let delayTime = 150  // 延迟时间
          this.lineArr.forEach((item, index) => {
            setTimeout(() => {
              item.show("draw", {
                duration: 280,
                // timing: [0.5, 0, 1, 0.42]
              });
              if (scrollDom) {
                scrollDom.scrollTop = document.getElementById("line-" + timeLineItems[index].$vnode.key).offsetTop;
                this.$emit("lineto")
              }
            }, delayTime * index)
          })
        } else {
          this.lineArr.forEach(item => {
            item.show()
          })
        }
      }
    },
    destroyLines() {  // 销毁所有线条
      this.lineArr.forEach(item => {
        item.remove()
      })
    },
    resetPostion() {  // 重置线条位置
      this.lineArr.forEach((item, index) => {
        item.position();
      })
    },
    onClick(index) {
      this.$emit("click", index)
    }
  },
  beforeDestroy() {
    this.destroyLines();
  },
}
</script>

<style scoped lang="scss">
.timeline-container {
  display: flex;
  flex-wrap: wrap;
}
.timeline--vertical {
  flex-flow: column;
  justify-content: flex-start;
}
.timeline--horizontal {
  justify-content: center;
}
</style>