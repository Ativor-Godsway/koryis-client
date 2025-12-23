import { useState } from "react";
import { registerParent } from "../../services/auth";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import TermsAndConditions from "../../components/TermsAndConditions";

export default function Register() {
  const [plan, setPlan] = useState("single");
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [children, setChildren] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState(null);
  const [showTC, setShowTC] = useState(false);
  const navigate = useNavigate();

  const handleAddChild = () => {
    if (children.length < 4) {
      setChildren([...children, ""]);
    }
  };

  const handleChildChange = (index, value) => {
    const updated = [...children];
    updated[index] = value;
    setChildren(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessData(null);

    try {
      const response = await registerParent({
        name: parentName,
        email,
        password,
        children,
      });

      setSuccessData(response);
    } catch (err) {
      console.error("❌ Registration error:", err);
      setError(err.message || "Error registering user");
    } finally {
      setLoading(false);
    }
  };

  const handleParentLogin = async () => {
    const code = successData.parentCode;

    setError(""); // clear old error

    try {
      const res = await login({ code, password });
      setSuccessData(null);

      // Redirect based on user type
      if (res.role === "student") {
        navigate("/student/dashboard");
      } else if (res.role === "parent") {
        navigate("/parent/dashboard");
      }
    } catch (err) {
      setError(err.message || "Error registering user");
    }
  };

  const handleStudentLogin = async () => {
    const code = successData.studentCodes[0].code;

    setError(""); // clear old error

    try {
      const res = await login({ code, password });
      setSuccessData(null);

      // Redirect based on user type
      if (res.role === "student") {
        navigate("/student/dashboard");
      } else if (res.role === "parent") {
        navigate("/parent/dashboard");
      }
    } catch (err) {
      setError(err.message || "Error registering user");
    }
  };

  return (
    <div className="min-h-[90vh] bg-primary-cream h-screen flex items-center justify-center p-6">
      <div className="bg-secondary-beige shadow-2xl rounded-3xl w-full max-w-lg p-8 space-y-6 text-center">
        <h1 className="text-3xl font-bold text-[#2B3A67]">Register</h1>

        {/* Plan Selection */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setPlan("single")}
            className={`py-2 px-4 rounded-2xl font-semibold transition-all ${
              plan === "single"
                ? "bg-[#7BD3EA] text-[#1A1A1A]"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Single Plan
          </button>
          <button
            onClick={() => setPlan("bundle")}
            className={`py-2 px-4 rounded-2xl font-semibold transition-all ${
              plan === "bundle"
                ? "bg-[#7BD3EA] text-[#1A1A1A]"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Bundle Plan
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-[#2B3A67] font-semibold">
              Parent Name
            </label>
            <input
              type="text"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              required
              className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BD3EA]"
            />
          </div>

          <div>
            <label className="block text-[#2B3A67] font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BD3EA]"
            />
          </div>

          <div>
            <label className="block text-[#2B3A67] font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BD3EA]"
            />
          </div>

          {/* Child Fields */}
          {children.map((child, i) => (
            <div key={i}>
              <label className="block text-[#2B3A67] font-semibold">
                Child {i + 1} Name
              </label>
              <input
                type="text"
                value={child}
                onChange={(e) => handleChildChange(i, e.target.value)}
                required
                className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BD3EA]"
              />
            </div>
          ))}

          {plan === "bundle" && children.length < 4 && (
            <button
              type="button"
              onClick={handleAddChild}
              className="text-[#2B3A67] font-semibold underline"
            >
              + Add another child
            </button>
          )}

          <div className="flex gap-1 items-center">
            <input type="checkbox" required />
            <p>
              I agree with the{" "}
              <span
                onClick={() => setShowTC(true)}
                className="underline text-blue-600 cursor-pointer"
              >
                terms and conditions.
              </span>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7BD3EA] hover:bg-[#56BFE0] text-[#1A1A1A] font-bold py-3 rounded-2xl shadow-lg mt-4 transition-all"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Error */}
        {error && (
          <p className="text-red-500 bg-red-100 p-2 rounded-xl">{error}</p>
        )}
      </div>

      {/* Success Modal */}
      {successData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-[90%] max-w-md text-center space-y-4">
            <h2 className="text-2xl font-bold text-green-700">
              🎉 Registration Successful!
            </h2>
            <p className="text-gray-700">
              Here are your access codes. Keep them safe!
            </p>

            <div className="text-left space-y-2 bg-green-50 p-4 rounded-xl">
              <p>
                <strong>Parent Code:</strong>{" "}
                <span className="font-mono text-green-700">
                  {successData.parentCode}
                </span>
              </p>

              <div>
                <strong>Student Codes:</strong>
                <ul className="list-disc ml-6 mt-2">
                  {successData.studentCodes.map((student, i) => (
                    <li key={i} className="font-mono text-blue-700">
                      {student.name}: {student.code}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-between items-center">
              {/* Student Login Button */}
              <button
                onClick={handleStudentLogin}
                className="mt-4 bg-[#7BD3EA] hover:bg-[#56BFE0] text-[#1A1A1A] font-bold py-2 px-6 rounded-2xl shadow-lg"
              >
                Login as Student
              </button>

              {/* Parent Login Button */}
              <button
                onClick={handleParentLogin}
                className="mt-4 bg-[#7BD3EA] hover:bg-[#56BFE0] text-[#1A1A1A] font-bold py-2 px-6 rounded-2xl shadow-lg"
              >
                Login as Parent
              </button>
            </div>
          </div>
        </div>
      )}

      {showTC && (
        <div className="fixed w-screen h-screen bg-[#00000059] flex items-center justify-center">
          <div className="bg-white w-[90vw] md:w-[50vw] h-fit text-center p-5">
            <h3>TermsAndConditions</h3>
            <TermsAndConditions />
            <button
              onClick={() => setShowTC(false)}
              className="btn bg-accent-teal p-3"
            >
              Proceed
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
