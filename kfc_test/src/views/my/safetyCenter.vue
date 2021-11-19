<template>
  <div>
    <!-- 导航 -->
    <div>
      <van-nav-bar
        title="安全中心"
        left-text="返回"
        right-text="退出登录"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <van-button type="defult" @click="show = true" block>密码修改</van-button>
    <van-action-sheet v-model="show" title="标题">
      <div class="content">内容</div>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name: "WorkspaceJsonSafetycenter",

  data() {
    return {
      show: false,
    };
  },

  mounted() {},

  methods: {
    //返回
    onClickLeft() {
      this.$router.back();
    },
    //退出登录
    onClickRight() {
      localStorage.setItem("token", "");
      sessionStorage.setItem("active", "0");
      this.$router.replace({ name: "homepage" });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 16px 16px 160px;
}
</style>