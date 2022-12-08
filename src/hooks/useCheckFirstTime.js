import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { selectFirstTime } from '~/redux/firstTimeReducer';

function useCheckFirstTime() {
  const [isFirstTime, setIsFirstTime] = useState(null);
  const isFirst = useSelector(selectFirstTime);
  const getFirstTime = async () => {
    try {
      const value = await AsyncStorage.getItem('firstTime');
      if (value !== null) {
        setIsFirstTime(false);
      } else {
        setIsFirstTime(true);
      }
    } catch (e) {
      console.log('error getFirsTime:', e);
    }
  };
  useEffect(() => {
    getFirstTime();
  }, [isFirst]);
  return isFirstTime;
}

export default useCheckFirstTime;
