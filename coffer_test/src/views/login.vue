<template>
  <div class="nav">
    <!-- 注册导航 -->
    <div>
      <van-nav-bar
        title="登录"
        left-text="注册"
        right-text="关闭"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <!-- 图片 -->
    <div class="box1">
      <img class="Timg" src="../assets/logo.png" alt="" />
    </div>
    <!-- 表单 -->
    <div class="form1">
      <van-form>
        <van-field
          v-model="userlogin.phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="userlogin.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <router-link :to="'/retrievePassword'">
          <p id="jump">忘记密码？</p>
        </router-link>

        <div style="margin: 16px">
          <van-button
            round
            block
            type="info"
            @click="onSubmit"
            native-type="button"
            >登录</van-button
          >
          <van-button
            class="reg"
            round
            block
            type="default"
            native-type="button"
            @click="reg"
            >注册</van-button
          >
          <!-- <van-cell class="reg" is-link @click="reg">注册</van-cell> -->
          <van-popup
            v-model="show"
            position="bottom"
            :style="{ height: '30%' }"
          ></van-popup>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { utils } from "../assets/js/Utils";
export default {
  name: "login",
  data() {
    return {
      userlogin: {
        appkey: this.appkey,
        phone: "",
        password: "",
      },

      show: false,
    };
  },
  methods: {
    onSubmit() {
      let data = utils.querystring(this.userlogin);
      this.axios({
        method: "POST",
        url: "/login",
        data,
      })
        .then((res) => {
          if (res.data.code == 200) {
            //token的值储存到localsortage
            // console.log("登录" + res.data.token);
            this.$store.commit("userToken/$_setStorage", res.data.token);
            //跳转到主页
            sessionStorage.setItem("active", "0");
            this.$router.push("/main/homepage");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //左边点击
    onClickLeft() {
      this.$router.push("/register");
    },
    //右边点击
    onClickRight() {},
    //注册按钮
    reg() {
      this.show = true;
    },
  },
};
</script>

<style lang="less" scoped>
.reg {
  margin-top: 10px;
}
#jump {
  float: right;
  font-size: 12px;
  color: black;
  margin-right: 20px;
}
.box1 {
  width: 100%;
  height: 200px;
  // background-color: rgb(247, 247, 247);
  position: relative;
  .Timg {
    width: 50%;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>