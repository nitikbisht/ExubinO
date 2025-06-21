import React, { useEffect, useState } from 'react';
import './Courses.css';
import { useNavigate } from 'react-router-dom';
import API from '../../api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await API.get('/api/courses');
      setCourses(res.data.courses); // assuming your response is an array of courses
    } catch (err) {
      console.error("Failed to fetch courses", err);
    }
  };

  fetchCourses();
}, []);


  const handleStartExam = (courseId) => {
    navigate(`/exam/${courseId}`);
  };

  return (
    <div className="courses-container">
      <h2>Available Courses</h2>
      <div className="course-grid">
        {courses?.map(course => (
          <div className="course-card" key={course.id}>
            <h3>{course.name}</h3>
            <p>Course ID: {course.id}</p>
            <button onClick={() => handleStartExam(course.id)}>
              Start Exam
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
