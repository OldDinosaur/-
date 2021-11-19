<template>
  <div>
    <!-- 导航 -->
    <div>
      <van-nav-bar
        title="编辑地址"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <!-- :address-info="{
          name: 'sss',
          tel: '13827633211',
          province: '广东省',
          city: '阳江市',
          county: '阳东区',
          addressDetail: '新江东路信和圆',
          areaCode: '55662',
          postalCode: '529500',
          isDefault: true,
        }" -->
    <!-- 地址编辑 -->
    <div>
      <van-address-edit
        :address-info="nowAddress"
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { areaList } from "@vant/area-data";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
//导入序列化方法
import { utils } from "../../assets/js/Utils";
export default {
  name: "WorkspaceJsonAddressedit",

  data() {
    return {
      areaList,
      name: "ddd",
      searchResult: [],
    };
  },
  computed: {
    ...mapState("userAddress", ["nowAddress"]),
    //判断isDefault
    address_now() {
      return nowAddress;
    },
  },

  created() {
    //查询该地址信息
    //更新vuex中的选中地址
    this.findNowAddress({
      appkey: this.appkey,
      tokenString: localStorage.getItem("token"),
      aid: this.$route.params.aid,
    }).then(() => {
      //改变isDefault值
      this.nowAddress.isDefault =
        this.nowAddress.isDefault === 1 ? true : false;
    });
  },
  methods: {
    //获取userAddress内异步方法,
    ...mapActions("userAddress", [
      "editAddress",
      "findAllAddress",
      "findNowAddress",
      "deleteAddress",
    ]),
    //保存
    //保存
    onSave(val) {
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
      //过滤不需要传的参数
      let { country, userId, createdAt, id, isRemove, updatedAt, ...params } =
        info;
      // 发送请求
      try {
        this.editAddress(utils.querystring(params)).then(() => {
          this.$toast.clear();
          this.$toast.fail("保存成功");
        });
      } catch {
        this.$toast.fail("失败");
      }
    },
    onDelete(val) {
      this.deleteAddress(
        utils.querystring({
          aid: val.aid,
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
        })
      ).then(() => {
        this.$router.back();
      });
    },

    //返回
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
</style>