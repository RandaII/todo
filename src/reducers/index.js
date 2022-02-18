const initialState = {
  addFormStatus: false,
  records: []
}

const reducer = (state = initialState, action) =>{
  switch (action.type) {
    case `CHANGE_ADD_FORM_STATUS`:
      return {
        ...state,
        addFormStatus: action.payload
      }
    case `FETCH_RECORDS`:
      return {
        ...state,
        records: action.payload
      }
    default:
      return state;
  }
}

export default reducer;