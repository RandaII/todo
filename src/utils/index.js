
const sortByDate = (a, b) => {
  if (a.date > b.date) {
    return -1;
  }
  if (a.date < b.date) {
    return 1;
  }
  return 0;
};

// фильтр по done статусу
const filterByDoneStatus = (arr, doneStatus) => arr.filter((value) => value.done === doneStatus);

// вернуть массив заметок из localstorage
const returnRecords = () => JSON.parse(localStorage.records).sort(sortByDate);

// изменить done статус, в качестве id используется date
const changeDoneStatus = (dateId) =>{
  let recordsArray = returnRecords();
  const recordId = recordsArray.findIndex(({date})=> date === dateId);
  recordsArray[recordId].done = !recordsArray[recordId].done;
  localStorage.records = JSON.stringify(recordsArray);
}

// удалить запись, в качестве id используется date
const deleteRecord = (dateId) =>{
  const recordsArray = returnRecords();
  const recordId = recordsArray.findIndex(({date})=> date === dateId);
  localStorage.records = JSON.stringify([...recordsArray.slice(0, recordId), ...recordsArray.slice(recordId + 1)]) ;
}

// добавить запись
const addRecord = (text) =>{

  const recordObject = {
    date: new Date().getTime(),
    text,
    done: false
  }

  if (!localStorage.records){
    localStorage.records = JSON.stringify([recordObject]);
  }
  else {
    const recordsArray = JSON.parse(localStorage.records);
    recordsArray.push(recordObject);
    localStorage.records = JSON.stringify(recordsArray);
  }
}

export {
  returnRecords,
  changeDoneStatus,
  deleteRecord,
  filterByDoneStatus,
  addRecord
}