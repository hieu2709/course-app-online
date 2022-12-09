import React from 'react';
import { useState, createContext } from 'react';
const CourseContext = createContext();
function CourseProvider({ children, course, countLesson, totalTime }) {
  return (
    <CourseContext.Provider value={{ course, countLesson, totalTime }}>
      {children}
    </CourseContext.Provider>
  );
}
export { CourseContext, CourseProvider };
