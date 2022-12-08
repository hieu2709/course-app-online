// import dayjs from 'dayjs';

// const _duration = require('dayjs/plugin/duration');
// dayjs.extend(_duration);

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

// export const fnKhongDau = str => {
//   if (!str) {
//     return;
//   }
//   let str1 = str;
//   str1 = str1.toLowerCase();
//   // str1 = str1.replace(' ', '-');
//   str1 = str1.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
//   str1 = str1.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
//   str1 = str1.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
//   str1 = str1.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
//   str1 = str1.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
//   str1 = str1.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
//   str1 = str1.replace(/đ/g, 'd');
//   str1 = str1.replace(
//     /!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g,
//     '-',
//   );

//   // str = str.replace(/-+-/g, " ");
//   // str = str.replace(/^\-+|\-+$/g, "");
//   // str = str.replace('-', ' ');
//   return str1;
// };

// export const fnNumberdot = str => {
//   if (!str) {
//     return null;
//   }
//   let str1 = str;
//   str1 = str1.replace(/,/g, '.');
//   return str1;
// };

// export const customFormatDate = date => {
//   const currentDate = dayjs(date).clone();
//   const day = currentDate.get('date');
//   const month = currentDate.get('month');
//   const year = currentDate.get('year');

//   // console.log('month',typeof month);
//   return `${day} Tháng ${month >= 9 ? month + 1 : `0${month + 1}`}, ${year}`;
// };
// tạo mảng với tham số bắt đầu và kết thúc tự định nghĩa
// Array.range = (a, b, step) => {
//   //a là tham số bắt đầu
//   //b là tham số kết thúc
//   //step là bước nhảy mỗi lần
//   let A = [];
//   if (typeof a === 'number') {
//     A[0] = a;
//     step = step || 1;
//     while (a + step <= b) {
//       A[A.length] = a += step;
//     }
//   } else {
//     let s = 'abcdefghijklmnopqrstuvwxyz';
//     if (a === a.toUpperCase()) {
//       b = b.toUpperCase();
//       s = s.toUpperCase();
//     }
//     s = s.substring(s.indexOf(a), s.indexOf(b) + 1);
//     A = s.split('');
//   }
//   return A;
// };
// export const range = Array.range;
//hàm phân trang
// export const findPage = (total, PAGE_SIZE, currentPage) => {
//   const totalPages = Math.ceil(total && total / PAGE_SIZE); //Số trang
//   let startPage, endPage;
//   if (totalPages <= 3) {
//     // less than 10 total pages so show all
//     startPage = 1;
//     endPage = totalPages;
//   } else {
//     // more than 10 total pages so calculate start and end pages
//     if (currentPage <= 2) {
//       startPage = 1;
//       endPage = 3;
//     } else if (currentPage + 1 >= totalPages) {
//       startPage = totalPages - 2;
//       endPage = totalPages;
//     } else {
//       startPage = currentPage - 1;
//       endPage = currentPage + 1;
//     }
//   }
//   return {
//     startPage,
//     endPage,
//     totalPages,
//   };
// };

// export function getExtensionFile(uri) {
//   if (!uri) {
//     return '';
//   }
//   if (uri.split('.') && uri.split('.').length > 0) {
//     return uri.split('.').pop();
//   }
//   return '';
// }
// export function getNameImage(uri) {
//   if (!uri) {
//     return '';
//   }
//   if (uri.split('/') && uri.split('/').length > 0) {
//     return uri.split('/').pop();
//   }
//   return '';
// }

// export const getInfoFile = res => {
//   const file = {
//     uri: res.uri,
//     name: getNameImage(res.uri),
//     type: mime.lookup(res.uri) || 'multipart/form-data',
//   };
//   return file;
// };
// hàm convert số tiền
// export function convertMoney(value) {
//   if (value === null || value === undefined) {
//     return null;
//   }
//   if (value < 10000) {
//     return formatNumber(value) + 'đ';
//   } else if (value < 1000000) {
//     return formatNumber(value / 1000) + 'k';
//   } else {
//     return formatNumber(value / 1000000) + 'tr';
//   }
// }

// export const modifyCategoryWithTemplate = (category, checker) => {
//   const categoriesTemplateLayout =
//     (category && category.categoriesTemplateLayout) || {};
//   const pageTemplate =
//     categoriesTemplateLayout &&
//     categoriesTemplateLayout.length > 0 &&
//     categoriesTemplateLayout.find(e => e && e.isHome === checker);
//   const modifedCategory = {
//     ...category,
//     templateLayouts: pageTemplate && pageTemplate.templateLayouts,
//   };

