import { useFormContext, useFieldArray } from "react-hook-form";
import { cities } from "../../data/cities";

const YEAR_GROUPS = [
  "Reception",
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
  "Year 7",
  "Year 8",
  "Year 9",
  "Year 10",
  "Year 11",
  "Year 12",
  "Year 13",
];

const SCHOOL_TYPES = ["State", "Independent", "Mainstream", "Home"];
const READING_PREFS = ["Visual", "Audio", "Both"];
const FONT_PREFS = ["OpenDyslexic", "Legend", "Default"];
const GOAL_TYPES = ["Exam", "Skill Mastery", "Confidence"];

export default function ChildStep() {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "children",
  });

  const children = watch("children");

  // Helper for styling errors
  const inputStyles = (err) =>
    `p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-300
    ${err ? "border-red-500" : "border-gray-300"}`;

  return (
    <div className="space-y-8">
      {fields.map((field, index) => {
        const childErrors = errors?.children?.[index] || {};

        return (
          <div
            key={field.id}
            className="p-2 md:p-6 bg-white border rounded-2xl shadow-sm space-y-6 relative"
          >
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-4 right-4 text-red-500 font-bold text-lg"
              >
                ✕
              </button>
            )}

            <h3 className="text-xl font-semibold text-blue-600">
              Child {index + 1}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <input
                  {...register(`children.${index}.firstName`, {
                    required: "First name is required",
                  })}
                  placeholder="First Name"
                  className={`input ${inputStyles(childErrors?.firstName)}`}
                />
                {childErrors?.firstName && (
                  <p className="text-red-500 text-sm">
                    {childErrors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <input
                  {...register(`children.${index}.lastName`, {
                    required: "Last name is required",
                  })}
                  placeholder="Last Name"
                  className={`input ${inputStyles(childErrors?.lastName)}`}
                />
                {childErrors?.lastName && (
                  <p className="text-red-500 text-sm">
                    {childErrors.lastName.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <select
                  {...register(`children.${index}.gender`, {
                    required: "Gender is required",
                  })}
                  className={` select `}
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Prefer not to say</option>
                  <option>Other</option>
                </select>
                {childErrors?.gender && (
                  <p className="text-red-500 text-sm">
                    {childErrors.gender.message}
                  </p>
                )}
              </div>

              {/* Year Group */}
              <div>
                <select
                  {...register(`children.${index}.yearGroup`, {
                    required: "Year group is required",
                  })}
                  className={` select `}
                >
                  <option value="">Select Year Group</option>
                  {YEAR_GROUPS.map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
                {childErrors?.yearGroup && (
                  <p className="text-red-500 text-sm">
                    {childErrors.yearGroup.message}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <select
                  {...register(`children.${index}.city`, {
                    required: "City is required",
                  })}
                  className={`select  `}
                >
                  {cities.map((city) => (
                    <option key={city}>{city}</option>
                  ))}
                </select>
                {childErrors?.city && (
                  <p className="text-red-500 text-sm">
                    {childErrors.city.message}
                  </p>
                )}
              </div>

              {/* School Type */}
              <div>
                <select
                  {...register(`children.${index}.schoolType`, {
                    required: "School type is required",
                  })}
                  className={` select`}
                >
                  <option value="">School Type</option>
                  {SCHOOL_TYPES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                {childErrors?.schoolType && (
                  <p className="text-red-500 text-sm">
                    {childErrors.schoolType.message}
                  </p>
                )}
              </div>

              {/* Optional fields */}

              <input
                {...register(`children.${index}.targetGrade`)}
                placeholder="Target Grade (Optional)"
                className="input p-3 border rounded-xl bg-gray-50"
              />

              <div>
                <select
                  {...register(`children.${index}.goalType`, {
                    required: "Goal type is required",
                  })}
                  className={` select`}
                >
                  <option value="">Goal Type</option>
                  {GOAL_TYPES.map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
                {childErrors?.goalType && (
                  <p className="text-red-500 text-sm">
                    {childErrors.goalType.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {fields.length < 4 && (
        <button
          type="button"
          onClick={() =>
            append({
              firstName: "",
              lastName: "",
              gender: "",
              yearGroup: "",
              city: "",
              schoolType: "",
              targetGrade: "",
              goalType: "",
            })
          }
          className="px-5 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
        >
          + Add Another Child
        </button>
      )}
    </div>
  );
}
