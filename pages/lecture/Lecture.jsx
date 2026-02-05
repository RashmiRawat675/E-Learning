 import React, { useEffect, useState } from "react";
import "./lecture.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../Components/loading/Loading";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);

  const { id } = useParams();

  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchLecture(lecId) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${lecId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }

  useEffect(() => {
    fetchLectures();
  }, [id]); // <- correct

  useEffect(() => {
    if (id) fetchLecture(id); // <- correct
  }, [id]); // <- correct

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="lecture-page">
            <div className="left">
              {lecLoading ? (
                <Loading />
              ) : (
                <>
                  {lecture.video ? (
                    <>
                      <video
                        src={`${server}/${lecture.video}`}
                        width={"100%"}
                        controls
                        controlsList="nondownload noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                        autoPlay
                      ></video>
                      <h1>{lecture.title}</h1>
                      <h3>{lecture.description}</h3>
                    </>
                  ) : (
                    <h1>Please select a lecture</h1>
                  )}
                </>
              )}
            </div>

            <div className="right">
              {user && user.role === "admin" && (
                <button className="common-btn" onClick={() => setShow(!show)}>
                  Add +
                </button>
              )}

              {show && (
                <div className="lecture-form">
                  <h2>Add Lecture</h2>
                  {/* form yaha handle karo */}
                </div>
              )}

              {lectures && lectures.length > 0 ? (
                lectures.map((e, i) => (
                  <div
                    onClick={() => fetchLecture(e._id)}
                    key={i}
                    className="lecture-number"
                  >
                    {i + 1}. {e.title}
                  </div>
                ))
              ) : (
                <p>No Lecture Yet!</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Lecture;
