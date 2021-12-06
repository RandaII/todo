
const sortByDate = (a, b) => {
  if (a.date > b.date) {
    return -1;
  }
  if (a.date < b.date) {
    return 1;
  }
  return 0;
};

const filterByDoneStatus = (arr, doneStatus) => arr.filter((value) => value.done === doneStatus);

const returnRecords = () => JSON.parse(localStorage.records).sort(sortByDate);

const changeDoneStatus = (dateId) =>{
  let recordsArray = returnRecords();
  const recordId = recordsArray.findIndex(({date})=> date === dateId);
  recordsArray[recordId].done = !recordsArray[recordId].done;
  localStorage.records = JSON.stringify(recordsArray);
}

const deleteRecord = (dateId) =>{
  const recordsArray = returnRecords();
  const recordId = recordsArray.findIndex(({date})=> date === dateId);
  localStorage.records = JSON.stringify([...recordsArray.slice(0, recordId), ...recordsArray.slice(recordId + 1)]) ;
}

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