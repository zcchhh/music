<template>
  <div class="play" :class="{ paused: paused }">
    <audio
      :src="'https://music.163.com/song/media/outer/url?id=' + currentMusic.id + '.mp3'"
      autoplay
      ref="audio"
      :loop="isLoop"
    ></audio>
    <!-- 动画效果 -->
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__slideInUp"
      leave-active-class="animate__animated animate__slideOutDown"
    >
      <div class="play-bar" v-show="isShowPlayBar" @click="isShowPlayBar = false">
        <img class="py-img" :src="currentMusic.picUrl" alt="" />
        <h5>
          {{ currentMusic.name }}
        </h5>
        <p>
          <span
            class="py-span1"
            v-for="(artist, index) in currentMusic.song.artists"
            :key="index"
          >
            <template v-if="index">/ </template>{{ artist.name }}
          </span>
        </p>

        <div class="control" @click.stop="togglePlayState">
          <canvas ref="circle" width="50" height="50"></canvas>
          <span class="icon">
            <img v-if="paused" src="@/assets/icon/3.png" alt="" />
            <img v-else src="@/assets/icon/4.png" alt="" />
          </span>
        </div>
      </div>
    </transition>

    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div class="play-full" v-if="!isShowPlayBar">
        <div
          class="mask"
          :style="{ backgroundImage: `url('${currentMusic.picUrl}')` }"
        ></div>
        <PlayFullHeader
          @show-play-bar="isShowPlayBar = true"
          :currentMusic="currentMusic"
        />
        <template>
          <PlayFullLyric
            v-if="isShowLyric"
            @toggle-show-lyric="isShowLyric = !isShowLyric"
            :lyricData="lyricData"
            :currentMusic="currentMusic"
            v-bind:currentTime="currentTime"
          />
          <PlayFullChart
            v-else
            @toggle-show-lyric="isShowLyric = !isShowLyric"
            :currentMusic="currentMusic"
            :paused="paused"
          />
        </template>
        <PlayFullFooter
          v-bind:currentTime="currentTime"
          v-bind:duration="duration"
          v-bind:currentMusic="currentMusic"
          v-bind:currentIndex="currentIndex"
          v-bind:paused="paused"
          v-bind:playModel="playModel"
          v-bind:isCollection="isCollection"
          @update:currentTime="$refs.audio.currentTime = $event"
          @playNext="playNext"
          @playPrev="playPrev"
          @togglePlayState="togglePlayState"
          @setPlayModel="setPlayModel"
          @toggleCollection="toggleCollection"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import PlayFullHeader from "@/components/two/PlayFullHeader.vue";
