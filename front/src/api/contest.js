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

export { getAllContestList, checkValidation, getContestQuestions };
