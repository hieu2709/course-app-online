import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, userLogin, userLogout } from '~/redux/userReducer';
function useCheckUser() {
  const [isLogin, setIsLogin] = useState(null);
  const user = useSelector(selectUser);
  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    } catch (e) {
      console.log('error getUser:', e);
    }
  };
  // console.log('isLogin', isLogin);
  useEffect(() => {
    getUser();
  }, [user]);
  return isLogin;
}

export default useCheckUser;
