<template>
  <div class="div1">
    <!-- 导航 -->
    <div>
      <van-nav-bar
        title="找回密码"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <!-- 表单 -->
    <div class="form2">
      <van-form @submit="onSubmit">
        <van-field
          v-model="userInfo.mobile"
          name="手机号"
          label="手机号"
          placeholder="11位手机号"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="userInfo.password"
          type="password"
          name="新密码"
          label="新密码"
          placeholder="密码(6-16个字符)"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
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
        mobile: "",
        password: "",
      },
    };
  },
  methods: {
    //返回按钮
    onClickLeft() {
      this.$router.back();
    },
    onSubmit() {},
  },
};
</script>

<style lang="less" scoped>
.form2 {
  margin-top: 40px;
}
</style>