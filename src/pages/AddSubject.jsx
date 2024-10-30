import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSubject = () => {
  const [courses, setCourses] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get('http://localhost:8000/api/courses/');
      setCourses(response.data);
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/subjects/', {
        name: subjectName,
        course_id: selectedCourse,
      });
      setSubjectName('');
      setSelectedCourse('');
      alert('Subject added successfully!');
    } catch (error) {
      console.error('Error adding subject:', error);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Subject</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Subject Name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className="mb-4">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition duration-200">
          Add Subject
        </button>
      </form>
    </div>
  );
};

export default AddSubject;
