import { instance, createHeaders } from "./index";

function getWorkbookQuestion(workbookId, token, success, error) {
  instance
    .get(`/workbook/${workbookId}`, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

function getWorkbookList(token, success, error) {
  instance
    .get(`/workbook`, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}
export { getWorkbookQuestion, getWorkbookList };
