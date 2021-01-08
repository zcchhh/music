<template>
  <!-- active当paused不等于控的时候，加上类，marginTop的值 -->
  <div id="app" :class="{ active: paused != null }">
    <!-- 当网速慢的时候，显示的loading效果 -->
    <div class="loading" v-show="$parent.isShowLoading">
      <svg width="30" height="30" viewBox="0 0 100 100">
        <path
          id="p"
          fill="red"
          d="M94.1
58.8c.6-2.8.9-5.8.9-8.8s-.3-6-.9-8.8l-11.7-.4c-.7-2.6-1.7-5-3-7.3l8-8.5c-3.3-4.9-7.5-9.2-12.5-12.5l-8.5
8c-2.3-1.3-4.7-2.3-7.3-3l-.3-11.6C56 5.3 53 5 50 5s-6 .3-8.8.9l-.4 11.7c-2.6.7-5
1.7-7.3 3l-8.5-8c-4.9 3.3-9.2 7.5-12.5 12.5l8 8.5c-1.3 2.3-2.3 4.7-3
7.3l-11.6.3C5.3 44 5 47 5 50s.3 6 .9 8.8l11.7.4c.7 2.6 1.7 5 3 7.3l-8 8.5c3.3
4.9 7.5 9.2 12.5 12.5l8.5-8c2.3 1.3 4.7 2.3 7.3 3l.4 11.7c2.7.5 5.7.8 8.7.8s6-.3
8.8-.9l.4-11.7c2.6-.7 5-1.7 7.3-3l8.5 8c4.9-3.3 9.2-7.5 12.5-12.5l-8-8.5c1.3-2.3
2.3-4.7 3-7.3l11.6-.3zM50 66.9c-9.3 0-16.9-7.6-16.9-16.9S40.7 33.1 50 33.1 66.9
40.7 66.9 50 59.3 66.9 50 66.9z"
        ></path>
      </svg>
    </div>
    <!-- //判断是不是当前点击的音乐 -->
    <!-- 播放组件 -->
    <Play
      v-if="currentMusic"
      :currentMusic="currentMusic"
      :playlist="playlist"
      :currentIndex="currentIndex"
      @update:paused="paused = $event"
      @update:music="
        currentMusic = $event.item;
        currentIndex = $event.index;
      "
    />
    <!-- 当其$route.meta.isShowNav为true的时候，显示 -->
    <HomeNav v-if="$route.meta.isShowNav" />
    <!-- 保持活性，不用每次都删除 -->
    <keep-alive>
      <!-- 路由出口 -->
      <router-view
        @update:music="
          currentMusic = $event.item;
          currentIndex = $event.index;
        "
        @update:playlist="playlist = $event"
        v-bind:currentMusic="currentMusic"
        v-bind:paused="paused"
      />
    </keep-alive>
  </div>
</template>
<script>
// 导入对应组件
import HomeNav from "@/components/one/HomeNav.vue";
import Play from "@/components/one/Play.vue";
export default {
  // 注册组件
  components: {
    HomeNav,
    Play,
  },
  created() {
    // console.log("lll", this.currentId);
  },
  data: function () {
    return {
      // 当前播放的音乐
      currentMusic: null,
      // 当前播放的状态
      paused: null,
      // currentId: "",
      // 全部歌曲
      playlist: [],
      currentIndex: 0,
      // modetype: null,
    };
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  padding-top: 91px;
}
.active {
  padding-bottom: 52px;
}
/* This changes all the animations globally */
:root {
  --animate-duration: 300ms;
  /* --animate-delay: 0.9s; */
}
.loading {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.15);
  svg {
    animation: loading 3s linear infinite;
  }
}
@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
