import { instance, createHeaders } from "./index";

function getQuestion(questionId, token, success, error) {
  instance
    .get(`/question/${questionId}`, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

function getQuestionListWithBoth(label, keyword, token, success, error) {
  instance
    .get(`/question/${label}/${keyword}`, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

function getQuestionListWithLabel(label, token, success, error) {
  instance
    .get(`/question/label/${label}`, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

function getQuestionListWithKeyword(keyword, token, success, error) {
  instance
    .get(`/question/keyword/${keyword}`, {
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

function registerLogs(answerRequestReq, token, success, error) {
  instance
    .post(`/question/logs`, answerRequestReq, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

function getLogs(questionId, token, success, error) {
  instance
    .get(`/question/logs/${questionId}`, {
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
  registerLogs,
  getLogs,
};
