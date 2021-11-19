<template>
  <div class="home">
    <van-button @click="banner" type="info">banner请求</van-button>
    <van-button @click="type" type="info">商品类型</van-button>
    <van-button @click="userInfo" type="info">用户信息</van-button>
    <van-button @click="like(islike)" type="info">收藏</van-button>
    <van-button @click="notlike(islike)" type="info">取消收藏</van-button>
    <van-button @click="findlike(islike)" type="info">查询收藏</van-button>
    <van-button @click="addShopcart" type="info">加入购物车</van-button>
    <van-button @click="findShopcar" type="info">查询购物车</van-button>
    <van-button @click="findAllAddress" type="info">查询所有地址</van-button>

    <van-button @click="amendCard" type="info">修改购物车商品数</van-button>
  </div>
</template>

<script>
import { utils } from "../assets/js/Utils";
export default {
  name: "Home",
  data() {
    return {
      islike: true,
    };
  },

  methods: {
    banner() {
      this.axios({
        method: "GET",
        url: "/banner",
        params: {
          appkey: this.appkey,
        },
      }).then((res) => {
        console.log(res);
      });
    },
    type() {
      let data = utils.querystring({
        appkey: this.appkey,
        pid: "latte004",
      });
      console.log(data);
      this.axios({
        method: "GET",
        url: "/productDetail",
        params: {
          appkey: this.appkey,
          pid: "latte004",
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(data);
        });
    },

    userInfo() {
      this.axios({
        method: "GET",
        url: "/findMy",
        params: {
          appkey: this.appkey,
          tokenString: this.$store.getters.getSortage,
        },
      }).then((res) => {
        console.log(res.data.result);
      });
    },
    like(love) {
      this.axios({
        method: "POST",
        url: "/like",
        data: utils.querystring({
          pid: "latte004",

          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
          tokenString:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiY29mZmUxNjM1NDY5NjU0MDk5IiwiaWF0IjoxNjM2MDEwMjI1LCJleHAiOjE2Mzg2MDIyMjV9.1kn9N8yUV3dVXBDRG1x6npBZ6qe21XcTs0kgNo0nvtw",
        }),
      }).then((res) => {
        console.log(res);
      });
    },
    notlike(love) {
      this.axios({
        method: "POST",
        url: "/not like",
        data: utils.querystring({
          pid: "latte004",

          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
          tokenString:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiY29mZmUxNjM1NDY5NjU0MDk5IiwiaWF0IjoxNjM2MDEwMjI1LCJleHAiOjE2Mzg2MDIyMjV9.1kn9N8yUV3dVXBDRG1x6npBZ6qe21XcTs0kgNo0nvtw",
        }),
      }).then((res) => {
        console.log(res);
      });
    },
    findlike(love) {
      this.axios({
        method: "GET",
        url: "/findlike",
        params: {
          pid: "latte004",

          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
          tokenString:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiY29mZmUxNjM1NDY5NjU0MDk5IiwiaWF0IjoxNjM2MDEwMjI1LCJleHAiOjE2Mzg2MDIyMjV9.1kn9N8yUV3dVXBDRG1x6npBZ6qe21XcTs0kgNo0nvtw",
        },
      }).then((res) => {
        console.log(res);
      });
    },

    addShopcart() {
      //发送请求，加入购物车

      this.axios({
        method: "POST",
        url: "/addShopcart",
        data: utils.querystring({
          pid: "latte004",
          count: "2",
          rule: "热/半糖",
          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
          tokenString:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiY29mZmUxNjM1NDY5NjU0MDk5IiwiaWF0IjoxNjM2MDEwMjI1LCJleHAiOjE2Mzg2MDIyMjV9.1kn9N8yUV3dVXBDRG1x6npBZ6qe21XcTs0kgNo0nvtw",
        }),
      }).then((res) => {
        console.log(res);
      });
    },
    findShopcar() {
      this.axios({
        method: "GET",
        url: "/findAllShopcart",
        params: {
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
        },
      }).then((res) => {
        console.log(res.data.result);
      });
    },
    amendCard() {
      // 修改购物车商品数量
      this.axios({
        method: "POST",
        url: "/modifyShopcartCount",
        data: utils.querystring({
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
          sid: "_s1636362266339",
          count: 3,
        }),
      }).then((res) => {
        console.log(res.data);
      });
    },
    findAllAddress() {
      this.axios({
        method: "GET",
        url: "/findAddress",
        params: {
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
        },
      }).then((res) => {
        console.log(res.data);
      });
    },
  },
};
</script>
