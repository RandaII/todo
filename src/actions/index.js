// изменить AddFormStatus
const changeAddFormStatus = (payload) =>{
  return {
    type: `CHANGE_ADD_FORM_STATUS`,
    payload
  }
}

// получить массив заметок
const fetchRecords = (payload) =>{
  return {
    type: `FETCH_RECORDS`,
    payload
  }
}

export {
  changeAddFormStatus,
  fetchRecords
}