import { useForm } from "react-hook-form";
import { useState } from "react";
import { cities } from "../../../data/cities";

export default function CreateStudentForm({
  onSubmitSuccess,
  teacherCode,
  schoolCode,
  onClose,
}) {
  const yearGroups = [
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
  const schoolTypes = ["State", "Independent", "Mainstream"];

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      teacher: teacherCode,
      school: schoolCode,
    },
  });

  const password = watch("password");

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      email: data.email || "",
      parentName: data.parentName,
      parentEmail: data.parentEmail,
      yearGroup: data.yearGroup,
      city: data.city,
      schoolType: data.schoolType,
      password: data.password,
      teacher: data.teacher,
      school: data.school,
    };

    onSubmitSuccess(payload);
    setLoading(false);
    reset();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mx-auto space-y-4 bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl p-6"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-red-600 hover:text-red-700 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4">Create New Student</h2>

        {/* FIRST NAME */}
        <div>
          <label className="block font-medium">First Name</label>
          <input
            {...register("firstName", { required: "First name is required" })}
            className="input w-full"
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        {/* LAST NAME */}
        <div>
          <label className="block font-medium">Last Name</label>
          <input
            {...register("lastName", { required: "Last name is required" })}
            className="input w-full"
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        {/* GENDER */}
        <div>
          <label className="block font-medium">Gender</label>
          <select
            {...register("gender", { required: "Gender is required" })}
            className="select w-full"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender.message}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="block font-medium">Student Email (optional)</label>
          <input
            {...register("email")}
            className="input w-full"
            placeholder="Enter student email"
          />
        </div>

        {/* PARENT INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Parent Name</label>
            <input
              {...register("parentName", {
                required: "Parent name is required",
              })}
              className="input w-full"
              placeholder="Parent full name"
            />
            {errors.parentName && (
              <p className="text-red-500 text-sm">
                {errors.parentName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium">Parent Email</label>
            <input
              {...register("parentEmail", {
                required: "Parent email is required",
              })}
              className="input w-full"
              placeholder="Parent email"
            />
            {errors.parentEmail && (
              <p className="text-red-500 text-sm">
                {errors.parentEmail.message}
              </p>
            )}
          </div>
        </div>

        {/* CITY */}
        <div>
          <label className="block font-medium">City</label>
          <select
            {...register("city", { required: "City is required" })}
            className="select w-full"
          >
            <option value="">Select city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>

        {/* YEAR GROUP */}
        <div>
          <label className="block font-medium">Year Group</label>
          <select
            {...register("yearGroup", { required: "Year group is required" })}
            className="select w-full"
          >
            <option value="">Select year group</option>
            {yearGroups.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
          {errors.yearGroup && (
            <p className="text-red-500 text-sm">{errors.yearGroup.message}</p>
          )}
        </div>

        {/* SCHOOL TYPE */}
        <div>
          <label className="block font-medium">School Type</label>
          <select
            {...register("schoolType", { required: "School type is required" })}
            className="select w-full"
          >
            <option value="">Select type</option>
            {schoolTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.schoolType && (
            <p className="text-red-500 text-sm">{errors.schoolType.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block font-medium">Password</label>
          <div className="relative">
            <input
              {...register("password", { required: "Password is required" })}
              type={showPassword ? "text" : "password"}
              className="input w-full"
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="block font-medium">Confirm Password</label>
          <div className="relative">
            <input
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type={showConfirmPassword ? "text" : "password"}
              className="input w-full"
              placeholder="Confirm password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold mt-4 hover:bg-gray-900 transition"
        >
          {loading ? "Creating..." : "Create Student"}
        </button>
      </form>
    </div>
  );
}
