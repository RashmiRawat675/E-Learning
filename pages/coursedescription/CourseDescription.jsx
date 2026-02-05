import React, { useEffect, useState } from 'react'
import "./coursedescription.css";
import { useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import { useNavigate } from 'react-router-dom';
import { server } from '../../main';  
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserData } from '../../context/UserContext';
import Loading from '../../Components/loading/Loading';

 
const CourseDescription = () => {
  const {id} = useParams(); 
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const {user, fetchUser} = UserData();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData(); 
   

  useEffect(() => {
    if (id) {
      fetchCourse(id); 
    }
  }, [id]);

  const checkoutHandler = async() => {
     const token = localStorage.getItem("token");
    setLoading(true)
    
    const {data:{order}} = 
    await axios.post(`${server}/api/course/checkout/${id}`, {} , {
      headers:{
        token,
      },
    });

    const options = {
       key: "rzp_test_RAIus99IU93GPg", // Enter the Key ID generated from the Dashboard
    amount: order.amount, // Amount is in currency subunits. 
    currency: "INR",
    name: "E Learing", //your business name
    description: "Learn with me", 
    order_id:  order.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  
    handler: async function(response){
    const { razorpay_order_id,  razorpay_payment_id , razorpay_signature} =
     response; 
     try {
        const {data} = await axios.post(
          `${server}/api/verification/${id}`,
          {
            razorpay_order_id,
           razorpay_payment_id,
            razorpay_signature,
          },
          {
            headers : {
              token,
            },
          }
        ); 
         await fetchUser();
        await fetchCourses();
        await fetchMyCourse();
        toast.success(data?.message || "Payment Successfull");
        navigate(`/payment-success/${razorpay_payment_id}`);
     } catch (error) {
      console.log("Verification Error : ", error);
      
      toast.error(error.response.data.message || "Payment Failed"); ;
     }
     
      finally{
       setLoading(false);
     }
    },
         theme: {
        color: "#8a4baf"
    },
   }; 
        const razorpay = new window.Razorpay(options);
        razorpay.open()
  };
  return (
     <>
      {
        loading? (
          <Loading />
        ) : (
           course && (
             <div className='course-description'>
             <div className="course-header">
              <img src={`${server}/${course.image}`} 
              alt= ""
              className='course-image'
             />             
              <div className="course-info">
                <h2>{course.title}</h2>
                <p>Instructor : {course.createdBy}</p>
                <p>Duration : {course.duration} Weeks</p>
              </div>
             </div>
              <p>{course.description}</p>

              <p>Let's get started with course At INR.{course.price}</p> 
              { 
              user && user?.subscription?.includes(course._id) ? (
                <button onClick={() =>navigate(`/course.study/${course._id}`) } className='common-btn'>Study</button>
              ) : (
                <button onClick={checkoutHandler} className='common-btn'>Buy Now</button>
              )}              
            </div>
           )
       )}
    </>
  )
};
export default CourseDescription;