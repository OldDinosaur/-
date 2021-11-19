<template>
  <div>
    <!-- 导航 -->
    <div>
      <van-nav-bar
        title="我的收藏"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <!-- 收藏商品 -->
    <div class="like_box">
      <div
        class="like_cards"
        @click="likeDetali(item.pid)"
        v-for="item in likeList"
        :key="item.id"
      >
        <img :src="item.smallImg" alt="" />
        <p class="like_name">{{ item.name }}</p>
        <div class="like_price">
          ￥{{ item.price
          }}<van-icon @click.stop="deleteOrder(item.pid)" name="delete-o" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { utils } from "../../assets/js/Utils";

export default {
  name: "myCollect",

  data() {
    return {
      likeList: [],
    };
  },

  mounted() {
    this.myCollect();
  },

  methods: {
    //查询所有收藏
    myCollect() {
      this.axios({
        method: "GET",
        url: "/findAllLike",
        params: {
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
        },
      }).then((res) => {
        console.log(res.data.result);
        this.likeList = res.data.result;
      });
    },

    //返回
    onClickLeft() {
      this.$router.back();
    },
    //删除(取消收藏)
    deleteOrder(pid) {
      console.log(pid);
      this.axios({
        method: "POST",
        url: "/notlike",
        data: utils.querystring({
          appkey: this.appkey,
          pid,
          tokenString: localStorage.getItem("token"),
        }),
      }).then((res) => {
        // 成功后重新请求
        this.myCollect();
      });
    },
    //查看详情
    likeDetali(pid) {
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
.like_box {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  padding: 10px;
  height: calc(100vh - 110px);
  overflow: scroll;
  .like_cards {
    padding: 10px;
    background-color: #ffffff;
    width: 150px;
    height: 220px;
    text-align: center;
    margin-bottom: 10px;
    img {
      position: relative;
      width: 150px;
      height: 150px;
    }
    .like_name {
      width: 100%;
      text-align: left;
      font-size: 15px;
    }
    .like_price {
      width: 100%;
      color: rgb(68, 71, 214);
      // float: left;
      text-align: left;
      font-size: 15px;
      .van-icon {
        float: right;
        font-size: 20px;
        color: black;
      }
    }
  }
}
</style>