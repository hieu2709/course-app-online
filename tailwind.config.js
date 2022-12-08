module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        qs: ['qs_300'],
        'qs-regular': ['qs_400'],
        'qs-medium': ['qs_500'],
        'qs-semibold': ['qs_600'],
        'qs-bold': ['qs_700'],
      },
      boxShadow: {
        blue: '0px 40px 100px rgba(0,128,255, 0.9)',
      },
    },
    colors: {
      transparent: 'transparent',
      black: '#181A20',
      'black-light': '#1F222A',
      white: '#FFFFFF',
      gray: '#9D9D9D',
      'gray-light': '#FAFAFA',
      'gray-dark': '#1F222A',
      'gray-border': '#EEEEEE',
      yellow: '#FFCD00',
      red: '#FF6262',
      blue: '#436BFA',
      blueSoft: '#EBEFFE1A',
      blueOpacity: '#335EF71A',
      green: '#2AC9A9',
      orange: '#FC9E19',
    },
  },
};
