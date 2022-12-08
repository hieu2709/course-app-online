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
