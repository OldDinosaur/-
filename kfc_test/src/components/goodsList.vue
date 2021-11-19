<template>
  <!-- 商品列表 -->
  <div class="card_list">
    <van-card
      @click.stop="detali(item.pid)"
      v-for="item in sortInfo"
      :key="item.id"
      :price="item.price"
      :desc="item.desc"
      :title="`${item.name}(${item.enname})`"
      :thumb="item.largeImg"
    >
    </van-card>
  </div>
</template>

<script>
export default {
  name: "goodsList",
  props: ["sortInfo"],
  data() {
    return {};
  },

  mounted() {},

  methods: {
    detali(pid) {
      this.$router.push({
        name: "goodsDetali",
        params: {
          pid: pid,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.card_list {
  margin-left: 80px;
  height: 580px;
  overflow: scroll;
}
</style>