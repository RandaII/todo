const initialState = {
  addForm:{
    status: false,
    type: `edit`,
    record:{
      id: null,
      text: ``
    }
  },
  records: []
}

const reducer = (state = initialState, action) =>{
  switch (action.type) {
    case `SET_ADD_FORM`:
      return {
        ...state,
        addForm:{
          ...state.addForm,
          ...action.payload
        }
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