import { useState, useEffect, useMemo } from "react";
import { useGenerateQuestionsMutation } from "../../redux/studentQuestionsApi";
import { useSubmitGradeMutation } from "../../redux/GradeApi";
import { playTTS, stopTTS } from "../../services/tts";
import confetti from "canvas-confetti";

import { QuestionDisplay } from "./components/QuestionDisplay";
import { ModalExplanation } from "./components/ModalExplanation";
import { CompletedScreen } from "./components/CompletedScreen";
import { IntroScreen } from "./components/IntroScreen";
import { shuffleArray } from "../../utils/shuffel";
import StartTaskScreen from "./components/StartTaskScreen";

export default function StudentQuestionsPage() {
  const [generateQuestions, { data, isLoading, error }] =
    useGenerateQuestionsMutation();

  const [submitGrade] = useSubmitGradeMutation();

  const [plainQuestions, setPlainQuestions] = useState([]);
  const [shuffleKey, setShuffleKey] = useState(0);

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const [fillInAnswer, setFillInAnswer] = useState("");
  const [showIntro, setShowIntro] = useState(false);
  const [autoReadEnabled, setAutoReadEnabled] = useState(true);

  const [attempts, setAttempts] = useState(0);
  const [maxAttempts, setMaxAttempts] = useState(2);

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const studentInfo = JSON.parse(localStorage.getItem("student"));
  const studentId = studentInfo?.code;
  const teacher = studentInfo?.teacher;

  const [topic, setTopic] = useState("");

  const yearGroup = studentInfo?.yearGroup;
  const grade = "6";

  const questionsData = data?.data || {};

  // ✅ SHUFFLED QUESTIONS
  const questions = useMemo(
    () => shuffleArray(plainQuestions),
    [plainQuestions, shuffleKey]
  );

  const progressPercent =
    questions.length > 0
      ? ((current + (completed ? 1 : 0)) / questions.length) * 100
      : 0;

  // ✅ LOAD QUESTIONS (BUTTON)
  const handleStart = async (selectedTopic) => {
    setTopic(selectedTopic);

    try {
      const result = await generateQuestions({
        topic: selectedTopic, // ✅ use selected topic
        yearGroup,
        grade,
        studentId,
      }).unwrap();

      setPlainQuestions(result.data.questions || []);
      setShuffleKey((prev) => prev + 1);

      setCurrent(0);
      setScore(0);
      setCompleted(false);
      setAttempts(0);
      setFillInAnswer("");
      setShowIntro(true);
      setHasSubmitted(false);
    } catch (err) {
      console.error("Failed to fetch questions:", err);
    }
  };

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
        questions[current].explanation || "No explanation available."
      );
      setShowModal(true);
    }
  };

  // ✅ SUBMIT GRADE (SAFE – NO LOOP)
  useEffect(() => {
    if (
      completed &&
      !teacher &&
      questions.length > 0 &&
      questionsData?._id &&
      !hasSubmitted
    ) {
      setHasSubmitted(true);

      submitGrade({
        student: studentId,
        task: questionsData._id,
        topic: questionsData.topic.toLowerCase(),
        subTopic: questionsData.subTopic,
        score: Math.round((score / questions.length) * 100),
      }).catch(() => console.warn("Grade already submitted."));
    }
  }, [completed]);

  // ✅ NEXT QUESTION
  const goToNextQuestion = () => {
    setShowModal(false);
    stopTTS(() => {});
    setAttempts(0);
    setFillInAnswer("");

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };
  const refreshPage = () => {
    setPlainQuestions([]);
    setCurrent(0);
    setScore(0);
    setCompleted(false);
    setShowIntro(false);
    setAttempts(0);
    setTopic("");
  };

  // ✅ RESTART
  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setCompleted(false);
    setAttempts(0);
    setFillInAnswer("");
    setHasSubmitted(false);
  };

  // ✅ TTS FUNCTIONS
  const speakIntroduction = () => {
    const intro =
      questionsData.introduction || "Welcome! Let's start the quiz.";
    const objectives = (questionsData.objectives || []).join(", ");

    playTTS(
      `Welcome. Today's topic is ${topic}. ${intro}. Objectives: ${objectives}. Click proceed to start.`,
      () => {}
    );
  };

  const speakExplanation = () => {
    const explanation = modalText || "No explanation provided.";

    playTTS(
      `Explanation: ${explanation}. Correct answer is ${questions[current]?.answer}. Click next to proceed.`,
      () => {}
    );
  };

  return (
    <div className="w-screen mx-auto p-6 font-sans">
      {/* ✅ GAME START SCREEN */}
      {plainQuestions.length === 0 && (
        <StartTaskScreen totalQuestions={10} level={1} onStart={handleStart} />
      )}
      {isLoading && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <span className="loading loading-spinner loading-xl text-white"></span>
        </div>
      )}

      {error && (
        <p className="text-2xl text-red-600 text-center mt-20">
          Error loading questions. Try again.
        </p>
      )}

      {showIntro && questions.length > 0 && (
        <IntroScreen
          questionsData={questionsData}
          onProceed={() => setShowIntro(false)}
          speakIntroduction={speakIntroduction}
          stopTTS={() => stopTTS(() => {})}
          isSpeaking={false}
          setAutoReadEnabled={setAutoReadEnabled}
        />
      )}

      {!showIntro && !completed && questions.length > 0 && (
        <QuestionDisplay
          question={questions[current]}
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
      )}

      <ModalExplanation
        question={questions[current]}
        show={showModal}
        modalText={modalText}
        correctAnswer={questions[current]?.answer}
        goToNextQuestion={goToNextQuestion}
        speakExplanation={speakExplanation}
        stopTTS={() => stopTTS(() => {})}
        setAutoReadEnabled={setAutoReadEnabled}
        isSpeaking={false}
      />

      {completed && (
        <CompletedScreen
          score={score}
          questions={questions}
          questionsData={questionsData}
          restartQuiz={restartQuiz}
          regenerateQuestion={handleStart}
          refreshPage={refreshPage}
        />
      )}
    </div>
  );
}
