import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { registerSchool } from "../../services/auth";
import { cities } from "../../data/cities";

const YEAR_GROUPS = [
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

export default function SchoolForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      schoolName: "",
      email: "",
      address: "",
      city: "",
      schoolType: "",
      password: "0000",
      teachers: [
        {
          fullName: "",
          email: "",
          password: "",
          yearGroup: "",
          students: [
            {
              firstName: "",
              lastName: "",
              gender: "",
              parentEmail: "",
              studentEmail: "",
            },
          ],
        },
      ],
    },
  });

  const {
    fields: teacherFields,
    append: addTeacher,
    remove: removeTeacher,
  } = useFieldArray({
    control,
    name: "teachers",
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const res = await registerSchool({
        schoolName: data.schoolName,
        email: data.email,
        address: data.address,
        password: "0000",
        city: data.city,
        schoolType: data.schoolType,
        teachers: data.teachers,
      });
      console.log(res);
      alert("School registered successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Register School</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* ================= SCHOOL SECTION ================= */}
        <div className="p-5 border rounded-xl bg-blue-50">
          <h2 className="text-xl font-bold mb-4">School Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium">School Name</label>
              <input
                {...register("schoolName", { required: "Required" })}
                className="input"
              />
              {errors.schoolName && (
                <p className="text-red-500">{errors.schoolName.message}</p>
              )}
            </div>

            <div>
              <label className="font-medium">School Email</label>
              <input
                {...register("email", { required: "Required" })}
                className="input"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="font-medium">Address</label>
              <input
                {...register("address", { required: "Required" })}
                className="input"
              />
              {errors.address && (
                <p className="text-red-500">{errors.address.message}</p>
              )}
            </div>

            <div>
              <label className="font-medium">City</label>
              <select
                {...register("city", { required: "Required" })}
                className="select"
              >
                {cities.map((city) => (
                  <option key={city}>{city}</option>
                ))}
              </select>
              {errors.city && (
                <p className="text-red-500">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label className="font-medium">School Type</label>
              <select
                {...register("schoolType", { required: "Required" })}
                className="select"
              >
                <option value="">Select Type</option>
                <option value="Mainstream">Mainstream</option>
                <option value="Independent">Independent</option>
                <option value="State">State</option>
              </select>
              {errors.schoolType && (
                <p className="text-red-500">{errors.schoolType.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* ================= TEACHERS SECTION ================= */}
        <h2 className="text-2xl font-bold">Teachers</h2>

        {teacherFields.map((teacher, tIndex) => (
          <div key={teacher.id} className="p-5 border rounded-xl bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Teacher {tIndex + 1}</h3>
              <button
                type="button"
                onClick={() => removeTeacher(tIndex)}
                className="text-red-600 font-semibold hover:underline"
              >
                x
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Full Name</label>
                <input
                  {...register(`teachers.${tIndex}.fullName`, {
                    required: "Required",
                  })}
                  className="input"
                />
              </div>

              <div>
                <label className="font-medium">Email</label>
                <input
                  {...register(`teachers.${tIndex}.email`, {
                    required: "Required",
                  })}
                  className="input"
                />
              </div>

              <div>
                <label className="font-medium">Password</label>
                <input
                  {...register(`teachers.${tIndex}.password`, {
                    required: "Required",
                  })}
                  className="input"
                />
              </div>

              <div>
                <label className="font-medium">Year Group</label>
                <select
                  {...register(`teachers.${tIndex}.yearGroup`, {
                    required: "Required",
                  })}
                  className="select"
                >
                  {YEAR_GROUPS.map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>

                {errors.teachers?.[tIndex]?.yearGroup && (
                  <p className="text-red-500">
                    {errors.teachers[tIndex].yearGroup.message}
                  </p>
                )}
              </div>
            </div>

            {/* STUDENTS */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Students</h4>
              <StudentsList
                tIndex={tIndex}
                control={control}
                register={register}
                errors={errors}
              />
            </div>
          </div>
        ))}

        {/* ADD TEACHER BUTTON */}
        <button
          type="button"
          onClick={() =>
            addTeacher({
              fullName: "",
              email: "",
              password: "",
              yearGroup: "",
              students: [
                {
                  firstName: "",
                  lastName: "",
                  gender: "",
                  parentEmail: "",
                  studentEmail: "",
                },
              ],
            })
          }
          className="px-4 py-2 mt-3 bg-green-600 text-white rounded-lg"
        >
          + Add Teacher
        </button>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full mt-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-xl"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

/* ================== STUDENTS COMPONENT ================== */
function StudentsList({ tIndex, control, register, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `teachers.${tIndex}.students`,
  });

  return (
    <div className="space-y-4">
      {fields.map((student, sIndex) => (
        <div
          key={student.id}
          className="p-4 border rounded-lg bg-white shadow-sm relative"
        >
          <div className="flex justify-between items-center mb-2">
            <h5 className="font-semibold">Student {sIndex + 1}</h5>
            <button
              type="button"
              onClick={() => remove(sIndex)}
              className="text-red-600 font-semibold hover:underline"
            >
              x
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium">First Name</label>
              <input
                {...register(
                  `teachers.${tIndex}.students.${sIndex}.firstName`,
                  {
                    required: "Required",
                  }
                )}
                className="input"
              />
            </div>

            <div>
              <label className="font-medium">Last Name</label>
              <input
                {...register(`teachers.${tIndex}.students.${sIndex}.lastName`, {
                  required: "Required",
                })}
                className="input"
              />
            </div>

            <div>
              <label className="font-medium">Gender</label>
              <select
                {...register(`teachers.${tIndex}.students.${sIndex}.gender`, {
                  required: "Required",
                })}
                className="select"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="font-medium">Parent Email</label>
              <input
                {...register(
                  `teachers.${tIndex}.students.${sIndex}.parentEmail`,
                  { required: "Required" }
                )}
                className="input"
              />
            </div>

            <div>
              <label className="font-medium">Student Email (Optional)</label>
              <input
                {...register(
                  `teachers.${tIndex}.students.${sIndex}.studentEmail`
                )}
                className="input"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            firstName: "",
            lastName: "",
            gender: "",
            parentEmail: "",
            studentEmail: "",
          })
        }
        className="px-4 py-2 mt-2 bg-blue-600 text-white rounded-lg"
      >
        + Add Student
      </button>
    </div>
  );
}
