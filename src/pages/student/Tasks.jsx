import { useEffect, useMemo, useState } from "react";
import { HiMiniSpeakerXMark, HiMiniSpeakerWave } from "react-icons/hi2";
import { playTTS, stopTTS } from "../../services/tts";
import { useGetTasksByTeacherQuery } from "../../redux/TaskApi";
import { algebraQuestions } from "../../data/questions";
import { useSubmitGradeMutation } from "../../redux/GradeApi";
import { shuffleArray } from "../../utils/shuffel";
import confetti from "canvas-confetti";

// Components
import { QuestionDisplay } from "./components/QuestionDisplay";
import { ModalExplanation } from "./components/ModalExplanation";
import { CompletedScreen } from "./components/CompletedScreen";
import { IntroScreen } from "./components/IntroScreen";

export default function Tasks() {
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

  const [attempts, setAttempts] = useState(0);
  const [maxAttempts, setMaxAttempts] = useState(2);

  const studentInfo = JSON.parse(localStorage.getItem("student"));
  const teacherId = studentInfo?.teacher;

  const { data, isLoading, error } = useGetTasksByTeacherQuery(teacherId);

  const questionsData = teacherId
    ? data?.tasks?.[0] || null
    : algebraQuestions || null;

  const plainQuestions = questionsData?.questions || [];

  const questions = useMemo(
    () => shuffleArray(plainQuestions),
    [plainQuestions, shuffleKey],
  );

  const currentQuestion = questions[current];

  // ✅ Submit Grade
  const [submitGrade] = useSubmitGradeMutation();
  useEffect(() => {
    if (completed && questionsData) {
      const scorePercentage = (score / questions.length) * 100;

      submitGrade({
        student: studentInfo?.code,
        task: questionsData._id,
        topic: questionsData.topic,
        subTopic: questionsData.subTopic,
        score: scorePercentage,
      }).catch(() => console.log("Assignment already submitted"));
    }
  }, [completed]);

  // ✅ Confetti on completion
  useEffect(() => {
    if (completed) {
      confetti({ particleCount: 250, spread: 80, origin: { y: 0.6 } });
    }
  }, [completed]);

  // ✅ Reset when question changes
  useEffect(() => {
    setFillInAnswer("");
  }, [current]);

  // ✅ SET ATTEMPTS BASED ON QUESTION TYPE
  useEffect(() => {
    if (!questions[current]) return;

    const isFillIn =
      !questions[current]?.options?.length ||
      questions[current]?.type === "fill-in";

    setMaxAttempts(isFillIn ? 1 : 2);
    setAttempts(0);
    setFillInAnswer("");
  }, [current, questions]);

  // ✅ ANSWER HANDLER WITH ATTEMPTS
  const handleAnswer = (e, selected) => {
    e.preventDefault();
    stopTTS(() => {});

    if (attempts >= maxAttempts) return;

    const normalize = (text) =>
      String(text).toLowerCase().trim().replace(/\s+/g, " ");

    const correct = normalize(questions[current].answer);
    const user = normalize(selected);

    if (user === correct) {
      setScore((prev) => prev + 1);

      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
      } else {
        setCompleted(true);
      }

      setAttempts(0);
      setFillInAnswer("");

      confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (newAttempts >= maxAttempts) {
      setModalText(
        questions[current].explanation || "No explanation available.",
      );
      setShowModal(true);
    }
  };

  const goToNextQuestion = () => {
    setShowModal(false);
    stopTTS(setIsSpeaking);

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      setCompleted(true);
    }

    setFillInAnswer("");
  };

  const restartQuiz = () => {
    setShuffleKey((prev) => prev + 1);
    setCurrent(0);
    setScore(0);
    setAttempts(0);
    setCompleted(false);
    setFillInAnswer("");
    setShowIntro(true);
  };

  const progressPercent =
    ((current + (completed ? 1 : 0)) / questions.length) * 100;

  const speakIntroduction = () => {
    const topic = questionsData?.topic || "Today’s Topic";
    const intro =
      questionsData?.introduction ||
      "Welcome! In this lesson, you will explore key ideas.";

    const objectives = (questionsData?.objectives || []).join(", ");

    playTTS(
      `Welcome. Today's topic is ${topic}. ${intro}. Objectives: ${objectives}. Press proceed to start.`,
      setIsSpeaking,
    );
  };

  if (isLoading) {
    return (
      <p className="text-2xl text-gray-600 text-center mt-20">
        Loading tasks...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-2xl text-red-600 text-center mt-20">
        Error loading tasks. Please try again.
      </p>
    );
  }

  if (showIntro) {
    return (
      <IntroScreen
        questionsData={questionsData}
        onProceed={() => setShowIntro(false)}
        speakIntroduction={speakIntroduction}
        stopTTS={() => stopTTS(setIsSpeaking)}
        isSpeaking={isSpeaking}
        setAutoReadEnabled={setAutoReadEnabled}
      />
    );
  }

  if (completed) {
    return (
      <CompletedScreen
        score={score}
        questions={questions}
        questionsData={questionsData}
        restartQuiz={restartQuiz}
      />
    );
  }

  const q = currentQuestion;

  return (
    <>
      <QuestionDisplay
        question={q}
        current={current}
        total={questions.length}
        progressPercent={progressPercent}
        handleAnswer={handleAnswer}
        fillInAnswer={fillInAnswer}
        setFillInAnswer={setFillInAnswer}
        attempts={attempts}
        maxAttempts={maxAttempts}
        remainingAttempts={maxAttempts - attempts}
        isFillIn={maxAttempts === 1}
      />

      <ModalExplanation
        question={q}
        show={showModal}
        modalText={modalText}
        correctAnswer={q?.answer}
        goToNextQuestion={goToNextQuestion}
        stopTTS={() => stopTTS(setIsSpeaking)}
        isSpeaking={isSpeaking}
      />
    </>
  );
}