//   return modifedCategory;
// };

// export const isScrollToEnd = (
//   { layoutMeasurement, contentOffset, contentSize },
//   horizontal,
//   padding = 20,
// ) => {
//   if (horizontal) {
//     return (
//       layoutMeasurement.width + contentOffset.x >= contentSize.width - padding
//     );
//   }
//   return (
//     layoutMeasurement.height + contentOffset.y >= contentSize.height - padding
//   );
// };

// export const checkHttpLink = file => {
//   const allowedExtensions = /(http:\/\/|https:\/\/)/;
//   if (!allowedExtensions.exec(file)) {
//     return false;
//   }
//   return true;
// };

// check image or video
// export const checkImgOrVideo = _uri => {
//   if (!_uri) {
//     return null;
//   }
//   // video: .3gp .mp4 .mkv .webm
//   // img: .png  .jpeg .gif
//   const vid = ['3gp', 'mp4', 'mkv', 'webm', 'mov'];
//   const img = ['png', 'jpeg', 'jpg'];
//   const typeOfMedia = _uri.split('.').pop();
//   let result = '';
//   if (typeOfMedia) {
//     if (img.indexOf(typeOfMedia) !== -1) {
//       result = 'image';
//       return result;
//     }
//     if (vid.indexOf(typeOfMedia) !== -1) {
//       result = 'video';
//       return result;
//     }
//   }
// };

// export const checkDealPrice = data => {
//   if (!data) {
//     return false;
//   }
//   const { price, dealPrice } = data;
//   if (
//     dealPrice &&
//     price &&
//     Number(dealPrice) > 0 &&
//     Number(dealPrice) === Number(price)
//   ) {
//     return false;
//   }
//   if (
//     dealPrice &&
//     price &&
//     Number(dealPrice) > 0 &&
//     Number(dealPrice) !== Number(price)
//   ) {
//     return true;
//   }

//   return false;
// };

// export const isBase64 = str => {
//   const check = str?.match(/data:/);
//   const rex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;
//   if (check || rex.test(str)) {
//     return true;
//   }
//   return false;
// };

// export const isLocalfile = str => {
//   const check = str?.match(/:/);
//   if (check) {
//     return true;
//   }
//   return false;
// };

// export const getLinkImg = (data, resize) => {
//   // const typeignore = [
//   //   '\\.gif',
//   //   '\\.GIF',
//   //   '\\.svg',
//   //   '\\.SVG',
//   //   '\\.ico',
//   //   '\\.ICO',
//   //   '\\.HEIC',
//   //   '\\.heic',
//   // ];
//   const fileType = [
//     '\\.png',
//     '\\.PNG',
//     '\\.jpg',
//     '\\.JPG',
//     '\\.jpeg',
//     '\\.JPEG',
//   ];

//   let imageUri;
//   if (typeof data === 'string') {
//     imageUri = data;
//   } else if (Array.isArray(data)) {
//     imageUri = data?.length > 0 && data[0]?.file;
//   } else if (data?.images && Array.isArray(data?.images)) {
//     imageUri = data?.images?.length > 0 && data?.images[0]?.file;
//   } else if (data?.images?.file) {
//     imageUri = data?.images?.file;
//   } else if (typeof data === 'object') {
//     imageUri = data?.file;
//   }
//   // console.log({ imageUri });
//   if (imageUri) {
//     if (isBase64(imageUri) || isLocalfile(imageUri)) {
//       return imageUri;
//     } else {
//       let checkType = false;
//       fileType.map(item => {
//         if (typeof imageUri === 'string' && imageUri?.search(item) !== -1) {
//           checkType = true;
//         }
//       });

//       imageUri = imageUri.charAt(0) === '/' ? imageUri : `/${imageUri}`;
//       // console.log('imageUri', imageUri);
//       const img = checkHttpLink(imageUri)
//         ? imageUri
//         : `${IMAGE_SERVER_NEW}${IMAGE_PROJECT}${imageUri}${
//             resize && checkType ? `?widthImage=${Math.ceil(resize)}` : ''
//           }`;

