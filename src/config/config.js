export const config = [
  {
    name: 'Login',
    component: require('~/screens/Auth/Login').default,
    options: {},
  },
  {
    name: 'Register',
    component: require('~/screens/Auth/Register').default,
    options: {},
  },
  {
    name: 'FillProfile',
    component: require('~/screens/Auth/FillProfile').default,
    options: {},
  },
  {
    name: 'Search',
    component: require('~/screens/Search/Search').default,
    options: {},
  },
  {
    name: 'DetailCourse',
    component: require('~/screens/Detail/DetailCourse').default,
    options: {},
  },
  {
    name: 'DetailMentor',
    component: require('~/screens/Detail/DetailMentor').default,
    options: {},
  },
  {
    name: 'AllLessons',
    component: require('~/screens/All/AllLessons').default,
    options: {},
  },
  {
    name: 'DetailMyCourse',
    component: require('~/screens/MyCourse/DetailMyCourse').default,
    options: {},
  },
];
