<template>
  <div class="header">
    <v-row
      ><v-col cols="3" style="margin: 20px"
        ><v-img src="@/assets/메인로고2.png" width="70%"></v-img
      ></v-col>
      <v-col cols="2" class="text-h5" style="margin: auto"
        ><strong>문제 풀기</strong></v-col
      ><v-col cols="2" class="text-h5" style="margin: auto"
        ><strong>문제집</strong></v-col
      ><v-col cols="2" class="text-h5" style="margin: auto"
        ><strong>실시간 대회</strong></v-col
      ><v-col><v-btn>로그아웃</v-btn></v-col></v-row
    >
    <!-- <h1>Header</h1>
    <router-link to="/">Home</router-link> /
    <router-link to="/bar">Go to Bar</router-link> -->
  </div>
</template>
<style scoped>
.header {
  text-align: center;
}

a {
  color: #42b983;
}
</style>
