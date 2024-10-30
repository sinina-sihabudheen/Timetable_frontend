import React, { useEffect, useState } from 'react';
import axios from 'axios';

const formatTime = (time) => {
  if (typeof time !== 'string') {
    console.error("Invalid time format:", time);
    return "N/A"; 
  }

  const [hours, minutes] = time.split(':');
  const hoursIn12 = hours % 12 || 12;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  return `${hoursIn12}:${minutes} ${ampm}`;
};

const GetTimetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [days, setDays] = useState([]);
  const [periods, setPeriods] = useState([]);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/timetable/');
        setTimetable(response.data);
      } catch (error) {
        console.error('Error fetching timetable:', error);
      }
    };

    const fetchDays = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/days/');
        setDays(response.data);
      } catch (error) {
        console.error('Error fetching days:', error);
      }
    };

    const fetchPeriods = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/periods/');
        setPeriods(response.data);
      } catch (error) {
        console.error('Error fetching periods:', error);
      }
    };

    fetchTimetable();
    fetchDays();
    fetchPeriods();
  }, []);

  // Group timetable data by course for separate tables
  const groupedTimetable = timetable.reduce((acc, item) => {
    const courseName = item.course.name;
    if (!acc[courseName]) {
      acc[courseName] = [];
    }
    acc[courseName].push(item);
    return acc;
  }, {});

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Timetable</h2>
      {Object.keys(groupedTimetable).map((courseName) => (
        <div key={courseName} className="mb-8 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-xl font-semibold mb-4">{courseName}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-4 text-left">Day / Period</th>
                  {periods.map((period) => (
                    <th key={period.id} className="py-3 px-4 text-center">
                      {formatTime(period.start_time)} - {formatTime(period.end_time)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {days.map((day) => (
                  <tr key={day.id} className="border-b border-gray-300 hover:bg-gray-100 transition duration-200">
                    <td className="py-3 px-4 font-semibold">{day.name}</td>
                    {periods.map((period) => {
                      // Find the specific timetable entry for this day and period
                      const entry = groupedTimetable[courseName].find(
                        (item) => item.day.id === day.id && item.period.id === period.id
                      );
                      return (
                        <td key={period.id} className="py-3 px-4 text-center">
                          {entry ? (
                            <>
                              <div>{entry.subject.name}</div>
                              <div className="text-xs text-gray-500">{entry.staff ? entry.staff.name : 'N/A'}</div>
                            </>
                          ) : (
                            <span>Free Period</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetTimetable;
