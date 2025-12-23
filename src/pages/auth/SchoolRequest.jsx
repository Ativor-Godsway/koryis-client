import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestSentModal from "../../components/RequestSentModal";
import { useAddRequestMutation } from "../../redux/SchoolRequestApi";

export default function InstitutionalLicensingForm() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [addRequest, { isLoading }] = useAddRequestMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addRequest(data).unwrap();
      setModalOpen(true);
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request. Please try again.");
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100 relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 -right-24 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-30" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 w-full max-w-3xl
        bg-white/80 backdrop-blur-xl
        rounded-3xl shadow-2xl border border-white
        p-6 md:p-10 space-y-10 my-16"
      >
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Institutional Licensing
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Submit your school’s details to request an institutional licence.
          </p>
        </div>

        {/* SCHOOL INFORMATION */}
        <div className="space-y-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            School Information
          </h3>

          <input
            {...register("schoolName", { required: "School name is required" })}
            placeholder="School Name"
            className="input"
          />
          {errors.schoolName && (
            <p className="error">{errors.schoolName.message}</p>
          )}

          <input
            {...register("schoolAddress", { required: "Address is required" })}
            placeholder="School Address"
            className="input"
          />
          {errors.schoolAddress && (
            <p className="error">{errors.schoolAddress.message}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                {...register("postcode", { required: "Postcode is required" })}
                placeholder="Postcode"
                className="input"
              />
              {errors.postcode && (
                <p className="error">{errors.postcode.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("localAuthority", {
                  required: "Local Authority is required",
                })}
                placeholder="Local Authority"
                className="input"
              />
              {errors.localAuthority && (
                <p className="error">{errors.localAuthority.message}</p>
              )}
            </div>
          </div>

          <select
            {...register("schoolType", { required: "School type is required" })}
            className="select"
          >
            <option value="">Select School Type</option>
            <option value="SEN">SEN</option>
            <option value="mainstream">Mainstream</option>
            <option value="academy">Academy</option>
            <option value="independent">Independent</option>
          </select>
          {errors.schoolType && (
            <p className="error">{errors.schoolType.message}</p>
          )}
        </div>

        {/* PRIMARY CONTACT */}
        <div className="space-y-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            Primary Contact
          </h3>

          <input
            {...register("contactName", { required: "Full name is required" })}
            placeholder="Full Name"
            className="input"
          />
          {errors.contactName && (
            <p className="error">{errors.contactName.message}</p>
          )}

          <input
            {...register("roleTitle", { required: "Role / Title is required" })}
            placeholder="Role / Title"
            className="input"
          />
          {errors.roleTitle && (
            <p className="error">{errors.roleTitle.message}</p>
          )}

          <input
            type="email"
            {...register("contactEmail", {
              required: "Email address is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            })}
            placeholder="Email Address"
            className="input"
          />
          {errors.contactEmail && (
            <p className="error">{errors.contactEmail.message}</p>
          )}

          <input
            type="tel"
            {...register("contactPhone", {
              required: "Phone number is required",
            })}
            placeholder="Phone Number"
            className="input"
          />
          {errors.contactPhone && (
            <p className="error">{errors.contactPhone.message}</p>
          )}
        </div>

        {/* STUDENT COVERAGE */}
        <div className="space-y-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            Student Coverage
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                {...register("studentCount", {
                  required: "Number of students is required",
                })}
                placeholder="Number of Students"
                className="input"
              />
              {errors.studentCount && (
                <p className="error">{errors.studentCount.message}</p>
              )}
            </div>

            <div>
              <input
                type="number"
                {...register("teacherCount", {
                  required: "Number of teacher accounts is required",
                })}
                placeholder="Teacher Accounts"
                className="input"
              />
              {errors.teacherCount && (
                <p className="error">{errors.teacherCount.message}</p>
              )}
            </div>
          </div>

          <input
            {...register("ageRange", { required: "Age range is required" })}
            placeholder="Age Range (11–16)"
            className="input"
          />
          {errors.ageRange && (
            <p className="error">{errors.ageRange.message}</p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-2xl
          bg-gradient-to-r from-gray-900 to-black
          text-white font-semibold tracking-wide shadow-lg
          hover:scale-[1.02] transition
          ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Submitting..." : "Submit Application"}
        </button>
      </form>

      {/* SUCCESS MODAL */}
      <RequestSentModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          navigate("/");
        }}
      />
    </section>
  );
}
