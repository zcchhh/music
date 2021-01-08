<template>
  <section>
    <!-- 推荐歌单前面的红长方形 -->
    <BorderedTitle><slot></slot></BorderedTitle>
    <ul class="playlist">
      <PlayListItem
        v-for="(item, index) in currentRecommends"
        :key="index"
        :item="item"
      />
    </ul>
  </section>
</template>

<script>
import BorderedTitle from "@/components/one/BorderedTitle.vue";
import PlayListItem from "@/components/one/PlayListItem.vue";
export default {
  props: {
    currentRecommends: {
      type: Array,
    },
  },
  components: {
    BorderedTitle,
    PlayListItem,
  },
};
</script>

<style lang="less" scoped>
.playlist {
  display: flex;
  flex-wrap: wrap;
}
</style>
