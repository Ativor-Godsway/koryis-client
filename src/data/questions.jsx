const codedQuestions = {
  _id: "default",
  topic: "algebra",
  subTopic: "Introduction to Algebra",
  introduction:
    "Algebra is a branch of math where we use letters or symbols to represent numbers. It helps us solve problems step by step. In this lesson, you will learn how to use simple equations in an easy way.",
  objectives: [
    "Understand what algebra is",
    "Learn to solve simple equations",
    "Identify variables and constants",
  ],
  questions: [
    {
      question: "Solve for x: x + 5 = 12",
      type: "MCQ",
      options: ["x = 7", "x = 17", "x = 5"],
      answer: "x = 7",
      explanation: "Subtract 5 from both sides: x = 12 - 5 = 7.",
    },
    {
      question: "Which of these is an example of a variable?",
      type: "MCQ",
      options: ["y", "10", "7"],
      answer: "y",
      explanation: "Variables are letters that represent unknown numbers.",
    },
    {
      question: "Solve for x: 3x = 15",
      type: "MCQ",
      options: ["x = 5", "x = 45", "x = 3"],
      answer: "x = 5",
      explanation: "Divide both sides by 3: x = 15 ÷ 3 = 5.",
    },
    {
      question: "If x = 4, what is x + 9?",
      type: "MCQ",
      options: ["13", "5", "9"],
      answer: "13",
      explanation: "Substitute 4 for x: 4 + 9 = 13.",
    },
    {
      question: "Fill in the blank: In the equation 2x + 3 = 11, x = ______.",
      type: "Fill-in",
      options: [],
      answer: "4",
      explanation:
        "Subtract 3 from both sides: 2x = 8, then divide by 2: x = 4.",
    },
  ],
};

export default codedQuestions;
