<template>
  <div class="search">
    <div class="clear">
      <!-- 搜索框 -->
      <p>
        <i class="u-svg u-svg-srch" @click="searchSongsData(question)"></i>
        <input
          v-model="question"
          @keyup.enter="searchSongsData(question)"
          placeholder="请输入歌曲名或歌手名"
          @search="searchSongsData2(question)"
          @input="inp"
        />
        <!-- ×的图片 -->
        <span @click="clear">
          <img src="@/assets/icon/8.png" alt="" />
        </span>
      </p>
      <div class="first-show" v-if="songsData.length == 0">
        <!-- 热门搜索 -->
        <main>
          <div class="hot-search">
            <p class="title">热门搜索</p>
            <span
              class="hot-search-items"
              v-for="(item, index) in hotSearch"
              :key="index"
              @click="searchHot(item.first)"
            >
              {{ item.first }}
            </span>
          </div>
        </main>
        <!-- 搜索历史 -->
        <footer v-if="searchHistory.length > 0">
          <h4 class="title clearfix">
            搜索历史
            <div class="fr delete-all">
              <!-- <van-icon name="delete" size="16" @click="clearAllHistory" /> -->
              <!-- <div name="delete" size="16" > -->
              <img
                src="@/assets/icon/8.png"
                alt=""
                width="15px"
                height="15px"
                @click="clearAllHistory"
              />
              <!-- </div> -->
            </div>
            <!-- <span @click="clearAllHistory">X</span> -->
          </h4>
          <div class="search-list">
            <ul>
              <li
                class="search-item clearfix"
                v-for="(item, index) in searchHistory"
                :key="index"
              >
                <div class="text fl" @click="searchHot(item)">{{ item }}</div>
                <div class="icon fr" @click="deleteSearchItem(index)">
                  <!-- <van-icon name="cross" size="16" /> -->
                  <div name="cross" size="16"></div>
                </div>
                <!-- <div @click="delete">X</div> -->
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
    <!-- 复用组件，播放歌单 -->
    <ul v-show="bool">
      <SongItem
        @update:music="$emit('update:music', $event)"
        @update:playlist="$emit('update:playlist', songsData)"
        v-for="(song, index) in songsData"
        :key="song.id"
        :item="song"
        :currentMusic="currentMusic"
        :paused="paused"
        >{{ index > 8 ? index + 1 : "0" + (index + 1) }}</SongItem
      >
    </ul>
  </div>
</template>

