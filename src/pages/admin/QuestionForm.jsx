import { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import axios from "axios";

/* ---------------- TOPICS ---------------- */
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
      {
        value: "Notation and manipulation",
        label: "Notation and manipulation",
      },
      { value: "Graphs", label: "Graphs" },
      {
        value: "Equations and inequalities",
        label: "Equations and inequalities",
      },
      { value: "Sequences", label: "Sequences" },
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

/* ---------------- COMPONENT ---------------- */
const QuestionForm = ({ existingQuestion = null, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  /* ---------------- FORM SETUP ---------------- */
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: existingQuestion || {
      topic: "",
      subTopic: "",
      difficulty: "",
      yearGroup: "",
      question: "",
      type: "MCQ",
      options: ["", "", "", ""],
      answer: "",
      explanation: "",
      diagram: null,
      explanatoryDiagram: null,
    },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "options",
  });

  const type = watch("type");
  const selectedTopic = watch("topic");

  /* -------- Reset options when type changes -------- */
  useEffect(() => {
    if (type === "fill-in") replace([]);
    else if (fields.length === 0) replace(["", "", "", ""]);
  }, [type]);

  /* -------- Reset subtopic when topic changes -------- */
  useEffect(() => {
    setValue("subTopic", "");
  }, [selectedTopic]);

  /* ---------------- SUBMIT ---------------- */
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "options" && type !== "fill-in") {
          formData.append("options", JSON.stringify(value));
        } else if (key !== "diagram" && key !== "explanatoryDiagram") {
          formData.append(key, value);
        }
      });

      if (data.diagram?.[0]) {
        formData.append("diagram", data.diagram[0]);
      }

      if (data.explanatoryDiagram?.[0]) {
        formData.append("explanatoryDiagram", data.explanatoryDiagram[0]);
      }

      const url = existingQuestion
        ? `http://localhost:3000/api/diagram-questions/${existingQuestion._id}`
        : "http://localhost:3000/api/diagram-questions";

      const method = existingQuestion ? "put" : "post";

      await axios[method](url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Question saved successfully");
      reset();
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("Failed to save question");
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-4 border rounded-lg space-y-3"
    >
      {/* TOPIC */}
      <select
        {...register("topic", { required: "Topic required" })}
        className="select w-full"
      >
        <option value="">Select topic</option>
        {topics.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      {/* SUB TOPIC */}
      <select
        {...register("subTopic", { required: "Sub topic required" })}
        className="select w-full"
        disabled={!selectedTopic}
      >
        <option value="">Select sub topic</option>
        {topics
          .find((t) => t.value === selectedTopic)
          ?.subTopics.map((st) => (
            <option key={st.value} value={st.value}>
              {st.label}
            </option>
          ))}
      </select>

      {/* YEAR GROUP */}
      <select
        {...register("yearGroup", { required: true })}
        className="select w-full"
      >
        <option value="">Select year group</option>
        {[...Array(13)].map((_, i) => (
          <option key={i} value={`Year ${i + 1}`}>
            Year {i + 1}
          </option>
        ))}
      </select>

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

      <textarea
        {...register("question", { required: true })}
        className="textarea input w-full"
        placeholder="Question"
      />

      <select {...register("type")} className="select w-full">
        <option value="MCQ">MCQ</option>
        <option value="fill-in">Fill in</option>
      </select>

      {type === "MCQ" &&
        fields.map((_, i) => (
          <input
            key={i}
            {...register(`options.${i}`)}
            className="input w-full"
            placeholder={`Option ${i + 1}`}
          />
        ))}

      <input
        {...register("answer", { required: true })}
        className="input w-full"
        placeholder="Answer"
      />

      <textarea
        {...register("explanation")}
        className=" textarea input w-full"
        placeholder="Explanation"
      />

      {/* FILES */}
      {/* FILE UPLOADS WITH PREVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* QUESTION DIAGRAM */}
        <Controller
          name="diagram"
          control={control}
          render={({ field }) => {
            const file = field.value?.[0];
            const preview = file ? URL.createObjectURL(file) : null;

            return (
              <label
                className="flex flex-col items-center justify-center
          border-2 border-dashed border-gray-300
          rounded-2xl p-6 cursor-pointer
          hover:border-blue-500 hover:bg-blue-50
          transition space-y-3"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => field.onChange(e.target.files)}
                />

                <span className="text-sm font-semibold text-gray-800">
                  Question Diagram
                </span>

                <span className="text-xs text-gray-500 text-center">
                  Diagram shown directly with the question
                </span>

                {preview ? (
                  <img
                    src={preview}
                    alt="Question Diagram Preview"
                    className="w-full max-w-[200px] h-40 object-contain
              rounded-xl border border-gray-200 bg-white"
                  />
                ) : (
                  <span className="text-xs text-blue-600 font-medium">
                    Click to upload
                  </span>
                )}
              </label>
            );
          }}
        />

        {/* EXPLANATORY DIAGRAM */}
        <Controller
          name="explanatoryDiagram"
          control={control}
          render={({ field }) => {
            const file = field.value?.[0];
            const preview = file ? URL.createObjectURL(file) : null;

            return (
              <label
                className="flex flex-col items-center justify-center
          border-2 border-dashed border-gray-300
          rounded-2xl p-6 cursor-pointer
          hover:border-green-500 hover:bg-green-50
          transition space-y-3"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => field.onChange(e.target.files)}
                />

                <span className="text-sm font-semibold text-gray-800">
                  Explanatory Diagram
                </span>

                <span className="text-xs text-gray-500 text-center">
                  Diagram used in explanations or solutions
                </span>

                {preview ? (
                  <img
                    src={preview}
                    alt="Explanatory Diagram Preview"
                    className="w-full max-w-[200px] h-40 object-contain
              rounded-xl border border-gray-200 bg-white"
                  />
                ) : (
                  <span className="text-xs text-green-600 font-medium">
                    Click to upload
                  </span>
                )}
              </label>
            );
          }}
        />
      </div>

      <button
        disabled={isLoading}
        className={`${
          isLoading
            ? "bg-gray-200 cursor-not-allowed text-gray-500"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white py-2 rounded-xl w-full `}
      >
        {isLoading ? "Adding...." : "Add Question"}
      </button>
    </form>
  );
};

export default QuestionForm;
