import { useEffect } from "react";

const codedQuestions = {
  _id: "default",
  topic: "Geometry",
  subTopic: "Triangles",
  introduction:
    "In this lesson, you will learn about triangles and how to calculate angles.",
  objectives: [
    "Understand triangle angles",
    "Learn to use GeoGebra diagrams",
    "Read and interpret geometric questions",
  ],
  questions: [
    {
      question:
        "Find the angles of triangle ABC given the coordinates of the vertices.",
      type: "Diagram",
      command: [
        "A = (0,0)",
        "B = (6,0)",
        "C = (2,4)",
        "Polygon(A,B,C)",
        "α = Angle(B,A,C)",
        "β = Angle(A,B,C)",
        "γ = Angle(A,C,B)",
        'Text("∠A = " + α, (-0.5,1))',
        'Text("∠B = " + β, (5,1))',
        'Text("∠C = " + γ, (2,4.5))',
      ],
      answer: "∠A ≈ 53.13°, ∠B ≈ 53.13°, ∠C ≈ 73.74°",
      explanation:
        "Using the coordinates, the angles are calculated using the Law of Cosines or GeoGebra's Angle tool.",
    },
  ],
};

export default function GeoGebraDiagram() {
  useEffect(() => {
    const params = {
      appName: "geometry",
      width: window.innerWidth,
      height: window.innerHeight * 0.6,
      showToolBar: false,
      showMenuBar: false,
      showAlgebraInput: false,
      showResetIcon: false,
      enableRightClick: false,
      enableShiftDragZoom: false,
      enableLabelDrags: false,
      showZoomButtons: false,
      allowStyleBar: false,
      appletOnLoad: () => {
        const commands = codedQuestions.questions[0].command;
        commands.forEach((cmd) => window.ggbApplet.evalCommand(cmd));

        ["A", "B", "C", "α", "β", "γ"].forEach((o) =>
          window.ggbApplet.setFixed(o, true)
        );

        window.ggbApplet.setAxesVisible(false);
        window.ggbApplet.setGridVisible(false);
        window.ggbApplet.setCoordSystem(-1, 7, -1, 6);
      },
    };

    const applet = new window.GGBApplet(params, true);
    applet.inject("ggb-container");
  }, []);

  const currentQuestion = codedQuestions.questions[0];

  return (
    <div className="flex flex-col h-screen">
      {/* Question */}
      <div className="bg-gray-100 p-4 text-lg font-semibold">
        {currentQuestion.question}
      </div>

      {/* Diagram */}
      <div id="ggb-container" className="flex-1 w-full" />

      {/* Answer & explanation */}
      <div className="bg-gray-50 p-4 text-sm">
        <p>
          <strong>Answer:</strong> {currentQuestion.answer}
        </p>
        <p>
          <strong>Explanation:</strong> {currentQuestion.explanation}
        </p>
      </div>
      <div>
        <svg width="300" height="300">
          <polygon
            points="50,250 250,250 150,50"
            fill="lightblue"
            stroke="black"
          />
          <text x="50" y="270">
            A
          </text>
          <text x="250" y="270">
            B
          </text>
          <text x="150" y="40">
            C
          </text>
        </svg>
      </div>
    </div>
  );
}
