<template>
  <div @click="$emit('toggle-show-lyric')">
    <!-- <img v-if="type == 'search'" :src="currentMusic.album.artist.img1v1Url" alt="" /> -->
    <img :src="currentMusic.picUrl" alt="" :class="{ stop: paused }" />
  </div>
</template>

<script>
export default {
  props: ["currentMusic", "paused", "type"],
  created() {
    // console.log(this.currentMusic.album.artist.img1v1Url);
    // console.log(111);
  },
};
</script>

<style scoped lang="less">
div {
  position: relative;
  width: 300px;
  height: 300px;
  // z-index: 1000;
  margin: 0 auto;
  margin-top: 80px;
  img {
    width: 250px;
    height: 250px;
    border-radius: 50%;

    animation: playing 6s linear infinite;

    box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.3);
    // margin: 0 auto;
    vertical-align: middle;
    margin-left: 25px;
    // 根据状态加类名
    &.stop {
      //动画播放状态
      animation-play-state: paused;
    }
  }
}
@keyframes playing {
  form {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
