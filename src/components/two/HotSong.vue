<template>
  <div class="hotTop">
    <div class="hotopct">
      <div class="u-hmsprt hoticon"></div>
      <div class="hottime">
        <span>更新日期</span>
        <span>01月11号</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.hotTop {
  position: relative;
  padding-top: 38.9%;
  overflow: hidden;
  background: url(//s3.music.126.net/mobile-new/img/hot_music_bg_2x.jpg?f01a252…=)
    no-repeat;
  background-size: contain;
  &::after {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .hotopct {
    display: flex;

    flex-direction: column;

    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    padding-left: 20px;
    box-sizing: border-box;

    .u-hmsprt {
      background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=)
        no-repeat;
      background-size: 166px 97px;
      &.hoticon {
        width: 142px;
        height: 67px;
        background-position: -24px -30px;
      }
    }
    .hottime {
      margin-top: 10px;
      color: hsla(0, 0%, 100%, 0.8);
      font-size: 12px;

      transform: scale(0.91);

      transform-origin: left top;
    }
  }
}
</style>
