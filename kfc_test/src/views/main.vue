<template>
  <div>
    <keep-alive>
      <router-view />
    </keep-alive>

    <!-- 标签栏 -->
    <div>
      <van-tabbar router v-model="active">
        <van-tabbar-item
          v-for="(item, index) in tabbaData"
          :to="item.url"
          :key="index"
        >
          <span>{{ item.title }}</span>
          <template #icon="props">
            <img :src="props.active ? item.icon.active : item.icon.inactive" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Goods",

  data() {
    return {
      //搜索
      active: sessionStorage.getItem("active")
        ? JSON.parse(sessionStorage.getItem("active"))
        : 0,
      tabbaData: [
        {
          title: "首页",
          icon: {
            active: require("../assets/images/home_active.png"),
            inactive: require("../assets/images/home.png"),
          },
          url: {
            name: "homepage",
          },
        },
        {
          title: "菜单",

          icon: {
            active: require("../assets/images/menu_active.png"),
            inactive: require("../assets/images/menu.png"),
          },
          url: {
            name: "shopmenu",
          },
        },
        {
          title: "购物袋",
          icon: {
            active: require("../assets/images/shopbag_active.png"),
            inactive: require("../assets/images/shopbag.png"),
          },
          url: {
            name: "shopbag",
          },
        },
        {
          title: "个人中心",
          icon: {
            active: require("../assets/images/my_active.png"),
            inactive: require("../assets/images/my.png"),
          },
          url: {
            name: "my",
          },
        },
      ],
    };
  },
  watch: {
    active: {
      handler(newvalue) {
        sessionStorage.setItem("active", newvalue);
      },
    },
  },

  created() {},
  methods: {},
};
</script>

<style lang="less" scoped>
//轮播图
.my-swipe .van-swipe-item {
  color: #fff;
  width: 100%;
  height: 200px;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.img-t {
  width: 100%;
  height: 100%;
}
</style>