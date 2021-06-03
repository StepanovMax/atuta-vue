const calculateExpiredDate = () => {
  let resultData;
  const timestampNow = new Date().getTime() / 1000 | 0;
  const timestamp24hours = 24 * 60 * 60;
  const timestamp30days = 30 * timestamp24hours;
  resultData = timestampNow + timestamp30days;
  console.log(' ');
  console.log('  >> timestampNow  ::', timestampNow);
  console.log('  >> timestamp30days  ::', timestamp30days);
  console.log('  >> resultData  ::', resultData);
  console.log(' ');
  return resultData;
}

export default calculateExpiredDate;
