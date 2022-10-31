<template>
  <div id="app">
    <v-app>
      <v-container class="login-container">
        <div class="login-title">로그인</div>
        <div class="login-wrap fadeInUp">
          <div>
            <div>
              <div class="login-input">
                <v-text-field
                  v-model="id"
                  label="아이디"
                  :rules="rules.id_rule"
                  hide-details="auto"
                  solo
                  @keyup.enter="loginTemp"
                ></v-text-field>
              </div>
              <div class="login-input">
                <v-text-field
                  v-model="pw"
                  label="비밀번호"
                  :rules="rules.pw_rule"
                  :append-icon="showPW ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPW ? 'text' : 'password'"
                  hide-details="auto"
                  solo
                  @click:append="showPW = !showPW"
                  @keyup.enter="loginTemp"
                ></v-text-field>
              </div>
            </div>
            <div class="find-wrap" @click="moveFindIdPW">
              <v-icon small color="#51600d">mdi-information</v-icon>
              <div>아이디|비밀번호 찾기</div>
            </div>
          </div>
          <div>
            <div class="btn-wrap">
              <v-btn class="btn" color="letcipe" @click="loginTemp"
                >로그인</v-btn
              >
              <v-btn class="btn" color="letcipe" @click="moveAgree"
                >회원가입</v-btn
              >
            </div>
          </div>
        </div>
      </v-container>

      <v-snackbar
        v-model="snackbar"
        max-width="290"
        style="z-index: 100; margin-bottom: 60px"
        :timeout="timeout"
        >아이디 또는 비밀번호가 일치하지 않습니다.</v-snackbar
      >
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "LoginPage",
  data() {
    return {
      id: null,
      pw: null,
      showPW: false,
      snackbar: false,
      timeout: 2000,
      rules: {
        id_rule: [
          (v) => !!v || "아이디는 필수 입력사항입니다.",
          (v) => /^[a-zA-Z0-9]*$/.test(v) || "영문+숫자만 입력 가능합니다.",
          (v) => !(v && v.length >= 30) || "30자 이상 입력할 수 없습니다.",
          (v) => !(v && v.length <= 5) || "5자 이상으로 이루어져야 합니다.",
        ],
        pw_rule: [
          (v) => !!v || "비밀번호는 필수 입력사항입니다.",
          (v) => !(v && v.length < 8) || "8자 이상이어야합니다.",
          (v) => !(v && v.length >= 30) || "20자 이상 입력할 수 없습니다.",
          (v) =>
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/.test(
              v
            ) || "영문, 숫자, 특수문자를 모두 포함해야합니다.",
        ],
      },
    };
  },
  computed: {
    ...mapState("user", ["userId", "nickname"]),
  },
  methods: {
    ...mapActions("user", ["login", "readUser"]),
    moveAgree() {
      this.$router.push("/user/agree");
    },
    async loginTemp() {
      const user = {
        userId: this.id,
        password: this.pw,
      };
      this.$cookies.remove("access-token");
      await this.login(user);
      await this.readUser();
      if (this.userId !== 0) {
        this.$router.push("/main");
      } else {
        this.snackbar = true;
      }
    },
    moveMain() {
      this.$router.push("/main");
    },
    moveFindIdPW() {
      this.$router.push("/user/pwinqury");
    },
  },
};
</script>

<style scoped>
.login-container {
  /* height: 100vh; */
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-image: url('/bg/bg_img.png'); */
  /* background-repeat: repeat; */
  /* padding-top: 70px; */
  /* padding-bottom: 70px; */
}
.login-title {
  font-size: xx-large;
  color: black;
  text-align: center;
  padding-top: 5%;
  /* padding-bottom: 15%; */
}
.login-input {
}
.login-wrap {
  width: 40%;
}
.find-wrap {
  color: #67470c;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
}
.btn-wrap {
  display: flex;
  flex-direction: column;
  color: #ffa500;
}
.btn {
  padding-top: 3%;
  margin-bottom: 3%;
}
.theme--dark.v-input input,
.theme--dark.v-input textarea {
  color: black;
}
.v-input {
  padding: 2%;
}

@media (max-width: 1000px) {
  .login-wrap {
    width: 50%;
  }
}

/* mobile screen */
@media (max-width: 500px) {
  .login-title {
    font-size: xx-large;
    color: black;
    text-align: center;
    padding-top: 20%;
    padding-bottom: 15%;
  }
  .login-input {
  }

  .login-wrap {
    width: 70%;
  }
}
.fadeInUp {
  animation: fadeInUp 1s ease backwards;
}
@keyframes fadeInUp {
  0% {
    transform: translate(0px, 100px);
    opacity: 0;
  }
  100% {
    transform: translate(0px, 0);
    opacity: 1;
  }
}
</style>
