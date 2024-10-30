import React from 'react';
import { useNavigate } from 'react-router-dom';

const TimetableManagement = () => {
  const navigate = useNavigate();

  const handleAddStaff = () => {
    navigate('/staff');
  };

  const handleAddSubject = () => {
    navigate('/subject');
  };

  const handleAddCourse = () => {
    navigate('/course');
  };

  const handleGetTimetable = () => {
    navigate('/get-timetable');
  };

  return (
   
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
      <div className="border-2 border-gary-500 p-10 rounded-lg bg-gray-400 shadow-md text-center">
      <h1 className="text-3xl text-red-700 font-bold mb-6">Welcome To, <br /> Timetable Generator App</h1>
      <div className="space-x-4">
        <button
          onClick={handleAddStaff}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Staffs
        </button>
        <button
          onClick={handleAddSubject}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Subjects
        </button>
        <button
          onClick={handleAddCourse}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Courses
        </button>
        <button
          onClick={handleGetTimetable}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Get Timetable
        </button>
      </div>
      </div>
    </div>
  );
};

export default TimetableManagement;