import PlayFullChart from "@/components/two/PlayFullChart.vue";
import PlayFullLyric from "@/components/two/PlayFullLyric.vue";
import PlayFullFooter from "@/components/two/PlayFullFooter.vue";
export default {
  props: ["currentMusic", "currentIndex", "playlist"],
  components: {
    PlayFullHeader,
    PlayFullChart,
    PlayFullLyric,
    PlayFullFooter,
  },
  data: function () {
    return {
      // 定义状态
      paused: null,
      duration: 0,
      currentTime: 0,
      // 是否显示歌词
      isShowLyric: false,
      // 是否播放
      isShowPlayBar: true,
      lyricData: [],
      // 默认播放模式为循环
      playModel: "circle",
      // 判断是否收藏
      isCollection: false,
      coll: {},
    };
  },
  computed: {
    // 播放模式(circle：列表循环、loop：单曲循环、random：随机播放)
    // playMode() {
    // return this.played;
    // },
    // 判断是否单曲循环
    isLoop() {
      if (this.playModel == "loop") {
        return true;
      } else {
        return false;
      }
    },
    //收藏
    collection() {
      if (localStorage.getItem("collection")) {
        let collection = localStorage.getItem("collection");

        return JSON.parse(collection);
      } else {
        return [];
      }
      // this.$emit("update:collection", this.collection);
    },
    // 历史记录
    playHistory() {
      if (localStorage.getItem("playHistory")) {
        let playHistory = localStorage.getItem("playHistory");
        return JSON.parse(playHistory);
      } else {
        return [];
      }
    },
  },

  created() {
    console.log("created", this.currentMusic.song.artists);
    // console.log(this.$refs.usernameInput);
    this.showIsCollection();
    this.playedHistory();
  },
  mounted() {
    let audio = this.$refs.audio;
    // 监听播放状态
    audio.addEventListener("pause", () => {
      console.log("暂停");
      this.paused = true;
      // let id = this.currentMusic.id;
      // this.getLyric(id);
    });
    // 监听播放状态
    audio.addEventListener("play", () => {
      console.log("播放");
      this.paused = false;
      // let id = this.currentMusic.id;
      // this.getLyric(id);
    });

    // var _this = this
    // 监听播放总时间
    audio.addEventListener("durationchange", () => {
      // console.log("当前歌曲时长", this.duration);
      this.duration = audio.duration;
    });
    // 监听时间更新
    audio.addEventListener("timeupdate", () => {
      // console.log("当前播放到", this.currentTime);
      this.currentTime = audio.currentTime;

      let id = this.currentMusic.id;
      this.getLyric(id);
      this.drawCircle(this.currentTime, this.duration);
    });
    //播放下一曲
    audio.addEventListener("ended", () => {
      //判断当前时间来播放模式
      // if (this.currentTime == this.duration) {
      if (this.playModel == "circle") {
        this.circle();
      } else if (this.playModel == "random") {
        this.random();
      }
      // }
      //播放完成下一曲
      this.playNext();
      let id = this.currentMusic.id;
      this.getLyric(id);
    });
  },
  // updated() {
  //   console.log("update", this.$refs.usernameInput);
  // },

  methods: {
    // 划圆
    drawCircle: function (n, total) {
      let canvas = this.$refs.circle;
      let ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, 50, 50);
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
      ctx.arc(25, 25, 20, 0, Math.PI * 2, false); // 绘制
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 0, 0, 0.6)";
      ctx.arc(25, 25, 19, Math.PI * -0.5, Math.PI * ((n / total) * 2 - 0.5), false); // 绘制
      ctx.stroke();
      ctx.closePath();
    },
    // 播放状态
    togglePlayState: function () {
      let audio = this.$refs.audio;
      // console.log(1);
      // console.log("audio", audio);

      if (this.paused) {
        audio.play();
        // this.$refs.playfullchart.$refs.img.classList.remove("stop");
      } else {
        audio.pause();
        // this.$refs.playfullchart.$refs.img.classList.add("stop");
      }
      // console.log(this.$refs.playfullchart);
    },
    //获取歌词
    getLyric(id) {
      var patt = /\[\d{2}:\d{2}\.\d{2,3}\]/gi;
      this.axios({
        method: "GET",
        url: "/lyric",
        params: {
          id,
        },
      })
        .then((result) => {
          if (result.data.code == 200) {
            // console.log("result.data.lrc.lyric =>", result.data);
            if (result.data.lrc.lyric) {
              let lyric = result.data.lrc.lyric;
              var arr = lyric
                .split("\n")
                .filter((e) => e)
                .map((str) => {
                  var time = str.match(patt)[0].replace(/(\[|\])/gi, "");
                  var timeArr = time.split(":");
                  time = Number(timeArr[0]) * 60 + Number(timeArr[1]);
                  var text = str.replace(patt, "");
                  return { time, text };
                });
              this.lyricData = arr;
            }
            // console.log("arr =>", arr);
          }
        })
        .catch((err) => {
          console.log("err =>", err);
        });
    },

    //播放模式
    setPlayModel() {
      if (this.playModel == "circle") {
        this.playModel = "loop";
      } else if (this.playModel == "loop") {
        // this.$store.commit("changePlayMode", "random");
        this.playModel = "random";
      } else if (this.playModel == "random") {
        this.playModel = "circle";
      }
    },
    //计算函数
    calculateNext: function () {
      console.log("333", this.playlist.length);
      // 根据当前播放模式 随机 单曲循环 顺序 顺序循环
      let nextIndex;
      if (this.currentIndex < this.playlist.length - 1) {
        nextIndex = this.currentIndex + 1;
      } else {
        nextIndex = 0;
      }
      return nextIndex;
    },
    calculatePrev: function () {
      // 根据当前播放模式 随机 单曲循环 顺序 顺序循环
      let nextIndex;
      if (this.currentIndex < 1) {
        nextIndex = this.playlist.length - 1;
      } else {
        nextIndex = this.currentIndex - 1;
      }
      return nextIndex;
    },

    //播放下一首函数
    playNext: function () {
      if (this.playModel == "random") {
        this.random();
      } else {
        console.log("下一曲");
        console.log(this.currentMusic);

        let index = this.calculateNext();
        //传送数据
        // 修改歌词
        let id = this.currentMusic.id;
        this.getLyric(id);

        // this.isCollection = false;
        this.$emit("update:music", {
          item: this.playlist[index],
          index,
        });
      }
    },
    //播放上一首函数
    playPrev: function () {
      if (this.playModel == "random") {
        this.random();
      } else {
        console.log("上一曲");
        console.log(this.currentMusic);

        let index = this.calculatePrev();
        // 修改歌词
        let id = this.currentMusic.id;
        this.getLyric(id);
        // this.isCollection = false;
        //传送数据
        this.$emit("update:music", {
          item: this.playlist[index],
          index,
        });
      }
    },
    //列表循环播放
    circle() {
      if (this.songIndex < this.songsListData.length - 1) {
        // console.log("this.songIndex", this.songIndex);
        let index = this.currentIndex + 1;
        let id = this.playlist[index].id;
        //修改歌曲data
        // this.changeSongsData(id);
        //修改歌词
        this.getLyric(id);
        this.$emit("update:music", {
          item: this.playlist[index],
          index,
        });
        //修改歌曲index
        // this.$store.commit("changeSongIndex", index);
      } else {
        let id = this.playlist[0].id;
        //修改歌曲data
        // this.changeSongsData(id);
        //修改歌曲index
        this.$emit("update:music", {
          item: this.playlist[index],
          index,
        });
      }
    },
    //随机播放
    randoms() {
      let length = this.playlist.length;
      let index = Math.floor(Math.random() * length);
      if (index === this.currentIndex) {
        return randoms();
      } else {
        return index;
      }
    },
    random() {
      // let length = this.playlist.length;
      // let index = Math.floor(Math.random() * length);
      // console.log("random index=>", index);
      let index = this.randoms();
      console.log("399", index);
      let id = this.playlist[index].id;
      //修改歌曲data
      // this.changeSongsData(id);
      //修改歌词
      this.getLyric(id);
      //修改歌曲index
      // this.$store.commit("changeSongIndex", index);
      this.$emit("update:music", {
        item: this.playlist[index],
        index,
      });
    },
    // 收藏
    toggleCollection() {
      const result = this.collection.find((item) => {
        return item.id === this.currentMusic.id;
      });
      if (result === undefined) {
        this.collection.push(this.currentMusic);
        localStorage.setItem("collection", JSON.stringify(this.collection));
        this.isCollection = true;
      } else {
        const index = this.collection.indexOf(this.currentMusic);
        this.collection.splice(index, 1);
        localStorage.setItem("collection", JSON.stringify(this.collection));
        this.isCollection = false;
      }
    },
    //查询歌曲是否被收藏
    showIsCollection() {
      //判断音乐
      const result = this.collection.find((item) => {
        return item.id === this.currentMusic.id;
      });
      console.log(result);
      if (result === undefined) {
        this.isCollection = false;
      } else {
        this.isCollection = true;
      }
      console.log(this.isCollection);
    },
    //播放历史
    playedHistory() {
      const result = this.playHistory.find((item) => {
        return item.id === this.currentMusic.id;
      });
      if (result === undefined) {
        if (this.playHistory.length == 15) {
          this.playHistory.shift();
        }
        this.playHistory.push(this.currentMusic);
        localStorage.setItem("playHistory", JSON.stringify(this.playHistory));
        // this.isCollection = true;
      } else {
        const index = this.playHistory.indexOf(this.currentMusic);
        this.playHistory.splice(index, 1);
        localStorage.setItem("playHistory", JSON.stringify(this.playHistory));
        // this.isCollection = false;
      }
      // localStorage.setItem("playHistory", JSON.stringify(playHistory));
    },
  },
  //监听事件

  watch: {
    paused: function (n) {
      this.$emit("update:paused", n);
    },
    currentMusic(n, o) {
      // console.log("522", n);
      this.playedHistory();

      this.showIsCollection(n);
    },

    playModel: function () {
      return this.playModel;
    },
  },
};
</script>

<style scoped lang="less">
.play {
  &.paused {
    .play-bar {
      img.py-img {
        animation-play-state: paused;
      }
      .control {
        span.icon {
        }
      }
    }
  }
  .play-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    background: white;
    display: flex;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
    padding-top: 5px;
    img.py-img {
      width: 40px;
      height: 40px;
      margin: 7px;
      border-radius: 50%;
      animation: playing 6s linear infinite;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
    }
    h5 {
      flex: 1;
      // position: relative;
      margin-top: 5px;
    }
    p {
      position: absolute;
      top: 35px;
      left: 50px;
      .py-span1 {
        font-size: 12px;
        color: #929292;
        // display: block;
      }
    }
    .control {
      position: relative;
      span.icon {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 10px;
        left: 8px;
      }
    }
  }
  .play-full {
    background: linear-gradient(
      to right,
      rgb(56, 56, 56),
      rgb(95, 95, 95),
      rgb(56, 56, 56)
    );
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 12;
    .mask {
      background: url("http://p1.music.126.net/fwXShM46KdIj3hB8_lJ71g==/109951165545588869.jpg");
      background-size: cover;
      background-position: center;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      filter: blur(30px) brightness(0.5);
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
