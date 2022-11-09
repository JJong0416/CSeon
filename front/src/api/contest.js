import { instance, createHeaders } from "./index";

function getAllContestList(token, success, error) {
  instance
    .get(`/contest`, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}

export { getAllContestList };
