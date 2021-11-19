<template>
  <div>
    <!-- 导航 -->
    <div>
      <van-nav-bar
        title="地址管理"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <!-- 地址列表 -->
    <div>
      <van-address-list
        :list="allList"
        :switchable="false"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "myAddress",

  data() {
    return {};
  },
  computed: {
    ...mapState("userAddress", ["allAddress", "nowAddress"]),
    ...mapGetters("userAddress", ["getDefaultAddress"]),
    //计算渲染的地址列表
    allList() {
      let info = this.allAddress.map((val) => {
        return {
          id: val.aid,
          name: val.name,
          tel: val.tel,
          address: val.province + val.city + val.county + val.addressDetail,
          isDefault: val.isDefault === 1 ? true : false,
        };
      });
      //判断是否默认，选中则提到最前面
      for (let i = 0; i < info.length; i++) {
        if (info[i].isDefault) {
          info.unshift(info[i]);
          info.splice(i + 1, 1);
        }
      }
      return info;
    },
  },
  mounted() {},
  created() {
    //查询地址
    this.findAllAddress({
      appkey: this.appkey,
      tokenString: localStorage.getItem("token"),
    }).then(() => {});
  },
  methods: {
    //获取userAddress内异步方法,
    ...mapActions("userAddress", ["findAllAddress", "findNowAddress"]),
    //返回
    onClickLeft() {
      this.$router.back();
    },
    //新增地址
    onAdd() {
      this.$router.push({ name: "addAddress" });
    },
    onEdit(item, index) {
      console.log(item.id);
      this.$router.push({
        name: "addressedit",
        params: {
          aid: item.id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>