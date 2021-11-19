<template>
  <div>
    <!-- 导航栏 -->
    <div>
      <van-nav-bar
        title="新增地址"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <!-- 地址信息 -->
    <div>
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
        @change-default="onChangeDefault"
      />
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { areaList } from "@vant/area-data";
//导入序列化方法
import { utils } from "../../assets/js/Utils";
//导入vuex辅助函数
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "WorkspaceJsonAddaddress",

  data() {
    return {
      areaList,
      searchResult: [],
    };
  },
  computed: {},
  created() {},

  methods: {
    //获取userAddress内异步方法,
    ...mapActions("userAddress", ["addAddress", "findAllAddress"]),

    //   返回
    onClickLeft() {
      this.$router.back();
    },
    //保存
    onSave(val) {
      console.log(val);
      // 自定义加载图标
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      let info = Object.assign(
        {
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
        },
        val
      );
      //对提交的数据进行处理
      info.isDefault = info.isDefault ? 1 : 0;
      delete info.country;
      // 发送请求
      try {
        this.addAddress(utils.querystring(info)).then((res) => {
          this.$toast.clear();
          this.$toast.fail("保存成功");
          this.$router.go(0);
        });
      } catch {
        this.$toast.fail("失败");
      }
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "东莞理工学院城市学院",
            address: "文昌路1号",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
    onChangeDefault(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="less" scoped>
// 地址信息
</style>