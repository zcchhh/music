<template>
  <div @click="$emit('toggle-show-lyric')" class="box">
    <!-- <ul class="lyric" :style="{ marginTop: marginTopValue + 'px' }"> -->
    <ul class="lyric" ref="lyricText" :style="{ marginTop: marginTopValue + 'px' }">
      <li
        v-for="(item, index) in lyricData"
        :key="index"
        class="one-text"
        :class="{ active: index == indexOne - 1 }"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      //歌词位置
      marginTopValue: null,
      indexOne: null,
    };
  },
  methods: {},

  props: ["lyricData", "currentMusic", "currentTime"],
  mounted() {
    console.log("111", this.$refs.lyricText);
  },
  watch: {
    currentTime: function () {
      this.indexOne = this.lyricData.findIndex((item) => {
        return item.time > this.currentTime;
      });

      this.marginTopValue = -30 * (this.indexOne - 1) + 120;
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  margin-top: 100px;
  width: 300px;
  height: 300px;
  font-size: 14px;
  // color: #c7c7c7;
  overflow: hidden;
  margin-top: 100px;
  position: relative;
}
.lyric {
  transition: all 1s;
  position: absolute;
  left: 60%;
  top: 0;
  transform: translateX(-50%);
  color: #ff7c26;

  .one-text {
    height: 30px;
    line-height: 30px;
    width: 300px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
li.active {
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  text-shadow: 0 0 1px #c9443b;
}
</style>
