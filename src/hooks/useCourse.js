import { useContext } from 'react';
import { CourseContext } from '~/provider/CourseProvider';
const useCourse = () => {
  return useContext(CourseContext);
};
export default useCourse;
