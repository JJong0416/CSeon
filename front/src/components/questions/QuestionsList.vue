<template>
  <div>
    <h2 class="text-center">questions 목록</h2>
    <!-- <div>{{questions.id}}</div> -->
    <div class="row">
      <div style="text-align: center">
        <select class="col-2 mr-4" v-model="key">
          <option value="all">라벨 선택</option>
          <option v-for="(k, index) in keys" :value="k" :key="index">
            {{ k }}
          </option>
        </select>
        <input class="col-4" type="text" v-model="word" />
        <button class="btn btn-primary" @click="searchQuestions">검색</button>
      </div>
    </div>
    <div>
      <table class="table table-boardered">
        <colgroup>
          <col width="20%" />
          <col width="80%" />
        </colgroup>
        <thead>
          <th>번호</th>
          <th>제목</th>
        </thead>
        <tbody>
          <!-- <tr v-for="(question, index) in searchs" :key="question.id">
            <td>{{ index + 1 }}</td>
            <td>
              <router-link
                :to="{
                  name: 'questionsDetail' /*, query: { id: question.id }*/,
                }"
                >{{ question.title }}</router-link
              >
            </td>
          </tr> -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

const Store = "questionsStore";

export default {
  name: "QuestionsList",
  data() {
    return {
      word: "", //검색 할 단어
      keys: ["OS", "Database", "Network", "Java"], //option에 표시할 데이타
      key: "all", //검색 조건
    };
  },
  computed: {
    ...mapGetters(Store, ["questions", "searchs"]),
  },
  created() {
    this.getQuestions();
  },
  methods: {
    ...mapActions(Store, ["getQuestions", "getSearchs"]),
    searchQuestions() {
      this.getSearchs({ key: this.key, word: this.word });
    },
  },
};
</script>

<style></style>
