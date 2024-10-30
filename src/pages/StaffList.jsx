import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddStaff from './AddStaff';

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editStaffId, setEditStaffId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editSubjects, setEditSubjects] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);

  // Function to fetch all subjects for selection options
  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/subjects/');
      setAllSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  // Fetch staff and subjects on component mount
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/staff/');
        setStaff(response.data);
      } catch (error) {
        console.error('Error fetching staff:', error);
      }
    };
    fetchStaff();
    fetchSubjects();
  }, []);

  const handleFormSubmit = async () => {
    await fetchStaff();
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/staff/${id}/`);
      await fetchStaff();
    } catch (error) {
      console.error('Error deleting staff:', error);
      alert('Failed to delete staff. Please try again later.');
    }
  };

  const handleEditClick = (staff) => {
    setEditStaffId(staff.id);
    setEditName(staff.name);
    setEditEmail(staff.email);
    setEditSubjects(staff.subjects.map((subject) => subject.id));
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:8000/api/staff/${editStaffId}/`, {
        name: editName,
        email: editEmail,
        subject_ids: editSubjects,
      });
      await fetchStaff();
      setEditStaffId(null);
      setEditName('');
      setEditEmail('');
      setEditSubjects([]);
    } catch (error) {
      console.error('Error updating staff:', error);
      alert('Failed to update staff. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6">Staff List</h2>

      {showForm && <AddStaff onSubmit={handleFormSubmit} />}

      <div className="w-full max-w-4xl bg-white rounded shadow-md overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Subjects</th>
              <th className="py-3 px-6 text-left"></th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {staff.map((staffMember) => (
              <tr key={staffMember.id} className="border-b border-gray-300 hover:bg-gray-100 transition duration-200">
                {editStaffId === staffMember.id ? (
                  <>
                    <td className="py-3 px-6">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border rounded-md px-2 py-1 w-full"
                      />
                    </td>
                    <td className="py-3 px-6">
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="border rounded-md px-2 py-1 w-full"
                      />
                    </td>
                    <td className="py-3 px-6">
                      <select
                        multiple
                        value={editSubjects}
                        onChange={(e) =>
                          setEditSubjects(Array.from(e.target.selectedOptions, option => parseInt(option.value)))
                        }
                        className="border rounded-md px-2 py-1 w-full"
                      >
                        {allSubjects.map((subject) => (
                          <option key={subject.id} value={subject.id}>
                            {subject.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-6 flex items-center">
                      <button
                        onClick={handleUpdateSubmit}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditStaffId(null)}
                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md ml-2 hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-3 px-6">{staffMember.name}</td>
                    <td className="py-3 px-6">{staffMember.email}</td>
                    <td className="py-3 px-6">
                      {staffMember.subjects.length > 0 ? (
                        <ul>
                          {staffMember.subjects.map((subject) => (
                            <li key={subject.id}>{subject.name}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>N/A</p>
                      )}
                    </td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => handleEditClick(staffMember)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(staffMember.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
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
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
      >
        {showForm ? 'Cancel' : 'Add Staff'}
      </button>
    </div>
  );
};

export default StaffList;
