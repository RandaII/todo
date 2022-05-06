import {StorageChanger} from "../utils";

// изменить AddForm, payload:{
//     status: bool,
//     type: `edit` или `add`,
//     record:{
//       id: number,
//       text: string
//     }
//   }
const setAddForm = (payload) =>({
  type: `SET_ADD_FORM`,
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
  setAddForm,
  fetchRecords,
  fetchRecordsWithCallback
}