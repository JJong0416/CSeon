import { instance, createHeaders } from "./index";

// accountrole, accountSuccessCount, usingBadgeId,
function getUserProfile(token, success, error) {
  instance
    .get("/mypage", { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

function apitest(token, success, error) {
  instance
    .get("/question/1", {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

function apitest2(token, success, error) {
  instance
    .get("/mypage", { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

export { getUserProfile, apitest };
