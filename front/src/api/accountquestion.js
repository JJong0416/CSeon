import { instance, createHeaders } from "./index";

// accountrole, accountSuccessCount, usingBadgeId,
function RegistRequestQuestion(questionRequestReq, token, success, error) {
  instance
    .post("/request/question", questionRequestReq, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}
export { RegistRequestQuestion };
