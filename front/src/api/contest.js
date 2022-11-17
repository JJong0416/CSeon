import { instance, createHeaders } from "./index";

function getAllContestList(token, success, error) {
  instance
    .get(`/contest`, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

function checkValidation(contestId, token, success, error) {
  instance
    .get(`/contest/${contestId}/valid-time`, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

function getContestQuestions(contestId, token, success, error) {
  instance
    .get(`/contest/${contestId}/question`, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

function createContest(contestReq, token, success, error) {
  instance
    .post(`/contest`, contestReq, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

function submitContestAnswer(contestAnswerReq, token, success, error) {
  instance
    .post(`/contest/submit`, contestAnswerReq, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

function getContestRanking(contestId, token, success, error) {
  instance
    .get(`/contest/${contestId}/ranking`, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

function getContestResult(contestId, token, success, error) {
  instance
    .get(`/contest/${contestId}/result`, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

function getQuestionIndex(contestId, token, success, error) {
  instance
    .get(`/contest/${contestId}/index`, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

export {
  getAllContestList,
  checkValidation,
  getContestQuestions,
  createContest,
  submitContestAnswer,
  getContestRanking,
  getContestResult,
  getQuestionIndex,
};
