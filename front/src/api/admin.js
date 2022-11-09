import { instance, createHeaders } from "./index";

function getRequestQuestionList(token, success, error) {
  instance
    .get(`/admin/request`, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}
function getRequestQuestion(requestQuestionId, token, success, error) {
  instance
    .get(`/admin/request/${requestQuestionId}`, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

function RegistRequestQuestion(requestQuestionInfo, token, success, error) {
  instance
    .post(`/admin/request`, requestQuestionInfo, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

export { getRequestQuestionList, getRequestQuestion, RegistRequestQuestion };
