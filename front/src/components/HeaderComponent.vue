<template>
  <div id="header-container">
    <div class="header-icon-wrap">
      <div class="menu-wrap" @click.stop="drawer = !drawer">
        <div class="hamburger-menu">
          <div class="bar-top"></div>
          <div class="bar-middle"></div>
          <div class="bar-bottom"></div>
        </div>
      </div>
      <div class="logo-wrap" @click="moveMain">
        <!-- <div>
          <v-icon size="1.2rem" color="black" style="position: fixed; top: 0"
            >mdi-bookmark</v-icon
          >
        </div>-->
        <v-hover>
          <template #default="{ hover }">
            <img
              class="logo_word"
              :src="
                hover ? `/icon/렛시피_로고.png` : `/icon/렛시피_로고_b1.png`
              "
              alt="Logo_word_icon_b.png"
            />
          </template>
        </v-hover>
      </div>
      <div
        v-if="userId === 0 || userId === ''"
        class="login-icon"
        @click="moveLogin"
      >
        <v-hover>
          <template #default="{ hover }">
            <v-list-item>
              <v-list-item-icon>
                <img
                  class="login-img"
                  :src="hover ? `/icons/로그인_h.gif` : `/icons/로그인_o.png`"
                  alt
                />
              </v-list-item-icon>
            </v-list-item>
          </template>
        </v-hover>
      </div>
      <div v-else class="logout-icon" @click="logOut">
        <v-hover>
          <template #default="{ hover }">
            <v-list-item>
              <v-list-item-icon>
                <img
                  class="login-img"
                  :src="
                    hover ? `/icons/로그아웃_h.gif` : `/icons/로그아웃_o.png`
                  "
                  alt
                />
              </v-list-item-icon>
            </v-list-item>
          </template>
        </v-hover>
      </div>
    </div>
    <v-navigation-drawer v-model="drawer" absolute temporary overlay-inherit>
      <v-list-item>
        <v-list-item-avatar>
          <v-img v-if="profileimg !== (null && '')" :src="profileimg"></v-img>
          <v-img v-else src="/icons/유저_mo.png"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ nickname }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon @click.stop="drawer = !drawer">
          <v-icon>mdi-close</v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-divider></v-divider>

      <v-list>
        <v-list-item-group active-class="deep-letcipe--text text--accent-4">
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            @click="move(item)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title style="font-size: large">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="userId === 1" @click="moveAdmin()">
            <v-list-item-icon>
              <v-icon>mdi-chart-bar-stacked</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title style="font-size: large">
                통계</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="userId === null || userId === ''"
            @click="moveLogin()"
          >
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title style="font-size: large">
                로그인</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="userId !== null || userId !== ''"
            @click="logOut()"
          >
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title style="font-size: large">
                로그아웃</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "HeaderComponent",

  data() {
    return {
      drawer: null,
      items: [
        { title: "홈", icon: "mdi-home", m: "/main" },
        { title: "장바구니", icon: "mdi-cart", m: "/cart" },
        {
          title: "장보기목록",
          icon: "mdi-format-list-checks",
          m: "/check",
        },
        {
          title: "레시피 만들기",
          icon: "mdi-clipboard-text",
          m: "/recipe/create",
        },
        {
          title: "레시피 검색",
          icon: "mdi-magnify",
          m: "/search",
        },
        {
          title: "마이페이지",
          icon: "mdi-account",
          m: "/user/mypage",
        },
        {
          title: "테스트페이지",
          icon: "mdi-check",
          m: "/user/recipetest",
        },
      ],
      profileimg: null,
    };
  },

  computed: {
    ...mapState("user", ["userId", "nickname", "profileImage"]),
  },
  created() {
    if (this.profileImage !== null) {
      this.profileimg = this.profileImage;
    }
  },
  methods: {
    ...mapActions("user", ["logout"]),
    moveLogin() {
      this.$router.push("/user/login");
    },
    moveMain() {
      this.$router.push("/main");
    },
    moveMypage() {
      this.$router.push("/user/mypage");
    },
    logOut() {
      this.logout();
      this.moveMain();
    },
    move(item) {
      if (item.title === "로그아웃") {
        this.logOut();
      } else {
        this.$router.push(item.m);
      }
    },
    moveAdmin() {
      this.$router.push("/admin");
    },
  },
};
</script>

<style scoped>
* {
  color: black;
}
#header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgb(255, 255, 255);
  height: 70px;
  width: 100%;
  z-index: 999;
  box-shadow: 0 -4px 10px black;
}
/* hamburger menu css */
.hamburger-menu {
  margin: 1rem;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  height: 2.5rem;
  width: 2.5rem;
  cursor: pointer;
}
.bar-top,
.bar-middle,
.bar-bottom {
  height: 4px;
  background: black;
  border-radius: 5px;
  margin: 3px 0;
  transform-origin: left;
  transition: all 0.5s;
}
.hamburger-menu:hover .bar-top {
  transform: rotate(45deg);
}
.hamburger-menu:hover .bar-middle {
  transform: translateX(1rem);
  opacity: 0;
}
.hamburger-menu:hover .bar-bottom {
  transform: rotate(-45deg);
}

/* 클릭 후 */

/* :deep(.hamburger-menu:checked ~) .bar-top {
  transform: rotate(45deg);
}
:deep(.hamburger-menu:checked ~) .bar-middle {
  transform: translateX(1rem);
  opacity: 0;
}
:deep(.hamburger-menu:checked ~) .bar-bottom {
  transform: rotate(-45deg);
} */

/*  */
.header-icon-wrap {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-wrap {
  display: flex;
  cursor: pointer;
}
.logo_word {
  height: 5vh;
}
.logout-icon,
.login-icon {
  cursor: pointer;
}
.login-img {
  width: 45px;
}
.v-navigation-drawer,
.v-navigation-drawer--absolute,
.v-navigation-drawer--is-mobile,
.v-navigation-drawer--open,
.v-navigation-drawer--temporary {
  z-index: 999;
  /* height: 100vh !important; */
  position: inherit !important;
}

.v-overlay--absolute {
  position: inherit !important;
}
/* .v-overlay,
.v-overlay--absolute,
.v-overlay--active,
.theme--dark {
  position: inherit !important;
}
.v-overlay__scrim {
  height: 100vh !important;
} */
/* 모바일 screen */
@media (max-width: 425px) {
  .hamburger-menu {
    margin: 1rem;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    height: 2.3rem;
    width: 2rem;
    cursor: pointer;
  }
  .bar-top,
  .bar-middle,
  .bar-bottom {
    height: 3px;
    background: black;
    border-radius: 5px;
    margin: 3px 0;
    transform-origin: left;
    transition: all 0.5s;
  }
  .login-img {
    width: 35px;
  }
  .v-navigation-drawer,
  .v-navigation-drawer--absolute,
  .v-navigation-drawer--is-mobile,
  .v-navigation-drawer--open,
  .v-navigation-drawer--temporary {
    z-index: 999 !important;
    height: 100vh !important;
    width: 100vw !important;
  }
}
</style>
