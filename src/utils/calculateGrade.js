export function calculateGrade(score) {
  let grade;
  let comment;
  if (score >= 90) {
    grade = 9;
    comment = "Exceptional — Keep going!";
  } else if (score >= 80) {
    grade = 8;
    comment = "Excellent work!";
  } else if (score >= 70) {
    grade = 7;
    comment = "Very good — You're improving!";
  } else if (score >= 60) {
    grade = 6;
    comment = "Good effort!";
  } else if (score >= 50) {
    grade = 5;
    comment = "Fair — Keep practicing!";
  } else if (score >= 40) {
    grade = 4;
    comment = "Below average — Try harder!";
  } else if (score >= 30) {
    grade = 3;
    comment = "Needs improvement!";
  } else if (score >= 20) {
    grade = 2;
    comment = "Very low — Don't give up!";
  } else if (score > 0) {
    grade = 1;
    comment = "Poor — Let's work on this!";
  } else {
    grade = "-";
    comment = "No attempt";
  }

  return { grade, comment };
}
