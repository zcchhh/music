<template>
  <div class="recommend">
    <RecommendPlayList :currentRecommends="currentRecommends">推荐歌单</RecommendPlayList>
    <RecommendNewMusic
      @update:music="$emit('update:music', $event)"
      @update:playlist="$emit('update:playlist', $event)"
      :newSongs="newSongs"
      :currentMusic="$attrs.currentMusic"
      :paused="$attrs.paused"
      >最新音乐</RecommendNewMusic
    >
  </div>
</template>

<script>
import RecommendPlayList from "@/components/one/RecommendPlayList.vue";
import RecommendNewMusic from "@/components/one/RecommendNewMusic.vue";
export default {
  components: {
    RecommendPlayList,
    RecommendNewMusic,
  },
  data: function () {
    return {
      //定义空数组来接收获取的数据
      recommends: [],
      newSongs: [],
      recommendsIndex: 0,
      //axious请求完成的次数
      count: 0,
    };
  },
  //计算属性裁切获取到歌单
  computed: {
    // 每次截取不同的6个
    currentRecommends: function () {
      return this.recommends.slice(
        this.recommendsIndex * 6,
        (this.recommendsIndex + 1) * 6
      );
    },
  },
  //这个时候才可以有this
  created() {
    this.$root.isShowLoading = true;
    this.axios
      .get("/personalized")
      .then((response) => {
        this.recommends = response.data.result;
      })
      .finally(() => {
        this.count = this.count + 1;
      });
    // 获取推荐新歌
    this.axios
      .get("/personalized/newsong")
      .then((response) => {
        this.newSongs = response.data.result;
      })
      .finally(() => {
        this.count = this.count + 1;
      });
  },
  //监听count
  watch: {
    count: function (n) {
      if (n >= 2) {
        this.$root.isShowLoading = false;
      }
    },
  },
  // keep-alive的生命周期
  activated() {
    console.log("切换到推荐");
    // 推荐歌单的索引
    this.recommendsIndex = this.recommendsIndex >= 4 ? 0 : this.recommendsIndex + 1;
  },
};
</script>

<style></style>
