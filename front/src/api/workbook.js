import { instance, createHeaders } from "./index";

function getWorkbook(workbookId, token, success, error) {
  instance
    .get(`/workbook/${workbookId}`, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}

function getAllWorkbookList(token, success, error) {
  instance
    .get(`/workbook`, { headers: createHeaders(token) })
    .then(success)
    .catch(error);
}
export { getWorkbook, getAllWorkbookList };
