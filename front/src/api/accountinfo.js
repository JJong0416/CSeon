import { instance, createHeaders } from "./index";

// accountrole, accountSuccessCount, usingBadgeId,
function getUserProfile(token, success, error) {
  instance
    .get("/mypage", { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}
function getUserType(token, success, error) {
  instance
    .get("/accountInfo", { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}
export { getUserProfile, getUserType };
