export function calculateGCSE(avgPercent) {
  const avg = Number(avgPercent);
  if (avg >= 90) return 9;
  if (avg >= 80) return 8;
  if (avg >= 70) return 7;
  if (avg >= 60) return 6;
  if (avg >= 50) return 5;
  if (avg >= 40) return 4;
  if (avg >= 30) return 3;
  if (avg >= 20) return 2;
  return 1;
}

export function safeAverage(arr) {
  const nums = arr
    .map((n) => (n == null ? 0 : Number(n)))
    .filter((n) => !Number.isNaN(n) && n > 0); // ignore 0s and invalid numbers
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

export function detectWeakArea(subjectMap) {
  // subjectMap = { number: 80, geometry: 10, algebra: 50, probabilities: 60, ratio: 70, statistics: 40 }
  const entries = Object.entries(subjectMap).map(([k, v]) => ({
    key: k,
    val: Number(v) || 0,
  }));

  const allHigh = entries.every((e) => e.val >= 85);
  if (allHigh) return "None";

  const allLow = entries.every((e) => e.val < 40);
  if (allLow) return "Multiple Areas";

  // find lowest score(s)
  const minVal = Math.min(...entries.map((e) => e.val));
  const mins = entries.filter((e) => e.val === minVal).map((e) => e.key);

  if (mins.length === 1) {
    // map key name to display friendly
    return prettifySubjectKey(mins[0]);
  }

  return "Multiple Areas";
}

export function prettifySubjectKey(key) {
  const map = {
    number: "Numbers",
    geometry: "Geometry",
    algebra: "Algebra",
    probabilities: "Probabilities",
    ratio: "Ratio",
    statistics: "Statistics",
  };
  return map[key] || key;
}

export function formatPercent(n) {
  if (n == null || Number.isNaN(Number(n))) return "—";
  return `${Number(n).toFixed(0)}%`;
}
