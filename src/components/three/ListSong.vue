<template>
  <div class="ls-div1" :style="{ backgroundImage: `url('${item.coverImgUrl}')` }">
    <!-- <span class="ls-icon"></span> -->
    <!-- <a href="@/views/first/PlayList.vue"> -->
    <div @click="back">
      <img src="@/assets/icon/6.png" alt="" />
    </div>
    <!-- </a> -->
    <span class="ls-span1">歌单</span>
    <span class="ls-span2">{{ item.name }}</span>
    <!-- <img class="ls-img1" :src="item.picUrl" alt="" /> -->
    <span class="ls-span3">{{ item.playCount | formatPlayCount }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  // 过滤时间
  filters: {
    formatPlayCount: function (value) {
      return (value / 10000).toFixed(1) + "万";
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="less">
.ls-div1 {
  width: 100%;
  height: 281.2px;
  background-size: 100% 130%;
  background-position: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  a {
    position: absolute;
    top: 5px;
    left: 0;
  }
  .ls-span1 {
    color: #fff;
    font-size: 20px;
    position: absolute;
    top: 4px;
    left: 40px;
  }
  .ls-span2 {
    color: #fff;
    // margin-top: 100px;
    // display: inline-block;
    position: absolute;
    top: 225px;
    left: 10px;
  }
  .ls-span3 {
    color: #fff;
    position: absolute;
    top: 250px;
    left: 10px;
    font-size: 12px;
  }
}
</style>
