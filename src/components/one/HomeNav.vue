<template>
  <div class="div1">
    <div class="div2">
      <img src="@/assets/icon/wang.png" alt="" />
      <a href="javascript:;" @click.prevent="lzh">
        <img src="@/assets/icon/分类.png" alt="" />
      </a>
    </div>
    <ul id="home-nav">
      <li><router-link to="/">推荐音乐</router-link></li>
      <li><router-link to="/hot">热歌榜</router-link></li>
      <li><router-link to="/search">搜索</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    lzh: function () {
      this.$router.push("/types");
    },
  },
};
</script>

<style lang="less">
.div1 {
  position: fixed;
  width: 100%;
  z-index: 10;
  top: 0;
  left: 0;
  .div2 {
    width: 100%;
    height: 50px;
    background: #d43c33;
    // padding-top: 10px;
    padding-left: 5px;
    padding-right: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #home-nav {
    border-bottom: 1px solid #eeeeee;
    background: #fff;
    height: 41px;
    display: flex;
    li {
      flex: 1;
      text-align: center;
      a {
        text-decoration: none;
        color: black;
        line-height: 40px;
        display: inline-block;
        padding: 0 10px;

        &.router-link-exact-active {
          color: #dd001b;
          border-bottom: 2px solid #dd001b;
        }
      }
    }
  }
}
</style>
