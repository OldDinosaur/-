<template>
  <div class="home">
    <!-- 导航栏 -->
    <div>
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>

    <div class="goods_all">
      <!-- 图片 -->
      <div class="img_box">
        <img :src="articleDetali.large_img" alt="" />
      </div>
      <!-- 商品信息 -->
      <div class="goods_Info">
        <!-- 商品名称 -->
        <div class="goods__name">
          {{ articleDetali.name }}<van-icon name="like" />
        </div>
        <div class="goods_box">
          <!-- 商品温度 -->
          <p v-show="goodsTemp[0] != ''">{{ articleDetali.tem_desc }}:</p>
          <div>
            <van-button
              @click="selectTemp(index, item)"
              :type="temp == index ? 'info' : 'default'"
              v-show="item != ''"
              round
              v-for="(item, index) in goodsTemp"
              :key="index"
              >{{ item }}</van-button
            >
          </div>

          <!-- 商品糖 -->
          <p v-show="goodsSugar[0] != ''">{{ articleDetali.sugar_desc }}:</p>
          <div>
            <van-button
              v-show="item != ''"
              round
              @click="selectSugar(index, item)"
              :type="sugar == index ? 'info' : 'default'"
              v-for="(item, index) in goodsSugar"
              :key="index"
              >{{ item }}</van-button
            >
          </div>

          <!-- 商品奶油 -->
          <p v-show="goodsCream[0] != ''">{{ articleDetali.cream_desc }}:</p>
          <div>
            <van-button
              v-show="item != ''"
              round
              @click="selectCream(index, item)"
              :type="cream == index ? 'info' : 'default'"
              v-for="(item, index) in goodsCream"
              :key="index"
              >{{ item }}</van-button
            >
          </div>

          <!-- 商品奶 -->
          <p v-show="goodsMilk[0] != ''">{{ articleDetali.milk_desc }}:</p>
          <div>
            <van-button
              round
              @click="selectMilk(index, item)"
              :type="milk == index ? 'info' : 'default'"
              v-show="item != ''"
              v-for="(item, index) in goodsMilk"
              :key="index"
              >{{ item }}</van-button
            >
          </div>
        </div>

        <hr />
        <div class="goods_desc">
          <h3>商品描述</h3>
          <div>{{ articleDetali.desc }}</div>
        </div>

        <hr />
        <div class="goods_price">
          <span>￥{{ (articleDetali.price * goodsCount).toFixed(2) }}</span>

          <van-stepper
            class="goods_count"
            v-model="goodsCount"
            theme="round"
            button-size="22"
            min="1"
            max="99"
            integer
          />
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div>
      <van-goods-action>
        <van-goods-action-icon
          icon="cart-o"
          :badge="allCartCount"
          text="购物车"
          @click="toCart"
        />
        <van-goods-action-icon
          @click="likeing"
          v-show="islike"
          icon="star"
          text="已收藏"
          color="#ff5000"
        />
        <van-goods-action-icon
          @click="notlike"
          v-show="!islike"
          icon="star-o"
          text="收藏"
          color="#1E1E1E"
        />

        <van-goods-action-button
          @click="onsubmit"
          color="#5DA7F7"
          type="warning"
          text="加入购物车"
        />
        <van-goods-action-button
          @click="buyNow"
          color="#1989FA"
          type="danger"
          text="立即购买"
        />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
