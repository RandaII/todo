const changeAddFormStatus = (payload) =>{
  return {
    type: `CHANGE_ADD_FORM_STATUS`,
    payload
  }
}

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