export const algebraQuestions = {
  _id: "algebra-001",
  topic: "algebra",
  subTopic: "Simple equations and substitution",
  introduction:
    "Algebra helps you find unknown values. You work with numbers and letters together. Each letter stands for a number.",
  objectives: [
    "Understand what a variable represents",
    "Solve simple algebraic equations",
    "Substitute values correctly",
  ],
  summary: [
    "Letters can represent numbers",
    "Simple equations can be solved step by step",
  ],
  questions: [
    {
      question: "What is the value of x if x + 5 = 12?",
      type: "MCQ",
      options: ["7", "17", "5"],
      has_diagram: false,
      diagram: null,
      answer: "7",
      explanation: ["Subtract 5 from both sides", "12 - 5 = 7"],
    },
    {
      question: "Which expression means five more than x?",
      type: "MCQ",
      options: ["x + 5", "5x", "x - 5"],
      has_diagram: false,
      diagram: null,
      answer: "x + 5",
      explanation: ["More than means add", "5 is added to x"],
    },
    {
      question: "What is the value of y if 2y = 10?",
      type: "MCQ",
      options: ["5", "20", "8"],
      has_diagram: false,
      diagram: null,
      answer: "5",
      explanation: ["Divide both sides by 2", "10 ÷ 2 = 5"],
    },
    {
      question: "Which equation shows x is equal to 4?",
      type: "MCQ",
      options: ["x + 2 = 6", "x - 2 = 6", "2x = 6"],
      has_diagram: false,
      diagram: null,
      answer: "x + 2 = 6",
      explanation: ["Subtract 2 from both sides", "6 - 2 = 4"],
    },
    {
      question: "If a = 3, what is the value of a + a?",
      type: "MCQ",
      options: ["6", "9", "3"],
      has_diagram: false,
      diagram: null,
      answer: "6",
      explanation: ["Replace a with 3", "3 + 3 = 6"],
    },
    {
      question: "Find the value of x if x - 4 = 6.",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "10",
      explanation: ["Add 4 to both sides", "6 + 4 = 10"],
    },
    {
      question: "If b = 5, find the value of 2b.",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "10",
      explanation: ["Replace b with 5", "2 × 5 = 10"],
    },
    {
      question: "Solve: y + 3 = 9.",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "6",
      explanation: ["Subtract 3 from both sides", "9 - 3 = 6"],
    },
    {
      question: "What is the value of 3x if x = 4?",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "12",
      explanation: ["Replace x with 4", "3 × 4 = 12"],
    },
    {
      question: "Find the value of n if n ÷ 2 = 7.",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "14",
      explanation: ["Multiply both sides by 2", "7 × 2 = 14"],
    },
  ],
};

