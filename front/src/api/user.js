import { instance, createHeaders } from "./index";

function registerUser(userInfo, success, error) {
  instance.post(`/user/signup`, userInfo, {}).then(success).catch(error);
}

function checkDuplicatedUserId(userId, success, error) {
  instance.get(`/user/${userId}`, {}).then(success).catch(error);
}

function findUserId(findUserInfo, success, error) {
  instance
    .post(`/user/find/userid`, findUserInfo, {})
    .then(success)
    .catch(error);
}

// 비밀번호를 잊은 사람이 변경 가능한 API(비로그인 상태)
function findUserPassword(findUserPasswordInfo, success, error) {
  instance
    .post(`/user/find/userpassword`, findUserPasswordInfo, {})
    .then(success)
    .catch(error);
}

function getUserProfile(token, success, error) {
  instance
    .get(`/user/profile`, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

function updateUser(updateUserInfo, token, success, error) {
  instance
    .patch(`/user`, updateUserInfo, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

function updateUserPassword(updateUserPasswordInfo, token, success, error) {
  instance
    .patch(`/user/password`, updateUserPasswordInfo, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error); 
}

// back에서 수정 필요(back 대신 userSeq 가 필요없도록 front 를 수정함.)
function deleteUser(token, success, error) {
  instance
    .delete(`/user`, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

function getUserNickname(userSeq, success, error) {
  instance.get(`/user/getNickname/${userSeq}`, {}).then(success).catch(error);
}

export {
  registerUser,
  checkDuplicatedUserId,
  findUserId,
  getUserProfile,
  updateUser,
  updateUserPassword,
  deleteUser,
  findUserPassword,
  getUserNickname,
};
