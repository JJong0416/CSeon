<template>
  <div>
    <h2> Main Page</h2>
    <button @click="LoginClickBtn">로그인하기</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
  }},
  methods:{
    LoginClickBtn(){
      console.log("===")
      this.$router.push("/login");
    }
  },
}
</script>