export const geometryQuestions = {
  _id: "geometry-001",
  topic: "geometry",
  subTopic: "Lines, angles, and simple shapes",
  introduction:
    "Geometry helps us understand shapes and space. We use it to measure angles and sides.",
  objectives: [
    "Identify common geometric shapes",
    "Measure angles correctly",
    "Understand basic properties of shapes",
  ],
  summary: ["Shapes have sides and angles", "Angles are measured in degrees"],
  questions: [
    {
      question: "How many sides does a triangle have?",
      type: "MCQ",
      options: ["3", "4", "5"],
      has_diagram: true,
      diagram: `<svg width="1000" height="300" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <polygon points="150,20 50,180 250,180" fill="none" stroke="black" stroke-width="4"/>
      </svg>`,
      answer: "3",
      explanation: [
        "A triangle has three straight sides",
        "All triangles have three corners",
      ],
    },
    {
      question: "What is the name of an angle less than 90?",
      type: "MCQ",
      options: ["Acute", "Right", "Obtuse"],
      has_diagram: true,
      diagram: `<svg width="1000" height="300" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <line x1="150" y1="150" x2="150" y2="50" stroke="black" stroke-width="4"/>
        <line x1="150" y1="150" x2="230" y2="120" stroke="black" stroke-width="4"/>
      </svg>`,
      answer: "Acute",
      explanation: [
        "An acute angle is smaller than 90",
        "It looks sharp and narrow",
      ],
    },
    {
      question: "How many degrees are in a right angle?",
      type: "MCQ",
      options: ["45", "90", "180"],
      has_diagram: true,
      diagram: `<svg width="1000" height="300" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <line x1="150" y1="150" x2="150" y2="50" stroke="black" stroke-width="4"/>
        <line x1="150" y1="150" x2="250" y2="150" stroke="black" stroke-width="4"/>
      </svg>`,
      answer: "90",
      explanation: ["A right angle measures 90", "It forms a square corner"],
    },
    {
      question: "Which shape has four equal sides?",
      type: "MCQ",
      options: ["Square", "Rectangle", "Triangle"],
      has_diagram: false,
      diagram: null,
      answer: "Square",
      explanation: ["A square has four sides", "All sides are equal"],
    },
    {
      question: "How many sides does a rectangle have?",
      type: "MCQ",
      options: ["2", "4", "6"],
      has_diagram: false,
      diagram: null,
      answer: "4",
      explanation: ["A rectangle has four sides", "Opposite sides are equal"],
    },
    {
      question: "A straight angle is equal to how many degrees?",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "180",
      explanation: [
        "A straight line forms a straight angle",
        "It measures 180 degrees",
      ],
    },
    {
      question: "How many corners does a square have?",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "4",
      explanation: ["Each corner is a vertex", "A square has four vertices"],
    },
    {
      question: "The shape with three sides is called a ______.",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "triangle",
      explanation: ["Three sides make a triangle", "It is a basic polygon"],
    },
    {
      question: "An angle greater than 90 is called an ______ angle.",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "obtuse",
      explanation: ["Obtuse angles are wide", "They are more than 90"],
    },
    {
      question: "A circle has how many sides?",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "0",
      explanation: ["A circle is round", "It has no straight sides"],
    },
  ],
};

export const ratioQuestions = {
  _id: "ratio-001",
  topic: "ratio",
  subTopic:
    "Simplifying ratios, equivalent ratios, and solving proportion problems",
  introduction:
    "Ratio compares two quantities, and proportion shows that two ratios are equal. We use them in many real-life situations to solve problems.",
  objectives: [
    "Understand ratios and proportions",
    "Simplify ratios",
    "Solve basic proportion problems",
  ],
  summary: [
    "Ratios are comparisons between two quantities",
    "Proportions show the equality of two ratios",
  ],
  questions: [
    {
      question: "Simplify the ratio 12:18.",
      type: "MCQ",
      options: ["2:3", "3:4", "1:2"],
      has_diagram: false,
      diagram: null,
      answer: "2:3",
      explanation: [
        "Divide both numbers by 6, the GCD of 12 and 18.",
        "12 ÷ 6 = 2, 18 ÷ 6 = 3",
      ],
    },
    {
      question: "Which of these ratios is equivalent to 4:5?",
      type: "MCQ",
      options: ["8:10", "6:7", "2:3"],
      has_diagram: false,
      diagram: null,
      answer: "8:10",
      explanation: [
        "Multiply both parts of the ratio by 2.",
        "4 × 2 = 8, 5 × 2 = 10",
      ],
    },
    {
      question: "If 3 pencils cost $6, how much would 5 pencils cost?",
      type: "MCQ",
      options: ["$10", "$12", "$15"],
      has_diagram: false,
      diagram: null,
      answer: "$10",
      explanation: [
        "Cost per pencil is $6 ÷ 3 = $2.",
        "For 5 pencils, 5 × $2 = $10.",
      ],
    },
    {
      question: "What is the simplified form of the ratio 45:60?",
      type: "MCQ",
      options: ["3:4", "5:6", "2:3"],
      has_diagram: false,
      diagram: null,
      answer: "3:4",
      explanation: [
        "Divide both numbers by 15, the GCD of 45 and 60.",
        "45 ÷ 15 = 3, 60 ÷ 15 = 4",
      ],
    },
    {
      question: "Which proportion is true? 3:4 = x:8.",
      type: "MCQ",
      options: ["6", "9", "12"],
      has_diagram: false,
      diagram: null,
      answer: "6",
      explanation: ["Cross-multiply: 3 × 8 = 4 × x.", "24 ÷ 4 = 6, so x = 6."],
    },
    {
      question: "Simplify the ratio 30:45.",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "2:3",
      explanation: [
        "Divide both numbers by 15, the GCD of 30 and 45.",
        "30 ÷ 15 = 2, 45 ÷ 15 = 3",
      ],
    },
    {
      question:
        "The ratio of boys to girls is 5:7. If there are 35 girls, how many boys?",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "25",
      explanation: [
        "The ratio of boys to girls is 5:7.",
        "If girls = 35, then boys = 35 × 5 ÷ 7 = 25.",
      ],
    },
    {
      question: "Find the missing number in the proportion: 4:x = 12:15.",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "5",
      explanation: [
        "Cross-multiply: 4 × 15 = 12 × x.",
        "60 ÷ 12 = 5, so x = 5.",
      ],
    },
    {
      question: "Simplify the ratio 36:60.",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "3:5",
      explanation: [
        "Divide both numbers by 12, the GCD of 36 and 60.",
        "36 ÷ 12 = 3, 60 ÷ 12 = 5",
      ],
    },
    {
      question: "If 7 oranges cost $14, how much do 10 oranges cost?",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "$20",
      explanation: [
        "Cost per orange is $14 ÷ 7 = $2.",
        "For 10 oranges, 10 × $2 = $20.",
      ],
    },
  ],
};

