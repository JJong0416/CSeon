<template>
  <div>
    <h2>문제저장소 페이지</h2>
    <questions-list></questions-list>
  </div>
</template>

<script>
import QuestionsList from "../components/questions/QuestionsList.vue";
export default {
  name: "QuestionsPage",
  components: { QuestionsList },
};
</script>

<style>
</style>