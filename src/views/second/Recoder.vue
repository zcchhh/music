<template>
  <div>
    <ul class="ht-ul">
      <SongItem
        @update:music="$emit('update:music', $event)"
        @update:playlist="$emit('update:playlist', playHistoryData)"
        v-for="(song, index) in playHistoryData"
        :key="index"
        :item="song"
        :currentMusic="$attrs.currentMusic"
        :paused="$attrs.paused"
        >{{ index > 8 ? index + 1 : "0" + (index + 1) }}</SongItem
      >
    </ul>
  </div>
</template>

<script>
import SongItem from "@/components/one/SongItem.vue";
export default {
  data() {
    return {
      playHistoryData: [],
    };
  },
  components: {
    SongItem,
  },

  created() {
    this.playHistory();
  },
  methods: {
    // 获取播放历史
    playHistory() {
      if (localStorage.getItem("playHistory")) {
        let playHistory = JSON.parse(localStorage.getItem("playHistory"));
        this.playHistoryData = playHistory;
      } else {
        this.playHistoryData = [];
      }
    },
  },
};
</script>

<style lang="less" scoped>
.ht-ul {
  padding-left: 40px;
  padding-right: 10px;
  // margin-top: -10px;
  position: relative;
  top: -30px;
  left: 0px;
}
</style>
