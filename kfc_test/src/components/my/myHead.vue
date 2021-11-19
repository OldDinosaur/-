<template>
  <div class="head" :style="backgroundDiv">
    <!-- 更换背景 -->
    <div class="change_context">
      <van-uploader :after-read="afterRead">
        <p>更换背景</p>
      </van-uploader>
    </div>

    <!-- 图片 -->
    <div class="my_name">
      <van-image round width="100px" height="100px" :src="myInfo.userImg" />
      <span>{{ myInfo.nickName }}</span>
    </div>

    <p class="my_sign" v-if="myInfo.desc">{{ myInfo.desc }}</p>
    <p class="my_sign" v-else>这人很懒,啥都没留下~</p>
  </div>
</template>

<script>
//导入序列号
import { utils } from "../../assets/js/Utils";

export default {
  name: "myHead",
  props: [],
  data() {
    return {
      myInfo: [],
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === "my" && from.name === "myAccount") {
        this.axios({
          method: "GET",
          url: "/findMy",
          params: {
            appkey: this.appkey,
            tokenString: localStorage.getItem("token"),
          },
        }).then((res) => {
          this.myInfo = res.data.result[0];
        });
      }
    },
  },
  computed: {
    backgroundDiv() {
      return {
        backgroundImage: "url(" + this.myInfo.userBg + ")",
      };
    },
  },

  created() {
    this.updateMy();
  },

  methods: {
    updateMy() {
      this.axios({
        method: "GET",
        url: "/findMy",
        params: {
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
        },
      }).then((res) => {
        this.myInfo = res.data.result[0];
      });
    },
    //上传背景图片
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      //  使用正则获取base64编码
      let base = file.content.replace(
        /^data:image\/(png|jpg|jpeg);base64,/,
        ""
      );
      //  使用正则获取图片类型

      let type = file.file.type.replace(/^image\//, "");

      this.axios({
        method: "POST",
        url: "/updateUserBg",
        data: utils.querystring({
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
          imgType: type,
          serverBase64Img: base,
        }),
      })
        .then((res) => {
          // 成功后更新页面
          this.updateMy();
        })
        .catch((err) => {
          console.log("图片太大，上传失败");
        });
    },
  },
};
</script>

<style lang="less" scoped>
.head {
  width: 100%;
  height: 200px;
  background-color: #ffffff;
  background-size: 100%;
  .change_context {
    margin: 0;
    padding: 0px 10px;
    font-size: 13px;
    color: #ffffff;
    text-align: right;
  }
  .my_name {
    width: 100%;
    color: #ffffff;
    display: flex;

    span {
      margin-top: 45px;
      margin-left: 20px;
      font-size: 16px;
    }
  }
  .my_sign {
    text-align: center;
    color: #ffffff;
  }
}
</style>