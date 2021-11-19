<template>
  <!-- 标题跟搜索框 -->
  <div class="home">
    <div class="homepage">
      <van-nav-bar>
        <template #left>
          <div class="name_box">
            <div class="nameitem">你好:</div>
            <div
              class="nickname"
              v-if="getSortage === null || getSortage === ''"
            >
              <router-link
                :to="{
                  name: 'login',
                }"
                >去登陆</router-link
              >
            </div>
            <div class="nickname" v-else>{{ userInfo.nickName }}</div>
          </div>
        </template>
        <template #right>
          <div>
            <van-search
              v-model="value"
              class="van_search"
              placeholder="请输入搜索关键词"
            />
          </div>
        </template>
      </van-nav-bar>
    </div>
    <!-- 使用轮播图组件 -->
    <carousel />
    <!-- 使用热卖商品组件 -->
    <hotList></hotList>
  </div>
</template>

<script>
import carousel from "../../components/carousel.vue";
import hotList from "../../components/hotList.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "homepage",
  components: { carousel, hotList },
  data() {
    return {
      hide: true,
      value: "",
      //热卖商品
      hotList: [],
      //个人信息
      userInfo: {},
    };
  },
  computed: {
    ...mapGetters("userToken", ["getSortage"]),
  },
  created() {
    this.my();
  },
  mounted() {},
  methods: {
    my() {
      this.axios({
        method: "GET",
        url: "/findMy",
        params: {
          appkey: this.appkey,
          tokenString: this.getSortage,
        },
      }).then((res) => {
        if (res.data.code === "A001") {
          this.userInfo = res.data.result[0];
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.name_box {
  display: flex;
  font-weight: bold;
  justify-content: space-around;
  .nickname {
    text-indent: 0 5em;
    color: rgb(95, 108, 231);
  }
}
.van_search {
  padding: 0;
}

.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>