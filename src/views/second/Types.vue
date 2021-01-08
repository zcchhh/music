<template>
  <div class="ts-div1">
    <div class="ts-div2">
      <!-- <a href="@/views/first/Recommend.vue"><img src="@/assets/icon/6.png" alt="" /></a> -->
      <div @click="back"><img src="@/assets/icon/6.png" alt="" /></div>

      <router-link to="/types/collection" tag="div" class="ts-div3"
        ><span :class="[isActive ? 'active' : '']" @click="goCollection">我的收藏</span>
      </router-link>
      <router-link to="/types/recoder" tag="div" class="ts-div4"
        ><span :class="[isActive ? '' : 'active']" @click="goPlayHistory"
          >播放记录</span
        ></router-link
      >
    </div>
    <router-view
      @update:music="$emit('update:music', $event)"
      @update:playlist="$emit('update:playlist', $event)"
      :currentMusic="$attrs.currentMusic"
      :paused="$attrs.paused"
    ></router-view>
    <ul id="home-nav">
      <!-- <li><router-link to="/">推荐音乐</router-link></li> -->
      <!-- <li><router-link to="/types/collection" tag="div">我的收藏</router-link></li> -->
      <!-- <li><router-link to="/types/recoder" tag="div">播放记录</router-link></li> -->
      <!-- <router-view></router-view> -->
    </ul>
  </div>
</template>

<script>
export default {
  // props: ["collection"],
  data() {
    return {
      isActive: true,
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    goCollection() {
      console.log(111);
      this.isActive = true;
    },
    goPlayHistory() {
      console.log(222);
      this.isActive = false;
    },
  },
};
</script>

<style lang="less" scoped>
.ts-div1 {
  position: relative;
  .ts-div2 {
    position: absolute;
    top: -91px;
    left: 0;
    height: 50px;
    background: #d43c33;
    width: 100%;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    color: #000;
    overflow: hidden;
    padding-top: 10px;
    .ts-div3 {
      float: left;
      height: 100%;
      width: 150px;
      text-align: center;
    }
    .ts-div4 {
      float: right;
      height: 100%;
      width: 150px;
      text-align: center;
    }
    img {
      float: left;
      position: relative;
      top: -5px;
    }
  }
}
.active {
  // border-bottom: 1px solid #fff;
  // box-sizing: border-box;
  color: #fff;
}
</style>
