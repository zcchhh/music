<template>
  <div class="cn-div1">
    <ul class="ht-ul">
      <SongItem
        @update:music="$emit('update:music', $event)"
        @update:playlist="$emit('update:playlist', collectionData)"
        v-for="(song, index) in collectionData"
        :key="index"
        :item="song"
        :currentMusic="$attrs.currentMusic"
        :paused="$attrs.paused"
        >{{ index > 8 ? index + 1 : "0" + (index + 1) }}</SongItem
      >
    </ul>
  </div>
</template>

<script>
import SongItem from "@/components/one/SongItem.vue";
export default {
  data() {
    return {
      collectionData: [],
    };
  },
  components: {
    SongItem,
  },
  created() {
    this.collection()
    console.log(1)
  },
  activated() {
    this.collection()
  },
  methods: {
    //收藏列表
    collection() {
      if (localStorage.getItem("collection")) {
        let collection = JSON.parse(localStorage.getItem("collection"));
        this.collectionData = collection;
      } else {
        this.collectionData = [];
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cn-div1 {
  // position: relative;
  .ht-ul {
    padding-left: 40px;
    padding-right: 10px;
    // margin-top: -10px;
    position: relative;
    top: -30px;
    left: 0px;
  }
}
</style>
