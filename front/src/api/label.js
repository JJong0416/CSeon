import { instance, createHeaders } from "./index";

function getLabels(token, success, error) {
  instance
    .get(`/label`, {
      headers: createHeaders(token),
    })
    .then(success)
    .catch(error);
}
export { getLabels };
