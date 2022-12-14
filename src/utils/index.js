export const formatNumber = value => {
  if (value === undefined || value === null) {
    return '';
  }
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
};

export const convertPriceToString = val => {
  let string = '';

  // console.log('val', val);
  if (val) {
    if (typeof val === 'string') {
      string = val.replace(/,/g, '');
    } else {
      string = `${val}`.replace(/,/g, '');
    }
  }
  return string;
};
export const convertMintoHrs = mins => {
  let num = mins;
  let hours = num / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  return mins > 60 ? rhours + ' hrs ' + rminutes + ' mins' : rminutes + ' mins';
};
export const convertSecondtoMin = second => {
  let num = second;
  let mins = num / 60;
  let rmins = Math.floor(mins);
  let seconds = (mins - rmins) * 60;
  let rseconds = Math.round(seconds);
  let rsec = rseconds > 10 ? rseconds : '0' + rseconds;
  return rseconds > 10 ? rmins + ':' + rsec : '00:' + rsec;
};
export const convertSecondtoHours = second => {
  if (second > 3600) {
    const result = new Date(second * 1000).toISOString().slice(11, 19);
    return result;
  } else {
    const result = new Date(second * 1000).toISOString().slice(14, 19);
    return result;
  }
};
