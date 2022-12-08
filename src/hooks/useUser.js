import { useContext } from 'react';
import { UserContext } from '~/UserProvider';
const useUser = () => {
  return useContext(UserContext);
};
export default useUser;
