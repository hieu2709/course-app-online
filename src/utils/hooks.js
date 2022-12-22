import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useRef } from 'react';

export function useRefreshOnFocus(refetch, enabled = true) {
  const enabledRef = useRef(false);
  useFocusEffect(
    useCallback(() => {
      if (enabledRef.current && enabled) {
        refetch();
      } else {
        enabledRef.current = true;
      }
    }, [enabled, refetch]),
  );
}