export const numbersQuestion = {
  _id: "number-001",
  topic: "number",
  subTopic:
    "Basic operations with numbers, number systems, and solving number problems",
  introduction:
    "Numbers are the foundation of math. We use them to solve problems, perform operations, and understand patterns.",
  objectives: [
    "Understand basic number operations",
    "Recognize different types of numbers",
    "Solve number problems using arithmetic operations",
  ],
  summary: [
    "Numbers can be whole, fractions, or decimals",
    "Operations like addition, subtraction, multiplication, and division help solve number problems",
  ],
  questions: [
    {
      question: "What is the sum of 23 and 45?",
      type: "MCQ",
      options: ["68", "78", "58"],
      has_diagram: false,
      diagram: null,
      answer: "68",
      explanation: ["Add the two numbers: 23 + 45 = 68"],
    },
    {
      question: "What is the product of 8 and 7?",
      type: "MCQ",
      options: ["56", "64", "48"],
      has_diagram: false,
      diagram: null,
      answer: "56",
      explanation: ["Multiply the two numbers: 8 × 7 = 56"],
    },
    {
      question: "Which of the following is a prime number?",
      type: "MCQ",
      options: ["11", "15", "21"],
      has_diagram: false,
      diagram: null,
      answer: "11",
      explanation: [
        "A prime number is a number greater than 1 that is divisible only by 1 and itself.",
        "11 is a prime number.",
      ],
    },
    {
      question: "What is the difference between 89 and 54?",
      type: "MCQ",
      options: ["35", "45", "55"],
      has_diagram: false,
      diagram: null,
      answer: "35",
      explanation: ["Subtract the numbers: 89 - 54 = 35"],
    },
    {
      question: "What is the decimal equivalent of 3/4?",
      type: "MCQ",
      options: ["0.75", "0.85", "0.65"],
      has_diagram: false,
      diagram: null,
      answer: "0.75",
      explanation: [
        "To convert a fraction to a decimal, divide the numerator by the denominator.",
        "3 ÷ 4 = 0.75",
      ],
    },
    {
      question: "What is the greatest common divisor (GCD) of 18 and 24?",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "6",
      explanation: [
        "Find the factors of both numbers: 18 = 1, 2, 3, 6, 9, 18 and 24 = 1, 2, 3, 4, 6, 8, 12, 24.",
        "The greatest common divisor is 6.",
      ],
    },
    {
      question: "What is the next number in the sequence: 2, 4, 8, 16, ___?",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "32",
      explanation: ["The sequence doubles each time.", "16 × 2 = 32."],
    },
    {
      question: "What is 25% of 200?",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "50",
      explanation: [
        "To find 25% of a number, multiply the number by 0.25.",
        "200 × 0.25 = 50.",
      ],
    },
    {
      question: "What is the sum of the first 10 even numbers?",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "110",
      explanation: [
        "The first 10 even numbers are 2, 4, 6, 8, 10, 12, 14, 16, 18, and 20.",
        "Sum: 2 + 4 + 6 + 8 + 10 + 12 + 14 + 16 + 18 + 20 = 110.",
      ],
    },
    {
      question: "How much is 5 squared?",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "25",
      explanation: [
        "Squaring a number means multiplying it by itself.",
        "5 × 5 = 25.",
      ],
    },
  ],
};