//导入序列化方法
import { utils } from "../../assets/js/Utils";
//导入vuex辅助函数
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "goodsDetali",
  data() {
    return {
      // 选择定义
      // 温度
      temp: 0,
      //糖
      sugar: 0,
      //奶油
      cream: 0,
      //奶
      milk: 0,
      //数量
      goodsCount: 1,
      //规则
      rule: [],
      //收藏
      islike: false,
      //购物车数量
      // allShopcartCount: 0,
    };
  },

  computed: {
    //获取sortDetali内state内容
    ...mapState("sortDetali", ["articleDetali"]),
    ...mapState("sortDetali", [
      "goodsTemp",
      "goodsSugar",
      "goodsCream",
      "goodsMilk",
      "allCartCount",
    ]),
    //
    ...mapGetters("userToken", ["getSortage"]),
    // //商品id
    pid() {
      return this.$route.params.pid;
    },
  },
  created() {
    // 自定义加载图标
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    let info = { appkey: this.appkey, pid: this.pid };
    this.getarticleDetali(info).then(() => {
      this.$toast.clear();
    });
    //查询是否收藏
    this.axios({
      method: "GET",
      url: "/findlike",
      params: {
        pid: this.pid,
        appkey: this.appkey,
        tokenString: this.getSortage,
      },
    }).then((res) => {
      if (res.data.result.length != 0) this.islike = true;
    });
    //查询购物车商品总数量数量
    this.findAllCartCount();
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    //获取sortDetali内异步方法,
    ...mapActions("sortDetali", ["getarticleDetali", "findAllCartCount"]),

    // 温度选择
    selectTemp(index, item) {
      this.temp = index;
    },
    //糖选择
    selectSugar(index, item) {
      this.sugar = index;
    },
    //奶油选择
    selectCream(index, item) {
      this.cream = index;
    },
    // 奶选择
    selectMilk(index, item) {
      this.milk = index;
    },
    //最终选择
    onsubmit() {
      //选择好的类型添加到rule中保存
      this.rule.push(
        this.goodsTemp[this.temp],
        this.goodsSugar[this.sugar],
        this.goodsCream[this.cream],
        this.goodsMilk[this.milk]
      );
      //过滤内容为空的类型
      let newRule = this.rule.filter((value) => {
        return value != "";
      });
      //最后拼接格式
      let lastRule = newRule.join("/");
      //还原空数组
      this.rule = [];
      //发送请求，加入购物车
      this.axios({
        method: "POST",
        url: "/addShopcart",
        data: utils.querystring({
          pid: this.pid,
          count: this.goodsCount,
          rule: lastRule,
          appkey: this.appkey,
          tokenString: this.getSortage,
        }),
      }).then((res) => {
        //加入购物车成功后重新获取所有购物车商品数量
        this.findAllCartCount();
        //更新当前选中商品
        console.log("1" + [res.data.sid]);
        this.setSids([res.data.sid]);
      });
    },
    //收藏
    notlike() {
      this.islike = true;
      this.axios({
        method: "POST",
        url: "/like",
        data: utils.querystring({
          pid: this.pid,
          appkey: this.appkey,
          tokenString: this.getSortage,
        }),
      }).then((res) => {
        console.log(res.data);
      });
    },
    //取消收藏
    likeing() {
      this.islike = false;
      this.axios({
        method: "POST",
        url: "/notlike",
        data: utils.querystring({
          pid: this.pid,
          appkey: this.appkey,
          tokenString: this.getSortage,
        }),
      }).then((res) => {
        console.log(res.data);
      });
    },
    //转到购物车
    toCart() {
      this.$router.push("/main/shopbag");
      sessionStorage.setItem("active", 2);
    },
    //从sortCart中获取设置所选商品及合计金额
    ...mapMutations("sortCart", ["setSids"]),
    //立即购买
    buyNow() {
      //选择好的类型添加到rule中保存
      this.rule.push(
        this.goodsTemp[this.temp],
        this.goodsSugar[this.sugar],
        this.goodsCream[this.cream],
        this.goodsMilk[this.milk]
      );
      //过滤内容为空的类型
      let newRule = this.rule.filter((value) => {
        return value != "";
      });
      //最后拼接格式
      let lastRule = newRule.join("/");
      //还原空数组
      this.rule = [];
      //发送请求，加入购物车
      this.axios({
        method: "POST",
        url: "/addShopcart",
        data: utils.querystring({
          pid: this.pid,
          count: this.goodsCount,
          rule: lastRule,
          appkey: this.appkey,
          tokenString: this.getSortage,
        }),
      }).then((res) => {
        //加入购物车成功后重新获取所有购物车商品数量
        this.findAllCartCount();
        //更新当前选中商品
        this.setSids([res.data.sid]);
        // 更新完成后跳转
        this.$router.push({
          name: "orderBalance",
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.img_box {
  width: 100%;
  height: 250px;
  // background-color: rgb(247, 247, 247);
  position: relative;
  padding: 0;
  margin: 0;
  > img {
    width: 100%;
    height: 100%;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

.goods_all {
  position: absolute;
  // 滚动条
  width: 100%;
  overflow: scroll;
}
//商品信息
.goods_Info {
  height: 310px;
  width: 100%;

  //商品名称
  .goods__name {
    color: #5da7f7;
    font-size: 16px;
    padding: 15px 10px;
  }
  .goods_box {
    p {
      font-size: 16px;
      padding: 10px;
      margin: 0;
      width: 60px;
      float: left;
      position: absolute;
    }
    div {
      position: relative;
    }
    // 按钮
    .van-button {
      line-height: 35px;
      height: 35px;
      width: 90px;
      left: 60px;
      margin: 5px;
    }
  }
  .good__name {
    color: rgb(93, 167, 247);
    padding: 5px 10px;
    // font-size: 16px;
  }
  .goods_price {
    display: inline-block;
    color: rgb(93, 167, 247);
    font-size: 18px;
    padding-bottom: 25px;
    margin-top: 10px;
    position: relative;
    //商品价格
    span {
      display: inline-block;
    }
    //商品数量
    .goods_count {
      margin-left: 200px;
      float: right;
    }
  }
  //商品描述
  .goods_desc {
    position: relative;
    padding: 5px 10px;
    > div {
      font-size: 13px;
      white-space: pre-wrap;
      // word-break: keep-all;
      color: #666666;
    }
  }
}
</style>