<template>
  <div class="header">
    <h1>Header</h1>
    <router-link to="/">Home</router-link> /
    <router-link to="/bar">Go to Bar</router-link>
  </div>
</template>
<style scoped>
.header {
  text-align: center;
  background-color: lightgray;
}

a {
  color: #42b983;
}
</style>
