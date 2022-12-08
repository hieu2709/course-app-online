import React from 'react';
import { useState, createContext } from 'react';
const CourseContext = createContext();
function CourseProvider({ children, course, countLesson }) {
  return (
    <CourseContext.Provider value={{ course, countLesson }}>
      {children}
    </CourseContext.Provider>
  );
}
export { CourseContext, CourseProvider };
