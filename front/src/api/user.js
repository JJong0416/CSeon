import { instance, createHeaders } from "./index";

// accountrole, accountSuccessCount, usingBadgeId, 
function getUserProfile(token, success, error){
  instance.get("/mypage",  { headers: createHeaders(token) }).then(success).catch(error);
}

function apitest(token, success, error) {
  instance
<<<<<<< HEAD
    .get("/question/1", {
      headers: createHeaders(token),
    })
=======
    .get("/test111", { headers: createHeaders(token) })
>>>>>>> 94e0a109413ef20ede8b88a9b1325cd632321cf3
    .then(success)
    .catch(error);
}

<<<<<<< HEAD
function apitest2(token, success, error) {
  instance
    .get("/mypage", { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}
=======
>>>>>>> 94e0a109413ef20ede8b88a9b1325cd632321cf3

export {
  getUserProfile,
  apitest,
};
