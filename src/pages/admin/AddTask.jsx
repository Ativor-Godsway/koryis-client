import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { createTask, generateQuestions } from "../../services/task";

export default function AddTask() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lessonInfo, setLessonInfo] = useState({
    topic: "",
    subTopic: "",
    difficulty: "",
    yearGroup: "",
    introduction: "",
    objectives: [],
    summary: [],
  });

  const topics = [
    {
      value: "number",
      label: "Number & Operations",
      subTopics: [
        {
          value: "Structure and calculation",
          label: "Structure and calculation",
        },
        {
          value: "Fractions, decimals, percentages",
          label: "Fractions, decimals, percentages",
        },
        { value: "Measures and accuracy", label: "Measures and accuracy" },
      ],
    },
    {
      value: "algebra",
      label: "Algebra",
      subTopics: [
        { value: "angles", label: "Notation and manipulation" },
        { value: "Graphs", label: "Graphs" },
        { value: "area", label: "Equations and inequalities" },
        { value: "perimeter", label: "Sequences" },
      ],
    },
    {
      value: "ratio",
      label: "Ratio, Proportion & Rates of Change",
      subTopics: [
        {
          value: "Unit conversions (simple and compound)",
          label: "Unit conversions (simple and compound)",
        },
        { value: "Scale diagrams and maps", label: "Scale diagrams and maps" },
        { value: "Ratios and fractions", label: "Ratios and fractions" },
        {
          value: "Growth and decay (compound interest, iterative processes)",
          label: "Growth and decay (compound interest, iterative processes)",
        },
        {
          value: "Average/instantaneous rates of change",
          label: "Average/instantaneous rates of change",
        },
      ],
    },
    {
      value: "geometry",
      label: "Geometry & Measures",
      subTopics: [
        {
          value: "Properties and constructions",
          label: "Properties and constructions",
        },
        { value: "Mensuration", label: "Mensuration" },
        { value: "Vectors", label: "Vectors" },
      ],
    },

    {
      value: "probabilities",
      label: "Probability",
      subTopics: [
        {
          value: "Recording and analysing outcomes",
          label: "Recording and analysing outcomes",
        },
        {
          value: "Mutually exclusive and exhaustive events",
          label: "Mutually exclusive and exhaustive events",
        },
        {
          value: "Probability tables, Venn diagrams, grids, trees",
          label: "Probability tables, Venn diagrams, grids, trees",
        },
        {
          value: "Independent and dependent events",
          label: "Independent and dependent events",
        },
        {
          value: "Conditional probability",
          label: "Conditional probability",
        },
      ],
    },
    {
      value: "statistics",
      label: "Statistics",
      subTopics: [
        {
          value: "Sampling methods and limitations",
          label: "Sampling methods and limitations",
        },
        {
          value: "Tables, charts and diagrams",
          label: "Tables, charts and diagrams",
        },
        {
          value: "Data representation (histograms, cumulative frequency)",
          label: "Data representation (histograms, cumulative frequency)",
        },
        {
          value:
            "Describing distributions (mean, median, mode, range, quartiles, IQR)",
          label:
            "Describing distributions (mean, median, mode, range, quartiles, IQR)",
        },

        {
          value: "Scatter graphs, correlation, lines of best fit",
          label: "Scatter graphs, correlation, lines of best fit",
        },
      ],
    },
  ];

  const teacherId = "00000";

  // Backend-generated questions will be stored here
  const [generatedQuestions, setGeneratedQuestions] = useState([]);

  // MAIN FORM
  const { register, control, watch, handleSubmit, reset, setValue, formState } =
    useForm({
      defaultValues: {
        topic: "",
        subTopic: "",
        objectives: [],
        summary: [],
        yearGroup: "",
        difficulty: "",
        numMCQ: null,
        numFill: null,
        numDiagram: null,
        source: "gsce",
        questions: [],
      },
    });

  const { errors } = formState;

  const { fields, append, replace, remove } = useFieldArray({
    control,
    name: "questions", // editable in modal
  });

  const source = watch("source");

  // 1️⃣ SEND FORM DATA TO BACKEND TO GENERATE QUESTIONS
  const handleGenerateQuestions = async (formDataValues) => {
    try {
      setLoading(true);

      const res = await generateQuestions(formDataValues);

      // store questions
      setGeneratedQuestions(res.questions);

      // put into react-hook-form fields
      replace(res.questions);

      // store topic/subTopic/introduction/objectives

      setLessonInfo({
        topic: res.topic,
        subTopic: res.subTopic,
        introduction: res.introduction,
        objectives: res.objectives || [],
        summary: res.summary || [],
        difficulty: res.difficulty,
        yearGroup: res.yearGroup,
      });

      // open modal
      setOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 2️⃣ SEND FINAL APPROVED QUESTIONS TO BACKEND
  const approveTask = async () => {
    const currentValues = watch(); // get full updated data
    const questions = currentValues.questions;

    if (!questions || questions.length === 0) {
      alert("No questions to submit.");
      return;
    }
    try {
      const res = await createTask({
        teacherId,
        topic: lessonInfo.topic,
        subTopic: lessonInfo.subTopic,
        difficulty: lessonInfo.difficulty,
        yearGroup: lessonInfo.yearGroup,
        introduction: lessonInfo.introduction,
        objectives: lessonInfo.objectives,
        summary: lessonInfo.summary,
        questions,
      });

      reset();
      setOpen(false);
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  // 2️ Update the subtopics to match the topic
  const selectedTopic = watch("topic");

  const selectedTopicData = topics.find(
    (topic) => topic.value === selectedTopic,
  );

  useEffect(() => {
    setValue("subTopic", "");
  }, [selectedTopic, setValue]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-blue-50 rounded-xl shadow-lg my-5 border-2 border-blue-100">
      <h1 className="text-2xl font-bold mb-6">Assign Task</h1>

      {/* ------------- MAIN FORM ------------- */}
      <form
        onSubmit={handleSubmit(handleGenerateQuestions)}
        className="space-y-6"
      >
        {/* TOPIC */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Topic</span>
          </label>
          <select
            {...register("topic", { required: "Topic is required" })}
            className={`select select-bordered w-full ${
              errors.topic ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Topic</option>

            {topics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* SUB TOPIC */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Sub Topic</span>
          </label>

          <select
            {...register("subTopic", { required: "Sub Topic is required" })}
            className={`select select-bordered w-full ${
              errors.subTopic ? "border-red-500" : ""
            }`}
            disabled={!selectedTopic}
          >
            <option value="">
              {selectedTopic ? "Select Sub Topic" : "Select topic first"}
            </option>

            {selectedTopicData?.subTopics?.map((sub) => (
              <option key={sub.value} value={sub.value}>
                {sub.label}
              </option>
            ))}
          </select>

          {errors.subTopic && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subTopic.message}
            </p>
          )}
        </div>

        {/* YEAR GROUP */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Year Group</span>
          </label>
          <select
            {...register("yearGroup", { required: "Year group is required" })}
            className={`select select-bordered w-full ${
              errors.yearGroup ? "border-red-500" : ""
            }`}
          >
            <option value="">Select year group</option>
            {[
              "Year 7",
              "Year 8",
              "Year 9",
              "Year 10",
              "Year 11",
              "Year 12",
              "Year 13",
            ].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          {errors.yearGroup && (
            <p className="text-red-500 text-sm mt-1">
              {errors.yearGroup.message}
            </p>
          )}
        </div>

        {/* DIFFICULTY */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Difficulty</span>
          </label>
          <div className="flex gap-6">
            {["easy", "medium", "hard"].map((d) => (
              <label key={d} className="label cursor-pointer flex gap-2">
                <input
                  type="radio"
                  value={d}
                  {...register("difficulty", {
                    required: "Difficulty is required",
                  })}
                  className="radio"
                />
                <span>{d}</span>
              </label>
            ))}
          </div>
          {errors.difficulty && (
            <p className="text-red-500 text-sm mt-1">
              {errors.difficulty.message}
            </p>
          )}
        </div>

        {/* MCQ COUNT */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">MCQ Count</span>
          </label>
          <input
            type="number"
            min="0"
            {...register("numMCQ", {
              required: "Enter how many MCQs you want",
            })}
            className={`input input-bordered w-full ${
              errors.numMCQ ? "border-red-500" : ""
            }`}
          />
          {errors.numMCQ && (
            <p className="text-red-500 text-sm mt-1">{errors.numMCQ.message}</p>
          )}
        </div>

        {/* FILL-IN COUNT */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Fill-In Count</span>
          </label>
          <input
            type="number"
            min="0"
            {...register("numFill", {
              required: "Enter how many fill-in questions you want",
            })}
            className={`input input-bordered w-full ${
              errors.numFill ? "border-red-500" : ""
            }`}
          />
          {errors.numFill && (
            <p className="text-red-500 text-sm mt-1">
              {errors.numFill.message}
            </p>
          )}
        </div>

        {/* QUESTION SOURCE */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Question Source</span>
          </label>

          <div className="flex flex-col gap-3">
            <label className="label cursor-pointer flex gap-3">
              <input
                type="radio"
                value="gsce"
                {...register("source", { required: "Select a source" })}
                className="radio"
              />
              <span>Use GSCE UK Syllabus</span>
            </label>

            <label className="label cursor-pointer flex gap-3">
              <input
                type="radio"
                value="custom"
                {...register("source", { required: "Select a source" })}
                className="radio"
              />
              <span>Upload Lesson Note</span>
            </label>
          </div>

          {errors.source && (
            <p className="text-red-500 text-sm mt-1">{errors.source.message}</p>
          )}
        </div>

        {/* LESSON NOTE — required only when custom */}
        {source === "custom" && (
          <div>
            <input
              type="file"
              accept="application/pdf"
              {...register("lessonNoteFile", {
                required:
                  "Lesson note file is required when using custom source",
              })}
              className={`input input-bordered w-full ${
                errors.lessonNoteFile ? "border-red-500" : ""
              }`}
            />
            {errors.lessonNoteFile && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lessonNoteFile.message}
              </p>
            )}
          </div>
        )}
        {/* SUBMIT FOR GENERATION */}
        <button className="btn bg-blue-500 text-white w-full" type="submit">
          Generate Questions
        </button>
      </form>

      {/* ------------- MODAL ------------- */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl p-6 shadow-xl">
            {/* ----- Lesson Info ----- */}
            <h2 className="text-2xl font-bold ">Topic Overview</h2>
            <p className="text-sm text-gray-500 mb-4">
              Kindly verify and make all neccesary changes before approving this
              task
            </p>
            <div className="mb-6 p-4 bg-grey-50 border border-grey-200 rounded-xl shadow-sm">
              {/* Topic */}
              <label className="font-semibold mb-2  hidden">Topic</label>
              <input
                type="text"
                value={lessonInfo.topic}
                onChange={(e) =>
                  setLessonInfo((prev) => ({
                    ...prev,
                    topic: e.target.value,
                  }))
                }
                className="input input-bordered w-full mb-4 hidden"
                placeholder="Enter lesson topic"
              />

              {/* Sub Topic */}
              <label className="font-semibold mb-2 block">Topic</label>
              <input
                type="text"
                value={lessonInfo.subTopic}
                onChange={(e) =>
                  setLessonInfo((prev) => ({
                    ...prev,
                    subTopic: e.target.value,
                  }))
                }
                className="input input-bordered w-full mb-4"
                placeholder="Enter lesson topic"
              />

              {/* Introduction */}
              <label className="font-semibold mb-2 block">Introduction</label>
              <textarea
                value={lessonInfo.introduction}
                onChange={(e) =>
                  setLessonInfo((prev) => ({
                    ...prev,
                    introduction: e.target.value,
                  }))
                }
                className="border border-gray-300 rounded-xl p-2  textarea textarea-bordered w-full mb-4"
                placeholder="Enter lesson introduction"
              />

              {/* Objectives */}
              <label className="font-semibold mb-2 block">Objectives</label>
              <ul className="list-disc list-inside mt-2 space-y-2">
                {lessonInfo.objectives.map((obj, idx) => (
                  <li key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={obj}
                      onChange={(e) => {
                        const newObjectives = [...lessonInfo.objectives];
                        newObjectives[idx] = e.target.value;
                        setLessonInfo((prev) => ({
                          ...prev,
                          objectives: newObjectives,
                        }));
                      }}
                      className="input input-bordered w-full"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newObjectives = lessonInfo.objectives.filter(
                          (_, i) => i !== idx,
                        );
                        setLessonInfo((prev) => ({
                          ...prev,
                          objectives: newObjectives,
                        }));
                      }}
                      className="btn btn-sm bg-red-500 text-white px-2"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>

              {/* Add new objective */}
              <button
                type="button"
                onClick={() =>
                  setLessonInfo((prev) => ({
                    ...prev,
                    objectives: [...prev.objectives, ""],
                  }))
                }
                className="btn bg-green-500 text-white mt-2 px-2"
              >
                + Add Objective
              </button>
            </div>

            <h2 className="text-2xl font-bold mb-4">Review & Edit Questions</h2>

            {/* EDITABLE QUESTIONS */}
            {fields.map((item, index) => {
              const type = watch(`questions.${index}.type`);
              const errorsRef = formState?.errors?.questions?.[index] || {};

              return (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 mb-6 bg-gray-50 relative"
                >
                  {/* ---- DELETE BUTTON ---- */}
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete Question ${
                            index + 1
                          }? This cannot be undone.`,
                        )
                      ) {
                        remove(index);
                      }
                    }}
                    className="absolute right-3 top-3 text-red-600 font-bold"
                  >
                    ✕
                  </button>

                  <h3 className="font-semibold mb-2">Question {index + 1}</h3>
                  {/* DIAGRAM PREVIEW */}
                  {item.diagram &&
                    typeof item.diagram === "string" &&
                    item.diagram.trim().startsWith("<svg") && (
                      <div
                        className="my-4 flex justify-center"
                        dangerouslySetInnerHTML={{ __html: item.diagram }}
                      />
                    )}

                  {/* ---- QUESTION ---- */}
                  <label>Question</label>
                  <input
                    {...register(`questions.${index}.question`, {
                      required: "Question is required",
                    })}
                    className="input input-bordered w-full mb-1"
                  />
                  {errorsRef.question && (
                    <p className="text-red-500 text-sm mb-2">
                      {errorsRef.question.message}
                    </p>
                  )}

                  {/* ---- TYPE ---- */}
                  <label>Type</label>
                  <select
                    {...register(`questions.${index}.type`)}
                    className="select select-bordered w-full mb-1"
                  >
                    <option value="MCQ">MCQ</option>
                    <option value="Fill-in">Fill-in</option>
                  </select>
                  {errorsRef.type && (
                    <p className="text-red-500 text-sm mb-2">
                      {errorsRef.type.message}
                    </p>
                  )}

                  {/* ---- MCQ OPTIONS ---- */}
                  {type === "MCQ" && (
                    <div>
                      <label>Options (all required)</label>

                      {[0, 1, 2].map((i) => (
                        <div key={i}>
                          <input
                            {...register(`questions.${index}.options.${i}`, {
                              required: "Option is required",
                            })}
                            placeholder={`Option ${i + 1}`}
                            className="input input-bordered w-full mb-1"
                          />
                          {errorsRef.options?.[i] && (
                            <p className="text-red-500 text-sm mb-1">
                              {errorsRef.options[i].message}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ---- ANSWER ---- */}
                  <label>Answer</label>
                  <input
                    {...register(`questions.${index}.answer`, {
                      required: "Answer is required",
                    })}
                    className="input input-bordered w-full mb-1"
                  />
                  {errorsRef.answer && (
                    <p className="text-red-500 text-sm mb-2">
                      {errorsRef.answer.message}
                    </p>
                  )}

                  {/* DIAGRAM PREVIEW */}
                  {item.explanatoryDiagram && (
                    <div className="mb-2">
                      <label className="font-semibold block">
                        Explanatory Diagram:
                      </label>
                      <img
                        src={item.explanatoryDiagram}
                        alt={`Diagram for question ${index + 1}`}
                        className="max-w-full h-auto border rounded-md"
                      />
                    </div>
                  )}

                  {/* ---- EXPLANATION ---- */}
                  <label className="font-semibold mb-2 block">
                    Explanation
                  </label>

                  <ul className="list-disc list-inside mt-2 space-y-2">
                    {(watch(`questions.${index}.explanation`) || []).map(
                      (exp, expIndex) => (
                        <li key={expIndex} className="flex gap-2 items-center">
                          <input
                            type="text"
                            {...register(
                              `questions.${index}.explanation.${expIndex}`,
                              {
                                required: "Explanation point is required",
                              },
                            )}
                            className="input input-bordered w-full"
                          />

                          <button
                            type="button"
                            onClick={() => {
                              const current =
                                watch(`questions.${index}.explanation`) || [];

                              const updated = current.filter(
                                (_, i) => i !== expIndex,
                              );

                              setValue(
                                `questions.${index}.explanation`,
                                updated,
                              );
                            }}
                            className="btn btn-sm bg-red-500 text-white px-2"
                          >
                            ✕
                          </button>
                        </li>
                      ),
                    )}
                  </ul>

                  {/* Add new explanation point */}
                  <button
                    type="button"
                    onClick={() => {
                      const current =
                        watch(`questions.${index}.explanation`) || [];

                      setValue(`questions.${index}.explanation`, [
                        ...current,
                        "",
                      ]);
                    }}
                    className="btn bg-green-500 text-white mt-2 px-2"
                  >
                    + Add Explanation Point
                  </button>

                  {/* Error display */}
                  {errors?.questions?.[index]?.explanation && (
                    <p className="text-red-500 text-sm mt-1">
                      At least one explanation point is required
                    </p>
                  )}
                </div>
              );
            })}

            {/* ---- ADD QUESTION ---- */}
            <button
              type="button"
              onClick={() =>
                append({
                  question: "",
                  type: "MCQ",
                  options: ["", "", "", ""],
                  answer: "",
                  explanation: "",
                })
              }
              className="btn bg-green-600 text-white mb-6 px-2"
            >
              + Add Question
            </button>

            {/* ---- ACTION BUTTONS ---- */}
            <div className="flex justify-end gap-4">
              <button onClick={() => setOpen(false)} className="btn">
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmit(approveTask)}
                className="btn bg-blue-600 text-white px-2"
              >
                Approve & Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading design */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <span className="loading loading-spinner loading-xl text-white"></span>
        </div>
      )}
    </div>
  );
}
