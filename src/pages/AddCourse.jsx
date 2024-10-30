import React, { useState } from 'react';
import axios from 'axios';

const AddCourse = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/courses/', {
        name,
        description,
      });
      setName('');
      setDescription('');
      alert('Course added successfully!');
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Course</h2>
        <div className="mb-4 ">
          <input
            type="text"
            placeholder="Course Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition duration-200"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
