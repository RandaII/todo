// необходим для взаимодействия с localStorage
class StorageChanger {
  // сортировка даты по убыванию
  static _sortByDate = (a, b) => {
    if (a.date > b.date) {
      return -1;
    }
    if (a.date < b.date) {
      return 1;
    }
    return 0;
  };

  // вернуть массив заметок из localstorage, с сортировкой
  static returnRecords = () => {
    if (!localStorage.records){
      localStorage.setItem(`records`, `[]`);
    }
    return JSON.parse(localStorage.records).sort(this._sortByDate);
  }

  // добавить запись
  static addRecord = (text) =>{

    const recordObject = {
      date: new Date().getTime(),
      text,
      done: false
    }

    // в случае пустого records, создает первоначальную структуру
    if (!localStorage.records){
      localStorage.records = JSON.stringify([recordObject]);
    }
    else {
      const recordsArray = JSON.parse(localStorage.records);
      recordsArray.push(recordObject);
      localStorage.records = JSON.stringify(recordsArray);
    }
  }

  // изменить done статус, в качестве id используется date
  static changeDoneStatus = (dateId) =>{
    let recordsArray = this.returnRecords()
    const recordId = recordsArray.findIndex(({date})=> date === dateId);
    recordsArray[recordId].done = !recordsArray[recordId].done;
    localStorage.records = JSON.stringify(recordsArray);
  }

  // удалить запись, в качестве id используется date
  static deleteRecord = (dateId) =>{
    const recordsArray = this.returnRecords();
    const recordId = recordsArray.findIndex(({date})=> date === dateId);
    localStorage.records = JSON.stringify([...recordsArray.slice(0, recordId), ...recordsArray.slice(recordId + 1)]) ;
  }

}

// фильтр по done статусу
const filterByDoneStatus = (arr, doneStatus) => arr.filter((value) => value.done === doneStatus);

// форматирование даты
const formatDate = (date) =>{

  let recDate = new Date(date);
  const nowDate = new Date();

  // форматируем дату заметки, в зависимости от дня добавления
  if (recDate.getDay() === nowDate.getDay()
    && recDate.getMonth() === nowDate.getMonth()
    && recDate.getFullYear() === nowDate.getFullYear()){

    return new Intl.DateTimeFormat(`ru`, {hour:`2-digit`, minute:`2-digit`}).format(new Date(date))
  }

  return new Intl.DateTimeFormat(`ru`, {day:`numeric`, month:`long`}).format(new Date(date))
}

export {
  filterByDoneStatus,
  formatDate,
  StorageChanger
}