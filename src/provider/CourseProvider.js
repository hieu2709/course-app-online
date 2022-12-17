import React from 'react';
import { createContext } from 'react';
const CourseContext = createContext();
function CourseProvider({
  children,
  course,
  countLesson,
  totalTime,
  countStudent,
}) {
  return (
    <CourseContext.Provider
      value={{ course, countLesson, totalTime, countStudent }}>
      {children}
    </CourseContext.Provider>
  );
}
export { CourseContext, CourseProvider };
