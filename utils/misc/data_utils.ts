// export function getTimeStamp(datetimeString: string) {
//   const datetime = new Date(datetimeString);
//   const timestamp = datetime.getTime() / 1000;
//   let v = Math.floor(timestamp);
//   // console.log(v);
//   return v;
// }

// export function getDate(timestamp: number) {
//   const date = new Date(timestamp * 1000);
//   const day = date.getDate().toString().padStart(2, '0');
//   const month = (date.getMonth() + 1).toString().padStart(2, '0');
//   const year = date.getFullYear().toString();
//   const hours = date.getHours().toString().padStart(2, '0');
//   const minutes = date.getMinutes().toString().padStart(2, '0');
//   const seconds = date.getSeconds().toString().padStart(2, '0');

//   // const formattedTimestamp = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
//   const formattedTimestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

//   return formattedTimestamp;
// }

// function test() {
//   const datetimeString = "2023-03-15 01:30:00";
//   console.log(datetimeString);
//   let timestamp = getTimeStamp(datetimeString);
//   console.log(timestamp);
//   let d = getDate(timestamp);
//   console.log(d);
//   let timestamp2 = getTimeStamp(d);
//   console.log(timestamp2);
// }

// test();
