<template>
  <!-- 点击传送歌单和当前音乐，以及索引 -->
  <li
    class="song-item"
    @click="
      $emit('update:music', { item, index });
      $emit('update:playlist');
    "
  >
    <div class="info">
      <!-- 放热歌榜前面的索引 -->
      <span class="si-span"><slot></slot></span>
      <!-- 歌名 -->
      <h5>{{ item.name }}</h5>
      <p>
        <!-- 小图标 -->
        <!-- <a href="javascript:;" class="u-hmsprt"></a> -->
        <span class="u-hmsprt"></span>
        <!-- 歌手名 -->
        <span v-for="(artist, index) in item.song.artists" :key="index">
          <template v-if="index">/ </template>{{ artist.name }}
        </span>
      </p>
    </div>
    <!-- 播放红杆 图标-->
    <div class="icon">
      <span
        class="playing"
        :class="{ paused: paused }"
        v-if="currentMusic && currentMusic.id === item.id"
      >
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </span>
      <!-- 默认未播放时的图标 -->
      <span v-else>
        <img src="@/assets/icon/1.png" alt="" />
      </span>
    </div>
  </li>
</template>

<script>
export default {
  // 从组件拿的值
  props: ["item", "currentMusic", "paused", "index"],
};
</script>

<style lang="less">
// 设置语言为less
li.song-item {
  display: flex;

  border-bottom: 1px solid #efeff0;

  // width: 310px;
  .info {
    flex: 1;
    position: relative;
    .si-span {
      position: absolute;
      top: 15px;
      left: -30px;
      font-size: 18px;
    }
    h5 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 250px;
    }
    p {
      font-size: 12px;
      color: #888888;
      margin: 5px 0;
      .u-hmsprt {
        background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=)
          no-repeat;
        background-size: 166px 97px;
        display: inline-block;
        width: 12px;
        height: 8px;
        margin-right: 4px;
      }

      h5 {
        margin-top: 5px;
      }
    }
  }
  .icon {
    width: 30px;
    height: 30px;
    // line-height: 30px;
    margin-top: 10px;
    .playing {
      display: flex;
      //  等距离对其
      justify-content: space-around;
      //  底端对齐
      align-items: flex-end;
      i {
        width: 3px;
        height: 25px;
        background: red;
        //  设置变换的起点位置
        transform-origin: center bottom;
        //  动画
        animation: playing 0.6s linear -0.2s infinite alternate-reverse;
        &:first-of-type {
          //设置动画延迟时间
          animation-delay: 0s;
        }
        &:last-of-type {
          animation-delay: -0.4s;
        }
      }
      &.paused {
        i {
          //  动画播放状态
          animation-play-state: paused;
        }
      }
    }
  }
}
@keyframes playing {
  from {
    transform: scaleY(1);
  }
  to {
    transform: scaleY(0.2);
  }
}
</style>
