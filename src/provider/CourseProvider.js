import React from 'react';
import { createContext } from 'react';
const CourseContext = createContext();
function CourseProvider({
  children,
  course,
  countLesson,
  totalTime,
  review,
  rate,
}) {
  return (
    <CourseContext.Provider
      value={{ course, countLesson, totalTime, review, rate }}>
      {children}
    </CourseContext.Provider>
  );
}
export { CourseContext, CourseProvider };
