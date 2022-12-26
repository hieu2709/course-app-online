import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';
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
export function useRefreshByUser(refetch, enabled = true) {
  const [isRefetchingByUser, setIsRefetchingByUser] = useState(false);
  async function refetchByUser() {
    if (enabled) {
      setIsRefetchingByUser(true);

      try {
        await refetch();
      } finally {
        setIsRefetchingByUser(false);
      }
    }
  }

  return {
    isRefetchingByUser,
    refetchByUser,
  };
}
