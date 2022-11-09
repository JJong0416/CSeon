import { instance, createHeaders } from "./index";

function getQuestion(questionId, token, success, error) {
  instance
    .get(`/question/${questionId}`, questionId, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

function getQuestionListWithBoth(label, keyword, token, success, error) {
  instance
    .get(`/question/both/${label}/${keyword}`, label, keyword, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

function getQuestionListWithLabel(label, token, success, error) {
  instance
    .get(`/question/label/${label}`, label, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

function getQuestionListWithKeyword(keyword, token, success, error) {
  instance
    .get(`/question/keyword/${keyword}`, keyword, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

function getAllQuestionList(token, success, error) {
  instance
    .get(`/question/all`, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

export {
  getQuestion,
  getQuestionListWithBoth,
  getQuestionListWithLabel,
  getQuestionListWithKeyword,
  getAllQuestionList,
};
