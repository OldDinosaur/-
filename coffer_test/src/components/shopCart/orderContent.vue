<template>
  <div class="goods_box">
    <!-- 导航栏 -->
    <div>
      <van-nav-bar v-if="regulate" right-text="管理" @click-right="manage" />
      <van-nav-bar v-else right-text="完成" @click-right="manage" />
    </div>
    <!-- 下拉刷新 -->
    <van-pull-refresh
      class="refresh"
      pull-distance:50px
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <!-- 商品卡片 -->
      <div>
        <van-checkbox-group v-model="result" ref="checkboxGroup">
          <van-swipe-cell
            :disabled="regulate"
            v-for="(item, index) in goodsList"
            :key="index"
          >
            <div class="goods_card">
              <van-checkbox
                :name="item.sid"
                @click="isSelect(item.sid, item.price, item.count)"
              >
              </van-checkbox>
              <img :src="item.small_img" alt="" />
              <div class="goods_info">
                <p class="goods_name">
                  {{ item.name }}<span> {{ item.rule }}</span>
                </p>
                <p class="goods_elname">{{ item.enname }}</p>
                <p class="goods_price">￥{{ item.price }}</p>
                <van-stepper
                  class="van_stepper"
                  v-model="item.count"
                  theme="round"
                  button-size="22"
                  disable-input
                  @change="onChange(item.sid, item.count, item.price)"
                />
              </div>
            </div>
            <template #right>
              <van-button
                @click="delete_card(item.sid)"
                square
                text="删除"
                type="danger"
                class="delete-button"
              />
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>
      <p class="pull-down">哎呀, 别拉我了: {{ pullDownCount }}</p>
    </van-pull-refresh>
    <!-- 底部提交 -->
    <div class="footer">
      <van-submit-bar
        v-if="regulate"
        :disabled="amount === 0 ? true : false"
        :price="amount"
        @submit="submitOrder"
        button-text="提交订单"
      >
        <van-checkbox v-model="checked" @click="checkAll(checked)">
          全选
        </van-checkbox>
      </van-submit-bar>
      <van-submit-bar v-else @submit="all_delete" button-text="删除">
        <van-checkbox v-model="checked" @click="checkAll(checked)">
          全选
        </van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { utils } from "../../assets/js/Utils";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "ordercontent",
  data() {
    return {
      //下拉刷新次数
      pullDownCount: 0,
      //是否下拉刷新
      isLoading: false,
      //全选
      checked: false,
      //复选框name中的内容
      result: [],
      // 商品信息
      goodsList: [],
      //管理或者完成切换,true时为管理
      regulate: true,
      //合计
      amount: 0,
      map: new Map(),
    };
  },

  watch: {
    result(newvalue) {
      // 选中变化时调用计算
      this.cumAll();
      //监听result内变化实现选中全部后全选也选中，否则反
      if (newvalue.length === this.goodsList.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
  created() {
    //查询购物车数量
    this.checkAllShopcart();
  },
  methods: {
    //计算合计
    cumAll() {
      let sum = 0;
      // 遍历商品列表将商品的sid作为键，价格跟数量的乘积作值
      for (let j = 0; j < this.goodsList.length; j++) {
        this.map.set(
          this.goodsList[j].sid,
          this.goodsList[j].price * this.goodsList[j].count * 100
        );
      }
      // 从map中获取对应选中(result)的值
      for (let i = 0; i < this.result.length; i++) {
        sum += this.map.get(this.result[i]);
      }
      this.amount = sum;
    },
    //查询购物车所有商品
    checkAllShopcart() {
      this.axios({
        method: "GET",
        url: "/findAllShopcart",
        params: {
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
        },
      }).then((res) => {
        this.goodsList = res.data.result;
      });
    },
    //管理按钮点击
    manage() {
      //切换模式
      this.regulate = !this.regulate;
      // 清空选中
      this.result = [];
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.pullDownCount++;
      }, 1000);
    },
    //是否选中？
    isSelect(sid, price, count) {},
    //全选
    checkAll(checked) {
      this.$refs.checkboxGroup.toggleAll(checked);
    },
    //更改商品数量
    onChange(sid, count, price) {
      // 修改购物车商品数量
      this.axios({
        method: "POST",
        url: "/modifyShopcartCount",
        data: utils.querystring({
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
          sid,
          count,
        }),
      }).then((res) => {
        //重新获取购物车商品信息
        this.checkAllShopcart();
        //更新价格
        this.cumAll();
      });
    },
    //获取sortDetali内异步获取购物车商品数量方法,
    ...mapActions("sortDetali", ["findAllCartCount"]),
    //滑动删除
    delete_card(sid) {
      //删除提示
      this.$dialog
        .confirm({
          title: "删除",
          message: "确认删除？",
        })
        .then(() => {
          // on confirm
          //删除请求;
          this.axios({
            method: "POST",
            url: "/removeShopcart",
            data: utils.querystring({
              appkey: this.appkey,
              tokenString: localStorage.getItem("token"),
              sids: JSON.stringify([sid]),
            }),
          }).then((res) => {
            //更新vuex中商品总数
            this.findAllCartCount();
            //更新当前页面信息
            this.checkAllShopcart();
          });
        })
        .catch(() => {
          // on cancel
          return;
        });
    },
    //底部选中删除
    all_delete() {
      //删除提示
      this.$dialog
        .confirm({
          title: "删除",
          message: "确认删除？",
        })
        .then(() => {
          // on confirm
          //删除请求;
          this.axios({
            method: "POST",
            url: "/removeShopcart",
            data: utils.querystring({
              appkey: this.appkey,
              tokenString: localStorage.getItem("token"),
              sids: JSON.stringify(this.result),
            }),
          }).then((res) => {
            //更新vuex中商品总数
            this.findAllCartCount();
            //重新获取购物车商品信息
            this.checkAllShopcart();
            //清空选中列表
            this.result = [];
          });
        })
        .catch(() => {
          // on cancel
          return;
        });
    },
    //从sortCart中获取设置所选商品及合计金额
    ...mapMutations("sortCart", ["setSids"]),
    //提交订单
    submitOrder() {
      this.setSids(this.result);

      this.$router.push({
        name: "orderBalance",
      });
    },
  },
};
</script>

<style lang="less" scoped>
// 删除按钮
.delete-button {
  height: 100%;
}
//商品卡片
.goods_card {
  margin: 1px;
  background-color: white;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  //复选框
  .van-checkbox {
    padding: 10px 10px;
  }
  //图片
  img {
    padding: 10px 10px;

    width: 90px;
    height: 90px;
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
      //商品状态
      span {
        font-size: 13px;
        color: #c6c6c6;
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
    //商品价格
    .goods_price {
      display: inline-block;
      margin: 15px 0px;
      font-size: 15px;
      color: #5a8cc5;
    }
    //步进器
    .van_stepper {
      // display: inline-block;
      margin-top: 15px;
      margin-right: 15px;
      float: right;
    }
  }
}
// 下拉框
.refresh {
  height: calc(100vh - 140px);
  overflow: scroll;
}
// 下拉框
.pull-down {
  background-color: #ffffff;
  margin: 0;
  padding: 15px;
  text-align: center;
  font-size: 12px;
  color: #969799;
}
//底部
.footer {
  height: 50px;
  .van-submit-bar {
    position: relative;
  }
}
//底部flex对齐方式
.van-submit-bar__bar {
  justify-content: space-between;
}
</style>