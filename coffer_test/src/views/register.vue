<template>
  <div class="div1">
    <!-- 注册导航 -->
    <div>
      <van-nav-bar
        title="注册"
        left-text="登录"
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
          v-model="userregister.phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="userregister.nickName"
          name="昵称"
          label="昵称"
          placeholder="昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
        />
        <van-field
          v-model="userregister.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button
            round
            block
            type="info"
            @click="Register"
            native-type="button"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { validForm } from "../assets/js/ValidForm";
import { utils } from "../assets/js/Utils";
export default {
  name: "register",
  data() {
    return {
      userregister: {
        phone: "",
        nickName: "",
        password: "",
      },
    };
  },
  created() {
    // console.log(this.$route.params.id);
  },
  methods: {
    Register() {
      var userinfo = this.userregister;
      //验证注册表单
      let o = {
        phone: {
          value: userinfo.phone,
          reg: /^1[3-9]\d{9}$/,
          erroMsg: "你的手机号码不符合格式",
        },
        nickName: {
          value: userinfo.nickName,
          reg: /^[\w\u4e00-\u9fa5]{1,10}$/,
          erroMsg: "你的昵称不符合格式",
        },

        password: {
          value: userinfo.password,
          reg: /^[A-Za-z]\w{5,15}$/,
          erroMsg: "你的密码不符合格式",
        },
      };
      // validForm.valid(o);
      // 判断;
      if (!validForm.valid(o)) {
        return;
      }
      //拷贝数组
      let info = Object.assign({ appkey: this.appkey }, this.userregister);

      //格式化序列
      let data = utils.querystring(info);

      this.axios({
        method: "POST",
        url: "/register",
        data,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //左边点击
    onClickLeft() {
      this.$router.push({
        path: "/login",
      });
    },
    //右边点击
    onClickRight() {},
  },
};
</script>

<style lang="less" scoped>
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