import { instance, createHeaders } from "./index";

// accountrole, accountSuccessCount, usingBadgeId,
function getUserProfile(token, success, error) {
  instance
    .get("/mypage", { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

export { getUserProfile };
