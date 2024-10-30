import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddCourse from './AddCourse';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);
  const [editCourseName, setEditCourseName] = useState('');
  const [editCourseDescription, setEditCourseDescription] = useState('');

 
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/courses/');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleFormSubmit = async () => {
    await fetchCourses();
    setShowForm(false);
  };

 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/courses/${id}/`);
      await fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course. Please try again later.');
    }
  };

  const handleEditClick = (id, name, description) => {
    setEditCourseId(id);
    setEditCourseName(name);
    setEditCourseDescription(description);
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:8000/api/courses/${editCourseId}/`, {
        name: editCourseName,
        description: editCourseDescription,
      });
      await fetchCourses();
      setEditCourseId(null);
      setEditCourseName('');
      setEditCourseDescription('');
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Failed to update course. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6">Courses</h2>

      {showForm && <AddCourse onSubmit={handleFormSubmit} />}

      <ul className="w-full max-w-md bg-white rounded shadow-md">
        {courses.map((course) => (
          <li key={course.id} className="p-4 border-b last:border-b-0 flex flex-col items-start">
            {editCourseId === course.id ? (
              <div className="w-full">
                <input
                  type="text"
                  value={editCourseName}
                  onChange={(e) => setEditCourseName(e.target.value)}
                  placeholder="Course Name"
                  className="border border-gray-300 rounded-md px-2 py-1 mr-2 w-full mb-2 focus:outline-none"
                />
                <textarea
                  value={editCourseDescription}
                  onChange={(e) => setEditCourseDescription(e.target.value)}
                  placeholder="Course Description"
                  className="border border-gray-300 rounded-md px-2 py-1 w-full mb-2 focus:outline-none"
                />
                <div className="flex">
                  <button
                    onClick={handleUpdateSubmit}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditCourseId(null)}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md ml-2 hover:bg-gray-400 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-grow">
                  <h3 className="font-semibold">{course.name}</h3>
                  <p className="text-gray-600">{course.description || 'No description available'}</p>
                </div>
                <div className="mt-2 flex">
                  <button
                    onClick={() => handleEditClick(course.id, course.name, course.description)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition duration-200"
      >
        {showForm ? 'Cancel' : 'Add Course'}
      </button>
    </div>
  );
};

export default CourseList;
