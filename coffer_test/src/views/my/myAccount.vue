<template>
  <div>
    <!-- 导航 -->
    <div>
      <van-nav-bar
        title="账号管理"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
    </div>
    <!-- 信息 -->
    <div>
      <van-cell-group>
        <van-field readonly label="头像" input-align="right">
          <template #right-icon>
            <van-uploader :after-read="afterRead">
              <van-icon :name="myInfo.userImg" />
            </van-uploader>
          </template>
        </van-field>
        <van-field
          v-model="myInfo.userId"
          label="用户id"
          placeholder="输入框内容右对齐"
          readonly
        />
        <van-field
          v-model="myInfo.phone"
          label="手机号"
          placeholder="输入框内容右对齐"
        />
        <van-field
          v-model="myInfo.nickName"
          label="昵称"
          placeholder="输入框内容右对齐"
          @blur="updateName"
        />
        <van-field
          v-model="myInfo.desc"
          @blur="updateDesc"
          rows="2"
          autosize
          label="简介"
          type="textarea"
          maxlength="50"
          placeholder="请输入简介"
          show-word-limit
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { utils } from "../../assets/js/Utils";
export default {
  name: "WorkspaceJsonMyaccount",

  data() {
    return {
      myInfo: [],
      fileList: [],
    };
  },

  mounted() {
    //个人信息
    this.userInfo();
  },

  methods: {
    //个人信息
    userInfo() {
      this.axios({
        method: "GET",
        url: "/findAccountInfo",
        params: {
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
        },
      }).then((res) => {
        this.myInfo = res.data.result[0];
      });
    },

    //更新头像
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
        url: "/updateAvatar",
        data: utils.querystring({
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
          imgType: type,
          serverBase64Img: base,
        }),
      })
        .then((res) => {
          this.userInfo();
          console.log(res);
        })
        .catch((err) => {
          console.log("图片太大，上传失败");
        });
    },
    //修改昵称
    updateName() {
      this.axios({
        method: "POST",
        url: "/updateNickName",
        data: utils.querystring({
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
          nickName: this.myInfo.nickName,
        }),
      }).then((res) => {
        console.log(res.data.msg);
      });
    },

    //修改简介
    updateDesc() {
      this.axios({
        method: "POST",
        url: "/updateDesc",
        data: utils.querystring({
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
          desc: this.myInfo.desc,
        }),
      }).then((res) => {
        console.log(res.data);
      });
    },
  },
};
</script>

<style lang="less" scoped>
// 图片大小
.van-icon__image {
  width: 50px;
  height: 50px;
  object-fit: fill;
}
</style>