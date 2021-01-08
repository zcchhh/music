<template>
  <section>
    <BorderedTitle><slot></slot></BorderedTitle>
    <ul class="ul1">
      <SongItem
        @update:music="$emit('update:music', $event)"
        @update:playlist="$emit('update:playlist', newSongs)"
        v-for="(song, index) in newSongs"
        :key="song.id"
        :item="song"
        :index="index"
        :currentMusic="$attrs.currentMusic"
        :paused="$attrs.paused"
      />
    </ul>
  </section>
</template>

<script>
import BorderedTitle from "@/components/one/BorderedTitle.vue";
import SongItem from "@/components/one/SongItem.vue";
export default {
  props: {
    newSongs: {
      type: Array,
    },
  },
  components: {
    BorderedTitle,
    SongItem,
  },
};
</script>

<style>
.ul1 {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
