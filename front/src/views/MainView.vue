<template>
  <div class="main-container">
    <div class="left">
      <div v-if="!logined" style="width: 70%">
        <v-row
          ><a
            href="http://localhost:7070/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth/redirect"
          >
            ><v-img
              width="190px"
              height="45px"
              src="@/assets/kakao_login_medium_narrow.png"
            ></v-img></a
        ></v-row>
        <v-row>
          <a
            href="http://localhost:7070/oauth2/authorization/google?redirect_uri=http://localhost:3000/oauth/redirect"
          >
            ><v-img
              width="190px"
              height="48px"
              src="@/assets/btn_google_signin_light_normal_web.png"
            ></v-img
          ></a>
        </v-row>
      </div>
      <!-- <div v-else style="width: 70%">
        <v-row
          ><v-btn
            color="blue-grey lighten-4"
            large
            class="mb-5"
            style="width: 100%"
            >문제 풀기</v-btn
          ></v-row
        >
        <v-row
          ><v-btn
            color="blue-grey lighten-4"
            large
            class="mb-5"
            style="width: 100%"
            >문제집</v-btn
          ></v-row
        >
        <v-row
          ><v-btn
            color="blue-grey lighten-4"
            large
            class="mb-5"
            style="width: 100%"
            >실시간 대회</v-btn
          ></v-row
        >
      </div>
   -->
    </div>

    <div class="right">
      <div style="width: 80%">
        <v-img src="@/assets/메인로고.png"></v-img>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logined: false,
    };
  },
  methods: {
    // LoginClickBtn() {
    //   console.log("===");
    //   this.$router.push("/login");
    // },
    login() {
      // 카카오 로그인하는 함수
      this.logined = true;
    },
  },
};
</script>
<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/mainBG.jpg");
}
.left {
  width: 50%;
  height: 100%;
  float: left;
  box-sizing: border-box;
  text-align: center;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.right {
  width: 50%;
  height: 100%;
  margin: auto;
  float: right;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>
