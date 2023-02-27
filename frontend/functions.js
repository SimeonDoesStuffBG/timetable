function datetimeLocal(date) {
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}

function compare(date1, date2) {
  let firstDate = new Date(date1);
  let secondDate = new Date(date2);

  let firstDateMils = firstDate.getTime();
  let secondDateMils = secondDate.getTime();

  let diff = secondDateMils - firstDateMils;
  return Math.sign(diff);
  //1 = date1 is before date2
  //0 = date1 and date2 are the same
  //-1 = date1 is after date2
}

function formatTime(time) {
  let date = new Date(time);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let hour = date.getHours();
  let minute = date.getMinutes();

  let dateText = `${day < 10 ? "0" : ""}${day}-${
    month < 10 ? "0" : ""
  }${month}-${year} ${hour < 10 ? "0" : ""}${hour}:${
    minute < 10 ? "0" : ""
  }${minute}`;

  return dateText;
}

function tomorrow(date) {
  date.setDate(date.getDate() + 1);
  return date;
}

function entryAlreadyExists(entry1, entry2) {
  return (
    (compare(entry1.startTime, entry2.endTime) >= 0 && //if there's any overlap we expect the second entry will end after the first one starts but before it ends
      compare(entry2.startTime, entry1.endTime) >= 0) ||
    (compare(entry2.startTime, entry1.startTime) >= 0 && //if there is an entry during the period we want to use the curier
      compare(entry1.endTime, entry2.endTime) >= 0)
  );
}

function courierIsTaken(timeTableEntries, couriers, newEntry) {
  const entries = timeTableEntries
    .filter(
      (entry) =>
        couriers.map((courier) => courier.name).indexOf(entry.courier) ===
        newEntry.courier - 1
    )
    .filter((entry) => entryAlreadyExists(entry, newEntry));

  return entries.length > 0;
}

function filterTimetableEntries(timetable, filter, curTime = new Date()) {
  let display = [];

  switch (filter) {
    case 0: {
      //all
      display = [...timetable];
      break;
    }
    case 1: {
      //pending
      display = timetable.filter(
        (entry) => compare(curTime, entry.startTime) > 0
      );
      break;
    }
    case 2: {
      //active
      display = timetable.filter(
        (entry) =>
          compare(entry.startTime, curTime) >= 0 &&
          compare(curTime, entry.endTime) >= 0
      );
      break;
    }
    default: {
      //delivered
      display = timetable.filter(
        (entry) => compare(entry.endTime, curTime) > 0
      );
    }
  }

  display = display
    .map((entry) => {
      let updatedEntry = {
        ...entry,
        startTime: formatTime(entry.startTime),
        endTime: formatTime(entry.endTime),
      };

      return updatedEntry;
    })
    .sort((entry1, entry2) => compare(entry1.startTime, entry2.startTime))
    .sort((entry1, entry2) => compare(entry1.endTime, entry2.endTime));

  return display;
}
