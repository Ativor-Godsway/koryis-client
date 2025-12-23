import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import confetti from "canvas-confetti";

import { playTTS, stopTTS } from "../../services/tts";
import { shuffleArray } from "../../utils/shuffel";

import { useGetTaskByIdQuery } from "../../redux/TaskApi";
import { useGetStudentTaskByIdQuery } from "../../redux/studentQuestionsApi";
import {
  useGetGradePerTaskQuery,
  useSubmitGradeMutation,
} from "../../redux/GradeApi";

import { QuestionDisplay } from "./components/QuestionDisplay";
import { ModalExplanation } from "./components/ModalExplanation";
import { CompletedScreen } from "./components/CompletedScreen";
import { IntroScreen } from "./components/IntroScreen";

export default function TaskDetail() {
  const { taskId } = useParams();
  const studentInfo = JSON.parse(localStorage.getItem("student"));

  const studentId = studentInfo?.code;
  const teacher = studentInfo?.teacher;

  const MAX_ATTEMPTS = 2;

  // ------------------ FETCH TASK ------------------
  const {
    data: teacherTask,
    isLoading: teacherLoading,
    error: teacherError,
  } = useGetTaskByIdQuery(taskId, { skip: !teacher });

  const {
    data: studentTask,
    isLoading: studentLoading,
    error: studentError,
  } = useGetStudentTaskByIdQuery(taskId, { skip: !!teacher });

  const task = teacher ? teacherTask : studentTask?.task;

  // ------------------ GRADE ------------------
  const { data: gradeInfo } = useGetGradePerTaskQuery(
    { studentId, taskId },
    { skip: !studentId }
  );

  const previousScore = gradeInfo?.data?.[0]?.score || null;

  // ------------------ UI STATE ------------------
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoReadEnabled, setAutoReadEnabled] = useState(true);
  const [shuffleKey, setShuffleKey] = useState(0);

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const [fillInAnswer, setFillInAnswer] = useState("");
  const [showIntro, setShowIntro] = useState(true);

  // attempts
  const [attempts, setAttempts] = useState(0);
  const remainingAttempts = MAX_ATTEMPTS - attempts;

  // for wrong selection styling
  const [selectedWrong, setSelectedWrong] = useState(null);

  // ------------------ QUESTIONS ------------------
  const questionsData = task || {};
  const plainQuestions = questionsData?.questions || [];

  const questions = useMemo(() => {
    return shuffleArray([...plainQuestions]);
  }, [plainQuestions, shuffleKey]);

  const total = questions.length;

  const isFillIn =
    questions[current]?.options?.length === 0 || !questions[current]?.options;

  // ------------------ SUBMIT SCORE ------------------
  const [submitGrade] = useSubmitGradeMutation();

  useEffect(() => {
    if (!completed || !questionsData?._id || total === 0) return;

    const percent = Math.round((score / total) * 100);

    submitGrade({
      student: studentId,
      task: questionsData._id,
      topic: questionsData.topic,
      score: percent,
    }).catch((err) => console.error(err));
  }, [completed]);

  // ------------------ CONFETTI ------------------
  useEffect(() => {
    if (completed) {
      confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
    }
  }, [completed]);

  // ------------------ HANDLERS ------------------
  const handleAnswer = (e, selected) => {
    e.preventDefault();
    stopTTS(setIsSpeaking);

    const question = questions[current];
    if (!question) return;

    const correct = String(question.answer).toLowerCase().trim();
    const user = String(selected).toLowerCase().trim();

    // ✅ CORRECT
    if (user === correct) {
      setScore((prev) => prev + 1);
      setAttempts(0);
      setSelectedWrong(null);

      if (current + 1 < total) {
        setCurrent((prev) => prev + 1);
      } else {
        setCompleted(true);
      }

      setFillInAnswer("");
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.7 } });
      return;
    }

    // ❌ WRONG
    setAttempts((prev) => prev + 1);
    setSelectedWrong(selected);

    if (attempts + 1 >= MAX_ATTEMPTS) {
      setModalText(question.explanation || "No explanation provided.");
      setShowModal(true);
    }
  };

  const goToNextQuestion = () => {
    stopTTS(setIsSpeaking);
    setShowModal(false);

    if (current + 1 < total) {
      setCurrent((prev) => prev + 1);
    } else {
      setCompleted(true);
    }

    setAttempts(0);
    setSelectedWrong(null);
    setFillInAnswer("");
  };

  const restartQuiz = () => {
    stopTTS(setIsSpeaking);
    setShuffleKey((prev) => prev + 1);
    setCurrent(0);
    setScore(0);
    setCompleted(false);
    setAttempts(0);
    setSelectedWrong(null);
    setFillInAnswer("");
    setShowModal(false);
    setShowIntro(false);
  };

  // ------------------ PROGRESS ------------------
  const progressPercent = total
    ? ((current + (completed ? 1 : 0)) / total) * 100
    : 0;

  if (teacherLoading || studentLoading)
    return <p className="text-center mt-20 text-xl">Loading task...</p>;

  if (teacherError || studentError)
    return (
      <p className="text-center mt-20 text-red-500">
        Failed to load this task.
      </p>
    );

  if (!task || total === 0)
    return (
      <p className="text-center mt-20 text-gray-500">
        No questions available for this task.
      </p>
    );

  if (showIntro)
    return (
      <IntroScreen
        questionsData={questionsData}
        onProceed={() => setShowIntro(false)}
        stopTTS={() => stopTTS(setIsSpeaking)}
        isSpeaking={isSpeaking}
        setAutoReadEnabled={setAutoReadEnabled}
        previousScore={previousScore}
      />
    );

  if (completed)
    return (
      <CompletedScreen
        score={score}
        previousScore={previousScore}
        questions={questions}
        questionsData={questionsData}
        restartQuiz={restartQuiz}
      />
    );

  // ------------------ MAIN DISPLAY ------------------
  return (
    <>
      <QuestionDisplay
        question={questions[current]}
        current={current}
        total={total}
        progressPercent={progressPercent}
        handleAnswer={handleAnswer}
        fillInAnswer={fillInAnswer}
        setFillInAnswer={setFillInAnswer}
        attempts={attempts}
        maxAttempts={MAX_ATTEMPTS}
        remainingAttempts={remainingAttempts}
        isFillIn={isFillIn}
        selectedWrong={selectedWrong}
      />

      <ModalExplanation
        question={questions[current]}
        show={showModal}
        modalText={modalText}
        correctAnswer={questions[current]?.answer}
        goToNextQuestion={goToNextQuestion}
        stopTTS={() => stopTTS(setIsSpeaking)}
        setAutoReadEnabled={setAutoReadEnabled}
        isSpeaking={isSpeaking}
      />
    </>
  );
}
