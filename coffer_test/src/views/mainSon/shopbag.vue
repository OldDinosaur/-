<template>
  <div>
    <!-- 无商品显示 -->
    <div v-if="allCartCount === 0 || allCartCount === null">
      <van-empty
        class="custom-image"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        description="购物车没有商品，赶紧去逛一逛！"
      />
    </div>

    <!-- 主体 -->
    <div v-else>
      <!-- 订单内容 -->
      <ordercontent> </ordercontent>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ordercontent from "../../components/shopCart/orderContent.vue";

export default {
  name: "shopbag",
  components: { ordercontent },
  data() {
    return {};
  },

  computed: {
    ...mapState("sortDetali", ["allCartCount"]),
  },
  created() {
    // 获取购物车总数
    this.findAllCartCount();
  },

  methods: {
    //获取sortDetali内异步方法,
    ...mapActions("sortDetali", ["findAllCartCount"]),
  },
};
</script>

<style lang="less" scoped>
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
</style>