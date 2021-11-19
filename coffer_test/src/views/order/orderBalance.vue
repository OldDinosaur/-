<template>
  <div class="all_box">
    <!-- 导航栏 -->
    <div>
      <van-nav-bar
        title="提交订单"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>

    <!-- 收货地址 -->
    <div class="address" @click="selectAdd">
      {{ goodsAddress }}
    </div>
    <van-action-sheet v-model="show" title="选择收货地址">
      <div class="content">
        <van-address-list
          v-model="chosenAddressId"
          :list="allList"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
          @select="select_address"
        />
      </div>
    </van-action-sheet>

    <!-- 商品展示 -->
    <div class="goods_box">
      <div class="goods_card" v-for="(item, index) in goodsList" :key="index">
        <img :src="item.small_img" alt="" />
        <div class="goods_info">
          <p class="goods_name">
            {{ item.name }}<span>￥{{ item.price }}</span>
          </p>
          <p class="goods_elname">{{ item.enname }}</p>
          <p class="goods_rule">
            {{ item.rule }}<span>X{{ item.count }}</span>
          </p>
        </div>
      </div>

      <!-- 统计 -->
      <p class="goods_stat">
        共计{{ allCount }}件商品 合计<span>￥{{ allAmount }}</span>
      </p>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <van-submit-bar
        :price="allAmount * 100"
        @submit="submitOrder"
        button-text="立即结算"
      >
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { utils } from "../../assets/js/Utils";
export default {
  name: "orderbalance",

  data() {
    return {
      goodsList: [],
      show: false,
      chosenAddressId: "",
      goodsAddress: "",
    };
  },
  computed: {
    ...mapState("sortCart", ["sids"]),
    ...mapState("userAddress", ["allAddress", "nowAddress"]),
    ...mapGetters("userAddress", ["getDefaultAddress"]),

    //计算渲染的地址列表
    allList() {
      let info = this.allAddress.map((val) => {
        return {
          id: val.aid,
          name: val.name,
          tel: val.tel,
          address: val.province + val.city + val.county + val.addressDetail,
          isDefault: val.isDefault === 1 ? true : false,
        };
      });
      //判断是否选中，选中则提到最前面
      for (let i = 0; i < info.length; i++) {
        if (info[i].id === this.chosenAddressId) {
          //地址显示为当前选中地址
          this.goodsAddress = info[i].address;
          info.unshift(info[i]);
          info.splice(i + 1, 1);
        }
      }

      return info;
    },

    //总数量
    allCount() {
      if (this.goodsList !== null || this.goodsList !== []) {
        let sum = 0;
        this.goodsList.forEach((goods) => {
          sum += goods.count;
        });
        return sum;
      } else {
        return 0;
      }
    },
    //合计价格
    allAmount() {
      if (this.goodsList !== null || this.goodsList !== []) {
        let sum = 0;
        this.goodsList.forEach((goods) => {
          sum += goods.count * goods.price;
        });
        return sum;
      } else {
        return 0;
      }
    },
  },

  mounted() {},
  created() {
    //查询地址
    this.findAllAddress({
      appkey: this.appkey,
      tokenString: localStorage.getItem("token"),
    }).then(() => {
      //绑定默认地址
      this.chosenAddressId = this.getDefaultAddress.aid;
    });
    //查询商品
    console.log(this.sids);
    this.axios({
      method: "GET",
      url: "/commitShopcart",
      params: {
        appkey: this.appkey,
        tokenString: localStorage.getItem("token"),
        sids: JSON.stringify(this.sids),
      },
    }).then((res) => {
      this.goodsList = res.data.result;
    });
  },
  methods: {
    //获取userAddress内异步方法,
    ...mapActions("userAddress", ["findAllAddress", "findNowAddress"]),
    //   返回按钮
    onClickLeft() {
      this.$router.back();
    },
    //立即结算
    submitOrder() {
      this.axios({
        method: "POST",
        url: "/pay",
        data: utils.querystring({
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
          sids: JSON.stringify(this.sids),
          phone: this.nowAddress.tel,
          address: this.goodsAddress,
          receiver: this.nowAddress.name,
        }),
      }).then((res) => {
        console.log(res.data);
        this.$router.replace({
          name: "shopbag",
        });
      });
    },
    //新增地址
    onAdd() {
      this.$router.push({ name: "addAddress" });
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
    //选择收货地址
    select_address(val) {
      this.show = false;
      //更新地址显示
      this.goodsAddress = val.address;
      //更新vuex中的选中地址
      this.findNowAddress({
        appkey: this.appkey,
        tokenString: localStorage.getItem("token"),
        aid: val.id,
      }).then(() => {
        console.log(this.nowAddress);
      });
    },
    //点击地址
    selectAdd() {
      this.show = true;
      this.findAllAddress({
        appkey: this.appkey,
        tokenString: localStorage.getItem("token"),
      }).then(() => {});
    },
  },
  beforeRouteLeave(to, from, next) {
    //当返回的是商品详情页
    if (to.name === "goodsDetali") {
      //删除当前的订单;
      this.axios({
        method: "POST",
        url: "/removeShopcart",
        data: utils.querystring({
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
          sids: JSON.stringify(this.sids),
        }),
      }).then((res) => {
        next();
      });
    } else {
      next();
    }
  },
};
</script>

<style lang="less" scoped>
.all_box {
  height: calc(100vh - 50px);
  overflow-y: scroll;
}
//地址
.address {
  background: #ffffff;
  margin: 10px 10px;
  padding: 10px 10px;
  font-size: 16px;
  border-radius: 10px;
}
//地址选择
.content {
  padding: 16px 16px;

  .user_address-info {
    //人名跟电话
    .user_name {
      font-size: 15px;
      padding: 0;
      width: 100%;
    }
    // 地址
    .user_address {
      width: 100%;
    }
  }
  //新增地址按钮
  .adderss_btn {
    width: 100%;
    height: 40px;
  }
}
// 商品
.goods_box {
  background-color: #ffffff;
  margin: 10px 10px;
  padding: 10px 10px;
  border-radius: 10px;

  //   商品统计
  .goods_stat {
    color: #989898;
    margin: 5px 0px;
    font-size: 12px;
    text-align: right;
    span {
      color: black;
      font-size: 16px;
    }
  }
  //商品卡片
  .goods_card {
    background-color: white;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    //图片
    img {
      padding: 5px 5px;
      width: 80px;
      height: 80px;
    }
    //其他信息
    .goods_info {
      position: relative;
      width: 100%;
      height: 100%;
      //商品名
      .goods_name {
        display: inline-block;
        font-size: 15px;
        width: 100%;
        margin: 5px 0px;
        //商品价格
        span {
          font-size: 13px;
          float: right;
        }
      }
      //商品英文名
      .goods_elname {
        display: inline-block;
        width: 100%;
        margin: 5px 0px;
        font-size: 12px;
        color: #989898;
      }
      //商品规格
      .goods_rule {
        display: inline-block;
        width: 100%;
        margin: 5px 0px;
        font-size: 12px;
        color: #989898;
        span {
          float: right;
        }
      }
    }
  }
}
</style>