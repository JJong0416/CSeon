const userStore = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
};

// export default userStore;

// import jwt_decode from "jwt-decode";
// import { login } from "@/api/user.js";
// import { findById } from "../../api/user";
// import http from "@/api/http";

// const userStore = {
//   namespaced: true,
//   state: {
//     isLogin: false,
//     isLoginError: false,
//     userInfo: null,
//     users: [],
//     searchs: [],
//   },
//   getters: {
//     userInfo: function (state) {
//       return state.userInfo;
//     },
//     users(state) {
//       return state.users;
//     },
//     searchs(state) {
//       return state.searchs;
//     },
//   },
//   mutations: {
//     SET_IS_LOGIN: (state, isLogin) => {
//       state.isLogin = isLogin;
//     },
//     SET_IS_LOGIN_ERROR: (state, isLoginError) => {
//       state.isLoginError = isLoginError;
//     },
//     SET_USER_INFO: (state, userInfo) => {
//       state.isLogin = true;
//       state.userInfo = userInfo;
//     },
//     setUsers(state, users) {
//       state.users = users;
//     },
//     setSearchs(state, searchs) {
//       state.searchs = searchs;
//     },
//   },
//   actions: {
//     async userConfirm({ commit }, user) {
//       console.log("userConfirm..........", user);
//       await login(
//         user,
//         (response) => {
//           if (response.data.message === "success") {
//             let token = response.data["access-token"];
//             commit("SET_IS_LOGIN", true);
//             commit("SET_IS_LOGIN_ERROR", false);
//             sessionStorage.setItem("access-token", token);
//           } else {
//             commit("SET_IS_LOGIN", false);
//             commit("SET_IS_LOGIN_ERROR", true);
//           }
//         },
//         () => {}
//       );
//     },
//     getUserInfo({ commit }, token) {
//       let decode_token = jwt_decode(token);
//       findById(
//         decode_token.id,
//         (response) => {
//           if (response.data.message === "success") {
//             commit("SET_USER_INFO", response.data.userInfo);
//           } else {
//             console.log("유저 정보 없음!!");
//           }
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//     },
//     getSearchs({ commit, state }, payload) {
//       console.log("[action] getSearchs............", payload);
//       let newUsers = [];
//       if (payload.key == "id") {
//         for (let i = 0; i < state.users.length; i++) {
//           if (state.users[i].id == payload.word) {
//             newUsers.push(state.users[i]);
//           }
//         }
//       } else if (payload.key == "email") {
//         for (let i = 0; i < state.qnas.length; i++) {
//           if (state.users[i].email.includes(payload.word)) {
//             newUsers.push(state.users[i]);
//           }
//         }
//       } else if (payload.key == "name") {
//         console.log("[action] getSearchs name............", payload.word);
//         for (let i = 0; i < state.users.length; i++) {
//           if (state.users[i].name.includes(payload.word)) {
//             newUsers.push(state.users[i]);
//           }
//         }
//       } else if (payload.key == "age") {
//         for (let i = 0; i < state.users.length; i++) {
//           if (state.users[i].age == payload.word) {
//             newUsers.push(state.users[i]);
//           }
//         }
//       } else if (payload.key == "all") {
//         newUsers = state.users;
//       }
//       console.log("searchUsers.............", newUsers);
//       commit("setSearchs", newUsers);
//     },
//     getUsers(context) {
//       console.log("[action] getUsers............");
//       http
//         .get("user")
//         .then(({ data }) => {
//           console.log("users.......", data);
//           context.commit("setUsers", data);
//           context.commit("setSearchs", data);
//         })
//         .catch(({ response }) => {
//           alert(response.data);
//         });
//     },
//   },
// };

// export default userStore;
