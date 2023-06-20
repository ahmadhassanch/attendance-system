function getStartOfDayFromDate(date: Date): Date {
  const startOfDay = new Date(date.getTime());
  startOfDay.setHours(0);
  startOfDay.setMinutes(0);
  startOfDay.setSeconds(0);
  startOfDay.setMilliseconds(0);
  return startOfDay;
}

function getStartOfDayFromTimeStamp(timestamp: number): Date {
  console.log(timestamp);
  const date = new Date(timestamp);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  console.log(date.getTime());
  return date;
}

const date = new Date(); // current date and time
const startOfDay = getStartOfDayFromDate(date);
console.log(startOfDay); // prints the start of the current day

const timestamp = Date.now(); // current timestamp
const startOfDay2 = getStartOfDayFromTimeStamp(timestamp);
console.log(startOfDay2); // prints the start of the current day

console.log(date.getTimezoneOffset() / 60, date.getTimezoneOffset() * 60);
/*
Client      Server      C.time   S.Time      GMT      TStamp        StartOfDay(Server)
PAK          PAK        10:30     10:30     5:30     1680845400
PAK          UK         10:30     05:30     5:30     1680845400
*/
