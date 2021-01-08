<template>
  <div>
    <!-- 点击是否显示大播放页面 -->
    <img @click="$emit('show-play-bar')" src="@/assets/icon/7.png" alt="" />
    <h1 class="pf-span1">{{ currentMusic.name }}</h1>

    <!-- <span v-for="(artist, index) in currentMusic.song.artists" :key="index"> -->
    <!-- <template v-if="index">/ </template>{{ artist.name }} -->
    <!-- </span> -->
    <template v-if="currentMusic.artists">
      <!-- <p v-if="type == 'search'"> -->
      <h3 class="pf-span2" v-if="type === 'search'">
        {{ currentMusic.artists[0].name }}
      </h3>
      <!-- </p> -->
    </template>

    <h3 class="pf-span2" v-else>
      <span v-for="(artist, index) in currentMusic.song.artists" :key="index">
        <template v-if="index">/ </template>{{ artist.name }}
      </span>
    </h3>
  </div>
</template>

<script>
export default {
  props: ["currentMusic", "type"],
};
</script>

<style scoped lang="less">
div {
  position: relative;
  margin: 0 auto;
  padding-top: 10px;

  .pf-span1 {
    color: #fff;

    width: 70%;
    margin: 0 auto;
    line-height: 20px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    // color: #f1f1f1;
    margin-top: 5px;
  }

  .pf-span2 {
    // color: #fff;
    // position: absolute;
    // top: 20px;
    // left: 20px;
    // color: #fff;
    font-size: 12px;
    // margin-left: 35%;
    // transform: translateX(-50%);
    width: 70%;
    margin: 0 auto;
    line-height: 20px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #f1f1f1;
    // display: inline;
  }
  img {
    position: absolute;
    left: 10px;
    top: 5px;
  }
}
</style>
