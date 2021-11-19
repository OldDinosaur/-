<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000">
      <van-swipe-item v-for="(goods, index) in goodsList" :key="index">
        <img class="img-t" v-lazy="goods.bannerImg" />
        <!-- <img :src="goods.bannerImg" /> -->
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "carous",
  data() {
    return {
      //商品列表
      goodsList: [],
    };
  },
  created() {
    this.axios({
      method: "GET",
      url: "/banner",
      params: {
        appkey: this.appkey,
      },
    }).then((res) => {
      this.goodsList = res.data.result;
    });
  },
};
</script>

<style lang="less" scoped>
//轮播图

.my-swipe .van-swipe-item {
  color: #fff;
  width: 100%;
  height: 200px;
  font-size: 20px;
  line-height: 150px;
  text-align: center;

  // background-color: #39a9ed;
}

.img-t {
  width: 96%;
  height: 100%;
  border-radius: 10px;
}
</style>