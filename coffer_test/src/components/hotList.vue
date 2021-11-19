<template>
  <div>
    <div class="biaoti">
      <span>热卖推荐</span>
    </div>
    <!-- 热卖 -->
    <div class="recommend">
      <div
        class="hot_box"
        @click.stop="detali(hotgoods.pid)"
        v-for="hotgoods in hotList"
        :key="hotgoods.id"
      >
        <div class="hot_img">
          <span class="hot_size">hot</span>
          <img :src="hotgoods.smallImg" alt="" />
        </div>
        <p class="hot_name">{{ hotgoods.name }}</p>
        <p
          :class="hide == true ? 'hot_elname' : 'hot_elname2'"
          @click.stop="hide = !hide"
        >
          {{ hotgoods.enname }}
        </p>
        <p class="hot_price">
          ￥<span>{{ hotgoods.price }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hotList",

  data() {
    return {
      hide: true,
      value: "",
      //热卖商品
      hotList: [],
    };
  },

  created() {
    // 自定义加载图标
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    //异步请求热卖商品
    this.axios({
      method: "GET",
      url: "/typeProducts",
      params: {
        appkey: this.appkey,
        key: "isHot",
        value: 1,
      },
    }).then((res) => {
      if (res.data.statusCode === 404) {
        this.$toast.fail(res.data.msg);
      }
      this.$toast.clear();
      this.hotList = res.data.result;
      // console.log(res.data.result);
    });
  },

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
//热卖推荐
.biaoti {
  text-align: left;
  // background-color: #ffffff;
  padding: 10px 0;
  margin-top: 10px;
  span {
    // position: relative;
    // display: inline-block;

    padding: 5px 10px;
    background-color: rgb(95, 108, 231);
    color: white;
    border-top-right-radius: 10px;
  }
}
//热卖商品
.recommend {
  width: 100%;
  height: 320px;
  display: flex;

  //向下
  flex-wrap: wrap;
  //向两边对齐
  justify-content: space-between;
  // 滚动条
  overflow: scroll;
  // 每个hot盒子
  .hot_box {
    margin: 5px;
    padding: 5px 12px;
    border-radius: 10px;
    background-color: #ffffff;
    box-sizing: border-box;
    position: relative;
    //图片盒子
    .hot_img {
      position: relative;
      //hot字
      .hot_size {
        display: block;
        position: absolute;
        color: white;
        left: 10px;
        background-color: red;
        padding: 5px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
      // 图片
      > img {
        width: 152px;
        height: 152px;
        border-radius: 10px;
      }
    }
    > p {
      display: block;
      font-size: 16px;
      margin: 0;
    }
    .hot_name {
      padding: 5px;
    }
    //隐藏名字
    .hot_elname {
      padding: 5px;
      color: #bababa;
      width: 140px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    // 显示名字
    .hot_elname2 {
      padding: 5px;
      color: #bababa;
      width: 140px;
      overflow: visible;
      text-overflow: ellipsis;
      // white-space: nowrap;
    }

    .hot_price {
      padding: 5px;
      color: blue;
      font-weight: bold;
    }
  }
}
</style>