<script>
import SongItem from "@/components/one/SongItem.vue";
export default {
  props: ["item", "index", "currentMusic", "paused"],
  data() {
    return {
      // 搜索框的值
      question: "",
      // 搜索到的歌
      songsData: [],
      // 控制ul的显示隐藏
      bool: true,
      // 热门搜索
      hotSearch: [],
      // 搜索历史
      searchHistory: [],
    };
  },
  components: {
    SongItem,
  },
  created() {
    // this.$root.isShowLoading = true;
    // 调用热门搜索和历史记录方法
    this.getSearchHot();
    this.getSearchHistory();
  },
  computed: {},
  methods: {
    // 搜索歌曲
    searchSongsData(value) {
      this.setSearchHistory(value);
      this.bool = true;
      //单曲
      // this.axios({
      //   methods: "GET",
      //   url: "/search",
      //   //如果是get请求，参数需要放在params，如果是post，参数放在data
      //   params: {
      //     keywords: value,
      //     // 限制15首
      //     limit: 15,
      //   },
      // })
      //   .then((result) => {
      //     console.log("result =>", result);
      //     if (result.data.code == 200) {
      //       // 转化成相同格式，以便复用组件
      //       let songsData = result.data.result.songs;
      //       for (let i = 0; i < songsData.length; i++) {
      //         this.songsData[i] = {};
      //         this.songsData[i].id = songsData[i].id;
      //         this.songsData[i].name = songsData[i].name;
      //         this.songsData[i].picUrl = songsData[i].artists[0].img1v1Url;
      //         this.songsData[i].song = songsData[i];
      //       }
      //       this.songsData = this.songsData.map((item) => {
      //         return item;
      //       });
      //     }
      //   })
      //   .catch((err) => {
      //     console.log("err =>", err);
      //   });
    },
    // 清除搜索框以及当前播放页面
    clear: function () {
      this.question = "";
      // document.querySelector("ul").style.display='none';
      this.bool = false;
      this.songsData = [];
    },
    // 热门搜索
    getSearchHot() {
      this.axios({
        methods: "GET",
        url: "/search/hot",
      })
        .then((result) => {
          // console.log("result =>", result);
          if (result.data.code == 200) {
            this.hotSearch = result.data.result.hots;
            // console.log("this.hotSearch =>", this.hotSearch);
          }
        })
        .catch((err) => {
          console.log("err =>", err);
        });
    },
    // 获取搜索历史
    getSearchHistory() {
      if (localStorage.getItem("searchHistory")) {
        this.searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
      }
    },
    // 缓存搜索历史
    setSearchHistory(text) {
      // console.log(1);
      for (let key in this.searchHistory) {
        if (this.searchHistory[key] == text) {
          this.searchHistory.splice(key, 1);
        }
      }
      this.searchHistory.unshift(text);
      localStorage.setItem("searchHistory", JSON.stringify(this.searchHistory));
    },
    //点击热门搜索跳转到搜索
    searchHot(text) {
      this.question = text;
      this.searchSongsData(text);
      this.inp(text);
    },
    //点击搜索历史跳转到搜索
    searchSongsData2(text) {
      this.question = text;
      this.searchSongsData2(text);
      this.setSearchHistory(text);
      this.getSearchHistory();
      this.inp(text);
    },
    // 清空历史搜索
    clearAllHistory() {
      this.searchHistory = [];
      localStorage.setItem("searchHistory", JSON.stringify(this.searchHistory));
    },
    // searchSongsData2(value){
    //   this.setSearchHistory(value);
    //   this.getSearchHistory();
    // }
    inp() {
      if (this.question === "") return;
      this.axios({
        methods: "GET",
        url: "/search",
        //如果是get请求，参数需要放在params，如果是post，参数放在data
        params: {
          // keywords: value,
          keywords: this.question,
          // 限制15首
          limit: 30,
        },
      })
        .then((result) => {
          // console.log("result =>", result);
          if (result.data.code == 200) {
            // 转化成相同格式，以便复用组件
            let songsData = result.data.result.songs;
            for (let i = 0; i < songsData.length; i++) {
              this.songsData[i] = {};
              this.songsData[i].id = songsData[i].id;
              this.songsData[i].name = songsData[i].name;
              this.songsData[i].picUrl = songsData[i].artists[0].img1v1Url;
              this.songsData[i].song = songsData[i];
            }
            this.songsData = this.songsData.map((item) => {
              return item;
            });
          }
        })
        .catch((err) => {
          // console.log("err =>", err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  // height: calc(100vh - 125px);
  height: 100%;

  .clear {
    padding: 10px 0;

    margin: 0 auto;
    p {
      position: relative;

      input {
        border: none;
        background-color: whitesmoke;
        width: 100%;
        height: 30px;
        // margin: 0 auto;
        outline: none;
        caret-color: red;
        border-radius: 10px;
        text-indent: 2em;
        // margin-left: 45px;
        border: 2px solid #fff;
        // text-align: center;
      }

      input::-webkit-input-placeholder {
        color: #ccc;
      }

      span {
        height: 15px;
        width: 15px;

        position: absolute;
        top: 7px;
        right: 10px;
      }
    }
    .first-show {
      main {
        margin-bottom: 10px;
        .hot-search {
          padding: 15px 10px 0;

          span {
            display: inline-block;
            height: 32px;
            margin-right: 8px;
            margin-bottom: 8px;
            padding: 0 14px;
            font-size: 14px;
            line-height: 32px;
            color: #333;
            border: 1px solid #edeef0;
            border-radius: 10px;
          }
          .title {
            margin-top: 20px;
            font-size: 12px;
            line-height: 12px;
            color: #666;
            margin-bottom: 10px;
          }
        }
      }
      footer {
        padding: 15px 10px 0;
        h4 {
          font-size: 12px;
          line-height: 12px;
          color: #666;
          position: relative;
          .delete-all {
            position: absolute;
            top: 0;
            left: 325px;
          }
        }
        .search-list {
          height: 45px;
          line-height: 45px;
          font-size: 14px;
        }
      }
    }
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    // background-image: url("@/assets/icon/bgi.jpg");
    background-size: cover;
    padding-left: 10px;
    padding-right: 10px;
  }
}
.u-svg-srch {
  position: absolute;
  left: 0;
  top: 9px;
  margin: 0 8px;
  vertical-align: middle;
}
.u-svg-srch {
  width: 13px;
  height: 13px;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
}
</style>
