import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddSubject from './AddSubject';

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editSubjectId, setEditSubjectId] = useState(null);
  const [editSubjectName, setEditSubjectName] = useState('');
  const [editCourseName, setEditCourseName] = useState('');

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/subjects/');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleFormSubmit = async () => {
    await fetchSubjects();
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/subjects/${id}/`);
      await fetchSubjects();
    } catch (error) {
      console.error('Error deleting subject:', error);
      alert('Failed to delete subject. Please try again later.');
    }
  };

  const handleEditClick = (id, name, course) => {
    setEditSubjectId(id);
    setEditSubjectName(name);
    setEditCourseName(course ? course.name : '');
  };


  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:8000/api/subjects/${editSubjectId}/`, {
        name: editSubjectName,
        course: editCourseName,
      });
      await fetchSubjects();
      setEditSubjectId(null);
      setEditSubjectName('');
      setEditCourseName('');
    } catch (error) {
      console.error('Error updating subject:', error);
      alert('Failed to update subject. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6">Subjects List</h2>

      {showForm && <AddSubject onSubmit={handleFormSubmit} />}

      <div className="w-full max-w-4xl bg-white rounded shadow-md overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Subject Name</th>
              <th className="py-3 px-6 text-left">Course Name</th>
              <th className="py-3 px-6 text-left"></th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {subjects.map((subjectItem) => (
              <tr key={subjectItem.id} className="border-b border-gray-300 hover:bg-gray-100 transition duration-200">
                {editSubjectId === subjectItem.id ? (
                  <>
                    <td className="py-3 px-6">
                      <input
                        type="text"
                        value={editSubjectName}
                        onChange={(e) => setEditSubjectName(e.target.value)}
                        placeholder="Subject Name"
                        className="border border-gray-300 rounded-md px-2 py-1 w-full focus:outline-none"
                      />
                    </td>
                    <td className="py-3 px-6">
                      <input
                        type="text"
                        value={editCourseName}
                        onChange={(e) => setEditCourseName(e.target.value)}
                        placeholder="Course Name"
                        className="border border-gray-300 rounded-md px-2 py-1 w-full focus:outline-none"
                      />
                    </td>
                    <td className="py-3 px-6 flex items-center">
                      <button
                        onClick={handleUpdateSubmit}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditSubjectId(null)}
                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md ml-2 hover:bg-gray-400 transition duration-200"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-3 px-6">{subjectItem.name}</td>
                    <td className="py-3 px-6">{subjectItem.course ? subjectItem.course.name : 'No Course'}</td>
                    <td className="py-3 px-6 flex items-center">
                      <button
                        onClick={() => handleEditClick(subjectItem.id, subjectItem.name, subjectItem.course)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(subjectItem.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition duration-200"
      >
        {showForm ? 'Cancel' : 'Add Subject'}
      </button>
    </div>
  );
};

export default SubjectList;
