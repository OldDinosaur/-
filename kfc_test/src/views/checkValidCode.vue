<template>
  <div class="div1">
    <!-- 导航 -->
    <div>
      <van-nav-bar
        title="验证码"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <!-- 表单 -->
    <div class="form2">
      <van-form @submit="onSubmit">
        <van-field
          v-model="userInfo.email"
          name="邮箱"
          label="邮箱"
          placeholder="请输入邮箱"
          :rules="[{ required: true, message: '请输入邮箱' }]"
        />
        <van-field
          v-model="userInfo.emailCode"
          name="邮箱验证码"
          label="邮箱验证码"
          placeholder="请输入邮箱验证码"
          :rules="[{ required: true, message: '请输入邮箱验证码' }]"
        >
          <template #button>
            <van-button
              size="small"
              type="info"
              native-type="button"
              @click="eCode"
              >发送验证码</van-button
            >
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >下一步</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "retrievepassword",
  data() {
    return {
      userInfo: {
        email: "",
        emailCode: "",
      },
    };
  },
  methods: {
    //返回按钮
    onClickLeft() {
      this.$router.go(-1);
    },
    onSubmit() {},
    //发送验证码
    eCode() {
      this.axios({
        method: "POST",
        url: "/emailValidCode",
        data: {
          appkey: this.appkey,
          email: this.userInfo.email,
        },
      }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.form2 {
  margin-top: 40px;
}
</style>