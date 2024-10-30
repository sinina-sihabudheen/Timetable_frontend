import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TimetableManagement from './components/TimetableManagement';
import StaffList from './pages/StaffList';
import SubjectList from './pages/SubjectList';
import CourseList from './pages/CourseList';
import GetTimetable from './pages/GetTimeTable';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TimetableManagement />} />
        <Route path="/staff" element={<StaffList />} />
        <Route path="/subject" element={<SubjectList />} />
        <Route path="/course" element={<CourseList />} />
        <Route path="/get-timetable" element={<GetTimetable />} />
      </Routes>
    </Router>
  );
};

export default App;
