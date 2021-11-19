<template>
  <div>
    <van-tabs v-model="active">
      <van-tab class="v_tap" title="标签 1">
        <!-- 菜单 -->
        <div class="menu_list">
          <van-sidebar v-model="activeKey" @change="onChange">
            <van-sidebar-item
              v-for="item in sortlist"
              :key="item.id"
              :title="item.typeDesc"
            />
          </van-sidebar>
        </div>
        <!-- 商品列表 -->
        <goodsList :sortInfo="sortInfo" />
      </van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import goodsList from "../../components/goodsList.vue";
export default {
  name: "shopmenu",
  //商品列表组件
  components: { goodsList },
  data() {
    return {
      active: 0,
      //商品类型名称列表
      sortlist: [],
      activeKey: 0,
      //商品信息
      sortInfo: [],
    };
  },

  created() {
    //商品类型;
    this.axios({
      method: "GET",
      url: "/type",
      params: {
        appkey: this.appkey,
      },
    }).then((res) => {
      this.sortlist = res.data.result;
      //显示默认商品列表
      this.axios({
        method: "GET",
        url: "/typeProducts",
        params: {
          appkey: this.appkey,
          key: "type",
          value: this.sortlist[0].type,
        },
      }).then((res) => {
        this.sortInfo = res.data.result;
      });
    });
  },

  methods: {
    //点击获取商品列表
    onChange(index) {
      this.axios({
        method: "GET",
        url: "/typeProducts",
        params: {
          appkey: this.appkey,
          key: "type",
          value: this.sortlist[index].type,
        },
      }).then((res) => {
        this.sortInfo = res.data.result;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.menu_list {
  position: absolute;
  // display: inline;
  top: 42px;
  left: 0;
  height: 100%;
}
.van-sidebar-item--select::before {
  height: 100%;
  background-color: #39a9ed;
}
.van-sidebar-item {
  padding: 15px 10px;
}
</style>