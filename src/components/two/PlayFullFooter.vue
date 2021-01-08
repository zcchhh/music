<template>
  <div class="ps-div1">
  <!-- 格式化时间 |前面是实参，后面是格式化方法 -->
    <div class="left-time fl">{{ currentTime | changSeconds }}</div>
    <div class="play-full-footer">
    <!-- 播放进度条 -->
      <div class="progress">
        <input
          type="range"
          min="0"
          :max="duration"
          step="1"
          @input="getValue"
          :value="currentTime"
        />
        <!-- 时间比列 -->
        <span :style="{ width: (currentTime / duration) * 100 + '%' }"></span>
      </div>
    </div>
    <!-- 格式化总时间 -->
    <div class="right-time fl">{{ duration | changSeconds }}</div>
    <div class="pf-div2">
    <!-- 播放模式 -->
      <p class="pf-p1" @click="$emit('setPlayModel')">
        <img src="@/assets/icon/circle.png" v-show="playModel == 'circle'" alt="" />
        <img src="@/assets/icon/loop.png" v-show="playModel == 'loop'" alt="" />
        <img src="@/assets/icon/random.png" v-show="playModel == 'random'" alt="" />
      </p>
      <!-- 前一首 -->
      <p class="pf-p2" @click="$emit('playPrev')">
        <img src="@/assets/icon/last-song.png" alt="" />
      </p>
      <!-- 切换播放状态 -->
      <p class="pf-p3" @click="$emit('togglePlayState')">
        <img v-if="paused" src="@/assets/icon/play.png" alt="" />

        <!-- <template v-else> -->
        <img v-else src="@/assets/icon/pause.png" alt="" />
        <!-- </template> -->
      </p>
      <!-- 下一首 -->
      <p class="pf-p4" @click="$emit('playNext')">
        <img src="@/assets/icon/next-song.png" alt="" />
      </p>
      <!-- 收藏 -->
      <p class="pf-p5" @click="$emit('toggleCollection')">
        <img src="@/assets/icon/collection-active.png" v-if="isCollection" alt="" />
        <img src="@/assets/icon/collection.png" v-else alt="" />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    // 当前时间
    "currentTime",
    // 总时间
    "duration",
    // 当前音乐
    "currentMusic",
    // 当前索引
    "currentIndex",
    // 播放状态
    "paused",
    // 播放模式
    "playModel",
    // 判断收藏
    "isCollection",
  ],
  data: function () {
    return {};
  },
  methods: {
    getValue: function (e) {
      console.log(e.target.value);
      this.$emit("update:currentTime", e.target.value);
    },
  },
};
</script>

<style lang="less">
.ps-div1 {
  position: relative;
  .play-full-footer {
    position: absolute;
    top: -42px;
    left: 0;
    width: 100%;
    .progress {
      width: 70%;
      height: 5px;
      background: linear-gradient(to right, lightblue, lightcoral);
      position: relative;
      top: 0;
      left: 0;
      margin: 0 auto;
      border-radius: 3px;
      input {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
        opacity: 0;
      }
      span {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background: rgb(255, 124, 38);
        border-radius: 3px;
      }
    }
  }
  .left-time {
    position: absolute;
    top: -45px;
    left: 20px;
    color: #fff;
    font-size: 12px;
  }
  .right-time {
    position: absolute;
    top: -45px;
    left: 323px;
    color: #fff;
    font-size: 12px;
  }
  .pf-div2 {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    // position: absolute;
    // top: 0;
    // left: 0;
    margin-top: 130px;
  }
}
</style>
