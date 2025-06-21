import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import "./ExamPage.css";
import API from "../../api";

export default function ExamPage() {
  const { courseId } = useParams();
  const [qSet, setQ] = useState([]);
  const [answers, setA] = useState({});
  const [page, setPage] = useState(1);
  const [total, setT] = useState(10);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(null);
  const nav = useNavigate();
  const timerRef = useRef();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await API.get(`/api/questions/${courseId}?page=${page}`);
        setQ(res.data.questions);
        setT(res.data.totalPages);
      } catch (err) {
        console.error("Failed to fetch questions", err);
      }
    };

    fetchQuestions();
  }, [page]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          finish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const onAnswer = (qid, val) => {
    setA((prev) => ({ ...prev, [qid]: val }));
  };

  const finish = async () => {
    await submitAnswer();
    clearInterval(timerRef.current);
    await submitExam();
  };

  const submitAnswer = async () => {
    try {
      await API.post(`/api/exam/answers`, {
        answers: Object.entries(answers).map(([qid, selectedOption]) => ({
          questionId: qid,
          selectedOption,
        })),
      });
    } catch (err) {
      console.error("Failed to submit answers", err);
    }
  };

  const submitExam = async () => {
    try {
      const res = await API.post(`/api/exam/submit`, { courseId });
      setScore(res.data.score);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to submit exam", err);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    nav("/courses");
  };

  return (
    <>
      {total > 0 ? (
        <div className="exam-container">
          <div className="exam-header">
            <h2>
              Exam (Page {page} / {total})
            </h2>
            <div className="exam-timer">
              ⏳ Time Left: <b>{formatTime(timeLeft)}</b>
            </div>
          </div>

          {qSet.map((q) => (
            <QuestionCard
              key={q.id}
              q={q}
              answer={answers[q.id]}
              onAnswer={onAnswer}
            />
          ))}

          <div className="exam-actions">
            {page > 1 && (
              <button onClick={() => setPage((p) => p - 1)}>Previous</button>
            )}
            {page < total && (
              <button
                onClick={() => {
                  submitAnswer();
                  setPage((p) => p + 1);
                }}
              >
                Next
              </button>
            )}
            {page === total && (
              <button className="submit-btn" onClick={finish}>
                Submit Exam
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>Exam not Available</p>
      )}

      {/* Modal for Score */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>🎉 Exam Submitted!</h2>
            <p>Your score is: <strong>{score}</strong></p>
            <button onClick={handleCloseModal}>Go to Courses</button>
          </div>
        </div>
      )}
    </>
  );
}
