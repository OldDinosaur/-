<template>
  <div>
    <div>
      <router-view></router-view>
    </div>
    <div v-show="$route.meta.show">
      <myHead></myHead>
      <!-- 路由 -->
      <div>
        <van-cell
          title="我的订单"
          is-link
          :to="{
            name: 'myorder',
          }"
        />
        <van-cell
          title="我的收藏"
          is-link
          :to="{
            name: 'mycollect',
          }"
        />
        <van-cell
          title="地址管理"
          is-link
          :to="{
            name: 'myaddress',
          }"
        />
        <van-cell
          title="账号管理"
          is-link
          :to="{
            name: 'myAccount',
          }"
        />

        <van-cell
          title="安全中心"
          is-link
          :to="{
            name: 'safetyCenter',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import myHead from "../../components/my/myHead.vue";
export default {
  name: "my",
  components: { myHead },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
</style>