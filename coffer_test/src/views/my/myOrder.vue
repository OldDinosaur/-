<template>
  <div>
    <!-- 导航 -->
    <div>
      <van-nav-bar
        title="订单"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <!-- 标签 -->
    <div>
      <van-tabs v-model="active" @click="selectState">
        <van-tab title="全部" class="order_views">
          <!-- 商品展示 -->
          <div class="goods_box" v-for="item in sortOrder" :key="item.id">
            <div class="goods_head">
              <span>{{ item.id }}</span>
              <span
                class="goods_state"
                v-if="item.status == 1"
                @click="confirmReceipt(item.id)"
              >
                确认收货
              </span>
              <span class="goods_state" v-else
                >已收货 <van-icon @click="deleteOrder(item.id)" name="delete-o"
              /></span>
            </div>
            <van-divider />
            <div class="goods_card" v-for="goods in item.list" :key="goods.id">
              <img :src="goods.smallImg" alt="" />
              <div class="goods_info">
                <p class="goods_name">
                  {{ goods.name }}<span>￥{{ goods.price }}</span>
                </p>
                <p class="goods_elname">{{ goods.enname }}</p>
                <p class="goods_rule">
                  {{ goods.rule }}<span>X{{ goods.count }}</span>
                </p>
              </div>
            </div>
            <!-- 统计 -->
            <p class="goods_stat">
              <span class="order_time">{{ item.time }}</span
              >共计{{ item.count }}件商品合计<span>￥{{ item.price }}</span>
            </p>
          </div>
        </van-tab>
        <van-tab title="待收货" class="order_views">
          <!-- 商品展示 -->
          <div class="goods_box" v-for="item in sortOrder" :key="item.id">
            <div class="goods_head">
              <span>{{ item.id }}</span>
              <span
                class="goods_state"
                v-if="item.status == 1"
                @click="confirmReceipt(item.id)"
              >
                确认收货
              </span>
              <span class="goods_state" v-else
                >已收货 <van-icon @click="deleteOrder(item.id)" name="delete-o"
              /></span>
            </div>
            <van-divider />
            <div class="goods_card" v-for="goods in item.list" :key="goods.id">
              <img :src="goods.smallImg" alt="" />
              <div class="goods_info">
                <p class="goods_name">
                  {{ goods.name }}<span>￥{{ goods.price }}</span>
                </p>
                <p class="goods_elname">{{ goods.enname }}</p>
                <p class="goods_rule">
                  {{ goods.rule }}<span>X{{ goods.count }}</span>
                </p>
              </div>
            </div>
            <!-- 统计 -->
            <p class="goods_stat">
              <span class="order_time">{{ item.time }}</span
              >共计{{ item.count }}件商品合计<span>￥{{ item.price }}</span>
            </p>
          </div></van-tab
        >
        <van-tab title="已收货" class="order_views">
          <!-- 商品展示 -->
          <div class="goods_box" v-for="item in sortOrder" :key="item.id">
            <div class="goods_head">
              <span>{{ item.id }}</span>
              <span
                class="goods_state"
                v-if="item.status == 1"
                @click="confirmReceipt(item.id)"
              >
                确认收货
              </span>
              <span class="goods_state" v-else
                >已收货 <van-icon @click="deleteOrder(item.id)" name="delete-o"
              /></span>
            </div>
            <van-divider />
            <div class="goods_card" v-for="goods in item.list" :key="goods.id">
              <img :src="goods.smallImg" alt="" />
              <div class="goods_info">
                <p class="goods_name">
                  {{ goods.name }}<span>￥{{ goods.price }}</span>
                </p>
                <p class="goods_elname">{{ goods.enname }}</p>
                <p class="goods_rule">
                  {{ goods.rule }}<span>X{{ goods.count }}</span>
                </p>
              </div>
            </div>
            <!-- 统计 -->
            <p class="goods_stat">
              <span class="order_time">{{ item.time }}</span> 共计{{
                item.count
              }}件商品合计<span>￥{{ item.price }}</span>
            </p>
          </div></van-tab
        >
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { utils } from "../../assets/js/Utils";
export default {
  name: "myOrder",

  data() {
    return {
      active: 0,
      orderList: [],
    };
  },
  computed: {
    //将相同订单号的商品一起保存（orderList为请求返回的所有订单列表）
    sortOrder() {
      // 保存oid
      var oidArray = [];
      //处理后数组
      var newArr = [];
      //遍历请求返回的订单列表
      this.orderList.forEach((ele, i) => {
        //oidArray是否包含当前oid
        if (oidArray.indexOf(ele.oid) === -1) {
          //不包含则向添加下列对象newArr数组中
          newArr.push({
            time: ele.updatedAt,
            id: ele.oid,
            count: ele.count,
            price: parseInt(ele.price),
            status: ele.status,
            //保存同一订单号的商品信息
            list: [ele],
          });
          //将当前oid加入oidArray是否包含当前oid中
          oidArray.push(ele.oid);
        } else {
          for (let k = 0; k < newArr.length; k++) {
            if (newArr[k].id === ele.oid) {
              //当newArr中已有相同订单编号则在list中添加
              newArr[k].list.push(ele);
              //数量
              newArr[k].count += ele.count;
              //价格
              newArr[k].price += parseInt(ele.price);
            }
          }
        }
      });
      return newArr;
    },
  },
  updated() {},
  created() {
    //查询订单0：全部，1：待收货，2：已收货
    this.findOrder(0);
  },

  methods: {
    //订单查询
    findOrder(status) {
      this.axios({
        method: "GET",
        url: "/findOrder",
        params: {
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
          status,
        },
      }).then((res) => {
        this.orderList = res.data.result;
      });
    },
    //返回
    onClickLeft() {
      this.$router.back();
    },
    //标签选中
    selectState(name, title) {
      this.findOrder(name);
    },
    //确认收货
    confirmReceipt(oid) {
      this.axios({
        method: "POST",
        url: "/receive",
        data: utils.querystring({
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
          oid,
        }),
      }).then((res) => {
        this.findOrder(this.active);
      });
    },
    //删除订单
    deleteOrder(oid) {
      this.axios({
        method: "POST",
        url: "/removeOrder",
        data: utils.querystring({
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
          oid,
        }),
      }).then((res) => {
        this.findOrder(this.active);
      });
    },
  },
};
</script>

<style lang="less" scoped>
//订单展示大小
.order_views {
  height: calc(100vh - 140px);
  overflow: scroll;
}
// 商品
.goods_box {
  background-color: #ffffff;
  margin: 10px 10px;
  padding: 10px 10px;
  border-radius: 10px;
  //商品头部
  .goods_head {
    width: 100%;
    position: relative;
    .goods_state {
      float: right;
    }
  }
  //   商品统计
  .goods_stat {
    color: #989898;
    margin: 5px 0px;
    font-size: 12px;
    text-align: right;
    //下单时间
    .order_time {
      padding: 5px;
      float: left;
      font-size: 12px;
      color: #989898;
    }
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
    flex-wrap: wrap;

    //图片
    img {
      padding: 5px 5px;
      width: 80px;
      height: 80px;
    }
    //其他信息
    .goods_info {
      position: relative;
      width: 73%;
      height: 100%;
      //商品名
      .goods_name {
        display: inline-block;
        font-size: 15px;
        width: 100%;
        margin: 10px 0px;
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
        margin: 10px 0px;
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