export const probabilityQuestions = {
  _id: "probability-001",
  topic: "probabilities",
  subTopic:
    "Understanding basic probability concepts, calculating chances, and using probability models",
  introduction:
    "Probability helps us understand the likelihood of an event happening. We use numbers to express how likely something is to happen.",
  objectives: [
    "Calculate basic probabilities",
    "Understand terms like chance and odds",
    "Use probability models to solve problems",
  ],
  summary: [
    "Probability is a number between 0 and 1",
    "0 means impossible, 1 means certain",
    "Probability = favorable outcomes ÷ total outcomes",
  ],
  questions: [
    {
      question: "What is the probability of flipping a coin and getting heads?",
      type: "MCQ",
      options: ["0.5", "0.25", "0.75"],
      has_diagram: false,
      diagram: null,
      answer: "0.5",
      explanation: [
        "A coin has 2 sides: heads and tails.",
        "Probability = 1 favorable outcome ÷ 2 possible outcomes = 0.5",
      ],
    },
    {
      question:
        "What is the probability of rolling a 4 on a fair six-sided die?",
      type: "MCQ",
      options: ["1/6", "1/4", "1/2"],
      has_diagram: false,
      diagram: null,
      answer: "1/6",
      explanation: [
        "A six-sided die has 6 possible outcomes.",
        "Only 1 outcome is a 4, so probability = 1/6.",
      ],
    },
    {
      question:
        "In a bag with 3 red balls and 2 blue balls, what is the probability of drawing a red ball?",
      type: "MCQ",
      options: ["3/5", "1/2", "2/5"],
      has_diagram: false,
      diagram: null,
      answer: "3/5",
      explanation: [
        "There are 5 balls in total (3 red, 2 blue).",
        "Probability of drawing a red ball = 3 favorable outcomes ÷ 5 total outcomes.",
      ],
    },
    {
      question:
        "What is the probability of getting an even number when rolling a six-sided die?",
      type: "MCQ",
      options: ["1/3", "1/2", "2/3"],
      has_diagram: false,
      diagram: null,
      answer: "1/3",
      explanation: [
        "The even numbers on a die are 2, 4, and 6.",
        "Probability = 3 favorable outcomes ÷ 6 possible outcomes = 1/3.",
      ],
    },
    {
      question:
        "If you roll a six-sided die, what is the probability of rolling a number greater than 4?",
      type: "MCQ",
      options: ["1/6", "2/6", "3/6"],
      has_diagram: false,
      diagram: null,
      answer: "2/6",
      explanation: [
        "The numbers greater than 4 are 5 and 6.",
        "Probability = 2 favorable outcomes ÷ 6 possible outcomes = 2/6.",
      ],
    },
    {
      question:
        "If a card is drawn from a deck of 52 cards, what is the probability of drawing a king?",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "4/52",
      explanation: [
        "There are 4 kings in a deck of 52 cards.",
        "Probability = 4 favorable outcomes ÷ 52 total outcomes = 4/52.",
      ],
    },
    {
      question:
        "In a bag with 4 red marbles and 3 blue marbles, what is the probability of drawing a blue marble?",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "3/7",
      explanation: [
        "There are 7 marbles in total (4 red, 3 blue).",
        "Probability of drawing a blue marble = 3 favorable outcomes ÷ 7 total outcomes.",
      ],
    },
    {
      question:
        "If you roll a fair die, what is the probability of not rolling a 5?",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "5/6",
      explanation: [
        "There are 5 possible outcomes that are not a 5.",
        "Probability = 5 favorable outcomes ÷ 6 total outcomes = 5/6.",
      ],
    },
    {
      question:
        "What is the probability of rolling a number less than 3 on a six-sided die?",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "2/6",
      explanation: [
        "The numbers less than 3 on a die are 1 and 2.",
        "Probability = 2 favorable outcomes ÷ 6 possible outcomes = 2/6.",
      ],
    },
    {
      question:
        "If you randomly select a card from a standard deck, what is the probability of drawing a heart?",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "13/52",
      explanation: [
        "There are 13 hearts in a deck of 52 cards.",
        "Probability = 13 favorable outcomes ÷ 52 total outcomes = 13/52.",
      ],
    },
  ],
};

