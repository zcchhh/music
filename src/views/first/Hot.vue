<template>
  <div class="hot">
    <!-- <h1>This is an hot page</h1> -->
    <HotSong />
    <ul class="ht-ul">
      <SongItem
        @update:music="$emit('update:music', $event)"
        @update:playlist="$emit('update:playlist', hotSongs)"
        v-for="(song, index) in hotSongs"
        :key="song.id"
        :item="song"
        :currentMusic="$attrs.currentMusic"
        :paused="$attrs.paused"
        >{{ index > 8 ? index + 1 : "0" + (index + 1) }}</SongItem
      >
    </ul>
  </div>
</template>

<script>
import HotSong from "@/components/two/HotSong.vue";
import SongItem from "@/components/one/SongItem.vue";
export default {
  data: function () {
    return {
      //定义空数组来接收获取的数据
      hotSongs: [],
    };
  },
  components: {
    HotSong,
    SongItem,
  },
  created() {
    this.$root.isShowLoading = true;

    this.axios
      .get("/top/list?idx=1")
      .then((response) => {
        // 截取20首歌的id
        console.log(
          response.data.playlist.trackIds
            .slice(0, 20)
            .map((e) => e.id)
            .join()
        );
        this.$root.isShowLoading = true;
        this.axios
          .get(
            "/song/detail?ids=" +
              response.data.playlist.trackIds
                .slice(0, 20)
                .map((e) => e.id)
                .join()
          )
          .then((response) => {
            console.log("lzh", response.data);
            if (response.data.code == 200) {
              let hotSongs = response.data.songs;
              // 将数据转化成相同格式，以便复用组件
              for (let i = 0; i < hotSongs.length; i++) {
                this.hotSongs[i] = {};
                this.hotSongs[i].id = hotSongs[i].id;
                this.hotSongs[i].name = hotSongs[i].al.name;
                this.hotSongs[i].picUrl = hotSongs[i].al.picUrl;
                this.hotSongs[i].song = hotSongs[i].ar;
                this.hotSongs[i].song = { artists: [{}] };
                this.hotSongs[i].song.artists[0].name = hotSongs[i].ar[0].name;
              }
              // 因vue是响应式获取数据的，所以需要手动更改数据，不做这步，数据则可以拿到但传不出去
              this.hotSongs = this.hotSongs.map((item) => {
                return item;
              });
            }
          })
          .finally(() => {
            this.$root.isShowLoading = false;
          });
      })
      .finally(() => {
        this.$root.isShowLoading = false;
      });
  },
};
</script>

<style lang="less">
.ht-ul {
  padding-left: 40px;
  padding-right: 10px;
}
</style>
