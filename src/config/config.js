export const config = [
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
  {
    name: 'EditProfile',
    component: require('~/screens/Profile/EditProfile').default,
    options: {},
  },
  {
    name: 'Transaction',
    component: require('~/screens/Transaction/Transaction').default,
    options: {},
  },
  {
    name: 'AllMentor',
    component: require('~/screens/All/AllMentor').default,
    options: {},
  },
  {
    name: 'DetailLesson',
    component: require('~/screens/Detail/DetailLesson').default,
    options: {},
  },
];
export const noLogin = [
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
];
