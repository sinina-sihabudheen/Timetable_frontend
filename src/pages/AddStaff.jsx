import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddStaff = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/subjects/');
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchSubjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/staff/', {
        name,
        email,
        subject_ids: selectedSubjects,
      });
      setName('');
      setEmail('');
      setSelectedSubjects([]);
      alert('Staff added successfully!');
      onSubmit();
    } catch (error) {
      console.error('Error adding staff:', error);
    }
  };

  const handleSubjectChange = (e) => {
    const options = e.target.options;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => parseInt(option.value));
  
    // Use the spread operator to create a new array
    setSelectedSubjects(prevSelected => [
      ...prevSelected,
      ...selectedValues.filter(value => !prevSelected.includes(value)), // Only add new values
    ]);
  
    console.log('Updated Selected Subjects:', selectedValues);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Staff Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="subjects" className="block mb-2 font-medium">Select Subjects</label>
        <select
          id="subjects"
          multiple
          onChange={handleSubjectChange} // Handle multiple selection
          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition duration-200"
      >
        Add Staff
      </button>
    </form>
  );
};

export default AddStaff;
