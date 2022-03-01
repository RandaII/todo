import {StorageChanger} from "../utils";

// изменить AddFormStatus, payload - bool
const setAddFormStatus = (payload) =>({
  type: `SET_ADD_FORM_STATUS`,
  payload
});

// получить массив заметок, имеет структуру: [{date, text, done}...]
const fetchRecords = (payload) =>({
    type: `FETCH_RECORDS`,
    payload
});

// принимает string название метода для storageChanger, который необходимо выполнить перед отправкой массива записей
const fetchRecordsWithCallback = (actionName, argument) =>{
  (typeof actionName === `string`) && StorageChanger[actionName]?.(argument);
  return fetchRecords(StorageChanger.returnRecords());
};

export {
  setAddFormStatus,
  fetchRecords,
  fetchRecordsWithCallback
}