<template>
  <transition name="fade">
    <div class="loading-wrap" id="g-loading">
      <div class="loading-container">
<!--        <img src="@/assets/logo-loding.gif" width="200px" />-->
        <p class="text"></p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Loading",  // 全屏loading组件
  props: {
    fullScreen: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped lang="scss">
.loading-wrap {
  display: none;
}
.loading-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.15);
  color: #666;
  z-index: 10000;
  pointer-events: none;
}
.text {
  text-shadow: 0 0 1px #fff;
  &:after {
    content: "";
    animation: loading-text 1s infinite;
  }
}
.loading-container-fullScreen {
  position: fixed;
}
.loader {
  position: relative;
  width: 2.5em;
  height: 2.5em;
  transform: rotate(165deg);
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0.5em;
  height: 0.5em;
  border-radius: 0.25em;
  transform: translate(-50%, -50%);
}
.loader:before {
  animation: before 2s infinite;
}
.loader:after {
  animation: after 2s infinite;
}

@keyframes before {
  0% {
    width: 0.5em;
    box-shadow: 1em -0.5em rgba(225, 20, 98, 1),
      -1em 0.5em rgba(111, 202, 220, 1);
  }
  35% {
    width: 2.5em;
    box-shadow: 0 -0.5em rgba(225, 20, 98, 1), 0 0.5em rgba(111, 202, 220, 1);
  }
  70% {
    width: 0.5em;
    box-shadow: -1em -0.5em rgba(225, 20, 98, 1),
      1em 0.5em rgba(111, 202, 220, 1);
  }
  100% {
    box-shadow: 1em -0.5em rgba(225, 20, 98, 1),
      -1em 0.5em rgba(111, 202, 220, 1);
  }
}
@keyframes after {
  0% {
    height: 0.5em;
    box-shadow: 0.5em 1em rgba(61, 184, 143, 1),
      -0.5em -1em rgba(233, 169, 32, 1);
  }
  35% {
    height: 2.5em;
    box-shadow: 0.5em 0 rgba(61, 184, 143, 1), -0.5em 0 rgba(233, 169, 32, 1);
  }
  70% {
    height: 0.5em;
    box-shadow: 0.5em -1em rgba(61, 184, 143, 1),
      -0.5em 1em rgba(233, 169, 32, 1);
  }
  100% {
    box-shadow: 0.5em 1em rgba(61, 184, 143, 1),
      -0.5em -1em rgba(233, 169, 32, 1);
  }
}

@keyframes loading-text {
  0% {
    content: "数据加载中,请稍等";
  }

  33% {
    content: "数据加载中,请稍等.";
  }

  66% {
    content: "数据加载中,请稍等..";
  }

  100% {
    content: "数据加载中,请稍等...";
  }
}
</style>