//       return img;
//     }
//   }
//   return null;
// };

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
  return rhours + ' hrs ' + rminutes + ' mins';
};
// export const durationToStr = ms => {
//   // console.log('ms',ms);
//   const { duration } = dayjs;
//   const h = duration(ms).hours();
//   const m = duration(ms).minutes();
//   const s = duration(ms).seconds();

//   let hStr = '';
//   if (h !== 0) {
//     hStr = `${h}:`;
//   }

//   let mStr = '2';
//   mStr = m < 10 ? `0${m}` : m;

//   let sStr = '';
//   sStr = s < 10 ? `0${s}` : s;

//   return `${hStr}${mStr}:${sStr}`;
// };

// export const isObject = item =>
//   typeof item === 'object' && !Array.isArray(item) && item !== null;

// So sánh 2 array ko quan tâm đến thứ tự
// export const compareArrayNoOrder = (newArr, oldArr) => {
//   if (newArr.length !== oldArr.length) {
//     return false;
//   }
//   let newArr2 = [...newArr];
//   let lengthSame = 0;

//   oldArr.forEach(item => {
//     if (Array.isArray(item)) {
//       const ind = newArr.findIndex(x => compareArrayNoOrder(x, item));
//       if (ind !== -1) {
//         lengthSame += 1;
//         newArr2 = newArr2.filter((x, inx) => inx !== ind);
//       }
//     } else if (isObject(item)) {
//       const ind = newArr.findIndex(x => _.isEqual(x, item));
//       if (ind !== -1) {
//         lengthSame += 1;
//         newArr2 = newArr2.filter((x, inx) => inx !== ind);
//       }
//     } else {
//       const ind = newArr.findIndex(x => x === item);
//       if (ind !== -1) {
//         lengthSame += 1;
//         newArr2 = newArr2.filter((x, inx) => inx !== ind);
//       }
//     }
//   });
//   if (lengthSame !== oldArr.length) {
//     return false;
//   }
//   return true;
// };

// // Input: 2 obj new va old
// // Output: obj gom cac key thay doi
// // Khi truyền order === 'order' thì sẽ so sánh thứ tự của các phần tử array
// // Nếu ko thì chỉ quan tâm đến giá trị của các array
// export const checkOnChange = (newData, oldData, order) => {
//   const keyOldData = Object.keys(newData);
//   const changeKeysArr = [];
//   keyOldData.forEach(key => {
//     const oldItem = oldData[key];
//     const newItem = newData[key];
//     // if (typeof oldItem === 'string' && oldItem.trim()!==  newItem.trim() ) changeKeysArr.push(key);
//     if (Array.isArray(oldItem)) {
//       if (order === 'order') {
//         const compar = _.isEqual(oldItem, newItem);
//         if (!compar) {
//           changeKeysArr.push(key);
//         }
//       } else {
//         const compar = compareArrayNoOrder(oldItem, newItem);
//         if (!compar) {
//           changeKeysArr.push(key);
//         }
//       }
//     } else if (isObject(oldItem)) {
//       const compar = _.isEqual(oldItem, newItem);
//       if (!compar) {
//         changeKeysArr.push(key);
//       }
//     } else if (dayjs.isDayjs(oldItem)) {
//       changeKeysArr.push(key);
//     } else if (oldItem !== newItem) {
//       changeKeysArr.push(key);
//     }
//   });
//   const datas = {};
//   changeKeysArr.forEach(x => {
//     datas[x] = newData[x];
//   });
//   return datas;
// };

// export const getPriceProduct = product => {
//   let min = 0;
//   let max = 0;
//   if (!product) {
//     return null;
//   } else if (product.ecommerceProductsPackings?.length > 0) {
//     const arr = product.ecommerceProductsPackings.map(
//       item => item.dealPrice || item.price || 0,
//     );
//     min = Math.min(...arr);
//     max = Math.max(...arr);
//     return `${convertMoney(min)}${max > min ? ` - ${convertMoney(max)}` : ''}`;
//   } else if (product.dealPrice || product.price) {
//     return convertMoney(product.dealPrice) || convertMoney(product.price);
//   }
//   return null;
// };

// export const getTotalSearch = value => {
//   if (value === null || value === undefined) {
//     return null;
//   }
//   if (Number(value) < 1000) {
//     return value;
//   } else if (Number(value) < 1000000) {
//     return Number(value) / 1000 + 'k';
//   } else {
//     return Number(value) / 1000000 + 'tr';
//   }
// };

