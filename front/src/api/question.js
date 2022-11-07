import { instance, createHeaders } from "./index";

function getQuestion(questionId, token, success, error) {
  instance
    .get(`/question/${questionId}`, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

// function getQuestionList()

export { getQuestion };
