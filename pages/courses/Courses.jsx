import React,{useEffect} from 'react'
import "./courses.css";
import { CourseData } from '../../context/CourseContext';
import CourseCard from "../../Components/coursecard/CourseCard";

const Courses = () => {
const {courses} = CourseData()
   // ✅ Ye block sirf tab chalega jab courses update honge
  useEffect(() => {
    console.log("Courses updated:", courses);
  }, [courses]);

  return (
    <div className="course">
        <h2>Available Courses</h2>

        <div className="course-container">
            {
                courses && courses.length > 0 ? courses.map((e) => (
                    <CourseCard key = {e._id} course={e} />
                )) :(<p>Courses Yet</p>)
            }
        </div>
    </div>   
  );
};

export default Courses;