// export const checkWholeSale = product => {
//   return product?.typeOfSale?.length > 0 && product?.typeOfSale.includes('2');
// };

// export const getWholesalePrices = product => {
//   let min = 0;
//   let max = 0;
//   if (!product) {
//     return null;
//   } else if (product.ecommerceProductsPackings?.length > 0) {
//     const arr = product.ecommerceProductsPackings.map(
//       item => item.wholesalePrices || 0,
//     );
//     min = Math.min(...arr);
//     max = Math.max(...arr);
//     return `${formatNumber(min)}đ${
//       max > min ? ` - ${formatNumber(max)}đ` : ''
//     }`;
//   } else if (product.wholesalePrices) {
//     return `${formatNumber(product.wholesalePrices)}đ`;
//   }
//   return null;
// };

// export const getSalePriceProduct = product => {
//   let min = 0;
//   let max = 0;
//   let newMin = 0;
//   let newMax = 0;

//   let oldPrice, newPrice;
//   if (!product) {
//     return null;
//   } else if (product.ecommerceProductsPackings?.length > 0) {
//     const arr1 = [];
//     const arr2 = [];

//     product.ecommerceProductsPackings.forEach(item => {
//       arr1.push(item.dealPrice || 0);
//       if (checkDealPrice(item)) {
//         arr2.push(item.price || 0);
//       }
//     });
//     if (arr1.length > 0) {
//       newMin = Math.min(...arr1);
//       newMax = Math.max(...arr1);
//       newPrice = `${formatNumber(newMin)}đ${
//         newMax > newMin ? ` - ${formatNumber(newMax)}đ` : ''
//       }`;
//     }
//     if (arr2.length > 0) {
//       min = Math.min(...arr2);
//       max = Math.max(...arr2);
//       oldPrice = `${formatNumber(min)}đ${
//         max > min ? ` - ${formatNumber(max)}đ` : ''
//       }`;
//     }

//     return {
//       oldPrice: oldPrice,
//       newPrice: newPrice,
//     };
//   } else if (product.price && product.dealPrice) {
//     if (checkDealPrice(product)) {
//       oldPrice = formatNumber(product.price);
//     }

//     newPrice = formatNumber(product.dealPrice);
//     return {
//       oldPrice: oldPrice,
//       newPrice: newPrice,
//     };
//   }
//   return null;
// };

// export const getPriceMinProduct = product => {
//   let min = 0;

//   if (!product) {
//     return null;
//   } else if (product.dealPrice || product.price) {
//     return convertMoney(product.dealPrice) || convertMoney(product.price);
//   } else if (product.ecommerceProductsPackings?.length > 0) {
//     const arr = product.ecommerceProductsPackings.map(
//       item => item.dealPrice || item.price || 0,
//     );
//     min = Math.min(...arr);
//     return convertMoney(min);
//   }
//   return null;
// };

// export const getMinWholesalePrices = product => {
//   let min = 0;

//   if (!product) {
//     return null;
//   } else if (product.wholesalePrices) {
//     return convertMoney(product.wholesalePrices);
//   } else if (product.ecommerceProductsPackings?.length > 0) {
//     const arr = product.ecommerceProductsPackings.map(
//       item => item.wholesalePrices || 0,
//     );
//     min = Math.min(...arr);
//     return convertMoney(min);
//   }
//   return null;
// };

// export const getQuantitiesProduct = product => {
//   if (!product) {
//     return null;
//   } else if (product.ecommerceProductsPackings?.length > 0) {
//     const arr = product.ecommerceProductsPackings.map(
//       item => item.quantities || 0,
//     );
//     const sum = arr.reduce((accumulator, curr) => accumulator + curr);
//     return sum;
//     //  console.log('sum', sum);
//   }
//   return null;
// };

// export const formatDate = _date => {
//   const _year = dayjs(_date).get('year');
//   const _month = dayjs(_date).get('month');
//   const _day = dayjs(_date).get('date');

//   const str = `${_day} Th${_month + 1}, ${_year}`;
//   return str;
// };

// export function emojiToUnicode(str) {
//   return str.replace(
//     /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
//     function (e) {
//       return (
//         '\\u' +
//         e.charCodeAt(0).toString(16) +
//         '\\u' +
//         e.charCodeAt(1).toString(16)
//       );
//     },
//   );
// }