export const statisticsQuestions = {
  _id: "statistics-001",
  topic: "statistics",
  subTopic: "Mean, median, mode, charts, and basic probability",
  introduction:
    "Statistics helps us understand data. We use numbers to find patterns and trends.",
  objectives: [
    "Calculate mean, median, and mode",
    "Interpret simple charts",
    "Understand basic probability",
  ],
  summary: [
    "Mean is the average",
    "Median is the middle value",
    "Mode is the most frequent value",
  ],
  questions: [
    {
      question: "Find the mean of 2, 4, 6, 8, 10.",
      type: "MCQ",
      options: ["6", "5", "8"],
      has_diagram: false,
      diagram: null,
      answer: "6",
      explanation: [
        "Add all numbers: 2 + 4 + 6 + 8 + 10 = 30",
        "Divide by 5 numbers: 30 ÷ 5 = 6",
      ],
    },
    {
      question: "Find the median of 3, 7, 9, 5, 11.",
      type: "MCQ",
      options: ["7", "5", "9"],
      has_diagram: false,
      diagram: null,
      answer: "7",
      explanation: [
        "Arrange numbers in order: 3, 5, 7, 9, 11",
        "Middle value is 7",
      ],
    },
    {
      question: "Which value appears most often in 2, 4, 4, 5, 6?",
      type: "MCQ",
      options: ["4", "5", "6"],
      has_diagram: false,
      diagram: null,
      answer: "4",
      explanation: ["Number 4 occurs twice", "All other numbers occur once"],
    },
    {
      question: "Which type of chart shows data in bars?",
      type: "MCQ",
      options: ["Bar chart", "Pie chart", "Line graph"],
      has_diagram: true,
      diagram: `<svg width="1000" height="300" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="150" width="50" height="100" fill="blue"/>
        <rect x="150" y="100" width="50" height="150" fill="green"/>
        <rect x="250" y="50" width="50" height="200" fill="red"/>
      </svg>`,
      answer: "Bar chart",
      explanation: [
        "Bar charts show data using rectangles",
        "Height of bar shows value",
      ],
    },
    {
      question:
        "A chart showing parts of a whole in slices is called a ______.",
      type: "MCQ",
      options: ["Pie chart", "Histogram", "Line chart"],
      has_diagram: true,
      diagram: `<svg width="1000" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="80" fill="none" stroke="black" stroke-width="4"/>
        <path d="M100 100 L180 100 A80 80 0 0 1 100 20 Z" fill="blue"/>
        <path d="M100 100 L100 20 A80 80 0 0 1 20 100 Z" fill="red"/>
      </svg>`,
      answer: "Pie chart",
      explanation: [
        "Pie charts show parts of a whole",
        "Each slice represents a category",
      ],
    },
    {
      question: "Find the mean of 1, 2, 3, 4, 5.",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "3",
      explanation: [
        "Add all numbers: 1+2+3+4+5 = 15",
        "Divide by 5 numbers: 15 ÷ 5 = 3",
      ],
    },
    {
      question: "Find the median of 6, 2, 8, 4, 10.",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "6",
      explanation: ["Arrange numbers: 2, 4, 6, 8, 10", "Middle value is 6"],
    },
    {
      question: "The mode of 5, 7, 5, 8, 9 is ______.",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "5",
      explanation: ["5 occurs twice", "All other numbers occur once"],
    },
    {
      question: "Which chart shows changes over time?",
      type: "Fill-in",
      options: [],
      has_diagram: true,
      diagram: `<svg width="1000" height="300" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
        <polyline points="50,200 150,150 250,100 350,130 450,80" fill="none" stroke="green" stroke-width="4"/>
      </svg>`,
      answer: "Line chart",
      explanation: [
        "Line charts show trends over time",
        "Points are connected with lines",
      ],
    },
    {
      question:
        "Probability of flipping a fair coin and getting heads is ______.",
      type: "Fill-in",
      options: [],
      has_diagram: false,
      diagram: null,
      answer: "0.5",
      explanation: [
        "A fair coin has 2 sides",
        "Chance of heads is 1 out of 2 = 0.5",
      ],
    },
  ],
};
