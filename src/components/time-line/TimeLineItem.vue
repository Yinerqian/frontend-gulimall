<template>
  <div class="timeline-item-container">
    <div :class="['timeline-item-content', {
      'timeline-item-vertical-margin': timeline.direction == 'vertical',
      'timeline-item-horizontal-margin': timeline.direction == 'horizontal',
    }]">
      <div :class="['point', {'point-hover': clickable}, ]" :id="`line-${$vnode.key}`" @click="onClick">
        <div class="mark">
          <slot name="icon" v-if="$slots.icon"></slot>
          <div v-else>
            {{$vnode.key}}
          </div>
        </div>
      </div>
      <div v-if="$slots.default">
        <slot />
      </div>
    </div>
    <!-- <div class="gaoxiao" v-if="isBool">开始吹氧</div> -->
  </div>
</template>

<script>
export default {
  name: "TimeLineItem",
  inject: {
    timeline: {
      type: Object,
      default: () => ({})
    },
  },
  props: {
    clickable: {
      type: Boolean,
      default: true
    },
    newline: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
    }
  },
  methods: {
    onClick() {
      this.timeline.onClick(this.$vnode.key)
    },
  }
}
</script>

<style scoped lang="scss">
.timeline-item-container {
  display: inline-block;
  .timeline-item-content {
    &.timeline-item-vertical-margin {
      // margin: 40px 0;
      margin-top: 5px;
      margin-bottom: 20px;
    }
    &.timeline-item-horizontal-margin {
      margin-top: 5px;
    }
  }
  .point {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 3px solid rgb(38, 136, 243);
    margin-left: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: #feffe6;
    &:active {
      .mark {
        transition: 0.1s;
        transform: translateY(-1px) !important;
      }
    }
    &:after {
      content: "";
      background: burlywood;
      position: absolute;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      z-index: 1;
      transform: translate(-50%, -50%);
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      left: 50%;
      top: 50%;
      width: 130%;
      height: 130%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid #bfbfbf;
      background: orange;
      opacity: 0.4;
    }
    &:hover {
      border: 1px solid orange;
      .mark {
        transition: 0.1s;
        transform: scale(1.15);
      }
      &:before {
        opacity: 0.2;
      }
    }
  }
  .point-hover {
    transition: 0.2s;
    cursor: pointer;
    &:hover {
      animation: a-scale 1s infinite;
    }
  }
  @keyframes a-scale {
    0% {
      box-shadow: 0 0 0px #feffe6;
    }
    100% {
      box-shadow: 0 0 20px #feffe6;
    }
  }
  .gaoxiao {
    position: fixed;
    pointer-events: none;
    z-index: 1000;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 30px;
    opacity: 0;
    animation: scales 1s forwards ease-in-out;
    @keyframes scales {
      0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(1);
      }
      50% {
        opacity: 0.8;
        transform: translate(-50%, -50%) scale(12);
      }
      100% {
        transform: translate(-50%, -50%) scale(12);
        opacity: 0;
      }
    }
  }
  .flashing {
    animation: flashing 1s forwards ease-in-out;
    border: 2px solid red;
    @keyframes flashing {
      // 0% {
      //   opacity: 0;
      //   transform: translate(-50%, -50%) scale(1);
      // }
    }
  }
}
</style>