// export function unicodeToChar(text) {
//   if (!text) {
//     return null;
//   }
//   const str = text.replace(/\\u[\dA-F]{4}/gi, function (match) {
//     return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
//   });
//   // console.log('str', str);
//   return str.replace(/\\uNaN/g, '');
// }

// export const getPercentSale = product => {
//   let sale = 0;

//   if (!product) {
//     return null;
//   } else if (product.dealPrice && product.price) {
//     sale =
//       ((Number(product.price) - Number(product.dealPrice)) /
//         Number(product.price)) *
//       100;
//   } else if (product.ecommerceProductsPackings?.length > 0) {
//     const info = product.ecommerceProductsPackings[0];
//     sale =
//       ((Number(info?.price) - Number(info?.dealPrice)) / Number(info?.price)) *
//       100;
//   }

//   return sale !== 0 ? Math.ceil(sale) : null;
// };

// export const extractContent = html => {
//   return html?.replace(/<[^>]+>/g, '');
// };

// export const renderMoney = data => {
//   if (!data?.moneyFrom && !data?.moneyTo) {
//     return 'Thỏa thuận';
//   } else {
//     return `${data?.moneyFrom || 0} - ${data?.moneyTo} triệu`;
//   }
// };

// export const isDayExpired = date =>
//   dayjs().date() === dayjs(date).date() ? false : dayjs().isAfter(dayjs(date));

// export const genColor = num => {
//   switch (num) {
//     case 1:
//       return '#EC411B';
//     case 2:
//       return '#2EEC1B';
//     case 3:
//       return '#1CD2DA';
//     default:
//       return '#218EEE';
//   }
// };

// ///////////////////////////////////////////

// function makeid(length) {
//   var result = '';
//   var characters =
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   var charactersLength = characters.length;
//   for (var i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }
// const arrImage = [
//   'https://thuthuatnhanh.com/wp-content/uploads/2019/12/anh-anime-dep-de-thuong.jpg',
//   'https://freenice.net/wp-content/uploads/2021/08/Tai-hinh-nen-anime-nam-cuc-dep-cho-may-tinh.jpg',
//   'https://bpackingapp.com/wp-content/uploads/2021/12/hinh-anh-anime-tinh-yeu-buon-khoc-820x513-1-780x470.jpg',
//   'https://vuongquocdongu.com/wp-content/uploads/2021/10/hinh-anh-anime-1-scaled-1-780x470.jpg',
//   'https://freenice.net/wp-content/uploads/2021/08/Bo-suu-tap-hinh-anh-anime-ngau-chat-va-nghe-thuat.jpg',
// ];

// export const genArrayData = (num = 10, characters = 10) => {
//   const arr = new Array(num).fill(0).map((item, index) => ({
//     id: index,
//     name: makeid(Math.random() * characters + index),
//     url: arrImage[Math.floor(Math.random() * arrImage.length)],
//   }));

//   return arr;
// };

// export const getPermissionsLibrary = async () => {
//   let isGranted = false;
//   const stt = await ImagePicker.getMediaLibraryPermissionsAsync();
//   if (stt?.status !== 'granted') {
//     let mStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (mStatus?.status === 'granted') {
//       isGranted = true;
//     }
//   } else {
//     isGranted = true;
//   }
//   return isGranted;
// };

// export const getPermissionsCamera = async () => {
//   let isGranted = false;
//   const stt = await ImagePicker.getCameraPermissionsAsync();
//   if (stt?.status !== 'granted') {
//     let mStatus = await ImagePicker.requestCameraPermissionsAsync();
//     if (mStatus?.status === 'granted') {
//       isGranted = true;
//     }
//   } else {
//     isGranted = true;
//   }
//   return isGranted;
// };

// export const getStatusData = (data, filter) => {
//   if (data?.length > 0) {
//     return 1;
//   } else {
//     if (Object.keys(filter)?.length > 0) {
//       return 2;
//     }
//     return 0;
//   }
// };

// export const checkAdmin = key => {
//   return ['1', '2', '6', '7'].includes(key);
// };

// export const filterRouteNavigation = (navigation, filter = () => true) => {
//   navigation.dispatch(state => {
//     // Remove the ListAddProducts & AddProductWarehouseIn route from the stack
//     const routes = state.routes.filter(filter);

//     return CommonActions.reset({
//       ...state,
//       routes,
//       index: routes.length - 1,
//     });
//   });
// };
