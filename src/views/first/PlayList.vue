<template>
  <div class="playlist">
    <ListSong :item="listSongs"></ListSong>
    <ul class="pl-ul1">
      <SongItem
        @update:music="$emit('update:music', $event)"
        @update:playlist="$emit('update:playlist', list2Songs)"
        v-for="(song, index) in list2Songs"
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
import ListSong from "../../components/three/ListSong.vue";
import SongItem from "../../components/one/SongItem.vue";

export default {
  components: { ListSong, SongItem },
  props: ["currentId"],
  data: function () {
    return {
      // 定义一个空数组
      listSongs: {},
      id: "",
      list2Songs: [],
    };
  },
  created() {
    // this.axios.get("/playlist/detail").then((response) => {
    // this.ListSongs = response.data;
    // });
    // 拿歌
    // this.axios.get("/personalized/newsong").then((response) => {
    // this.list2Songs = response.data.result;
    // });
    // this.id = this.$route.query.id;
    // this.getSongsList();
    // this.getSingsList();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => vm.getSongsList());
  },

  methods: {
    // 拿图片
    getSongsList() {
      this.axios.get("/playlist/detail?id=" + this.$route.query.id).then((response) => {
        this.listSongs = response.data.playlist;
        this.axios
          .get(
            "/song/detail?ids=" +
              response.data.playlist.trackIds
                .slice(0, 20)
                .map((e) => e.id)
                .join()
          )
          .then((response) => {
            console.log(response.data.songs);
            let listmusic = response.data.songs;
            for (let i = 0; i < listmusic.length; i++) {
              // console.log(this.listmusic[i]);
              this.list2Songs[i] = {};
              this.list2Songs[i].id = listmusic[i].id;
              this.list2Songs[i].name = listmusic[i].name;
              this.list2Songs[i].picUrl = listmusic[i].al.picUrl;
              this.list2Songs[i].song = listmusic[i].ar;
              this.list2Songs[i].song = { artists: [{}] };
              this.list2Songs[i].song.artists[0].name = listmusic[i].ar[0].name;
              // let index = i;
              // console.log(index);
            }
            this.list2Songs = this.list2Songs.map((item) => {
              // console.log(item);
              return item;
            });
          });
      });
      // this.axios({
      // method: "get",
      // url: "/playlist/detail",
      // params: {
      // id: this.id,
      // },
      // })
      // .then((result) => {
      // console.log("result.data =>", result.data);
      // this.listSongs = result.data.playlist;
      // console.log("this.listSongs =>", this.listSongs);
      // })
      // .catch((err) => {
      // console.log("err =>", err);
      // });
      // },
      // getSingsList() {
      // this.axios({
      // method: "get",
      // url: "/song/url",
      // params: {
      // id: this.currentId,
      // },
      // })
      // .then((result) => {
      // console.log("result.data =>", result.data);
      // this.list2Songs = result.data;
      // console.log("111=>", this.list2Songs);
      // })
      // .catch((err) => {
      // console.log("err =>", err);
      // });
      // },
    },
  },
};
</script>

<style scoped lang="less">
.playlist {
  margin-top: 200px;

  .pl-ul1 {
    padding-left: 40px;
    padding-right: 10px;
  }
}
</style>
