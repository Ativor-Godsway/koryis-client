import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function ParentStep() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const password = watch("password");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const inputStyles = (hasError) =>
    `w-full p-3 border rounded-xl bg-white focus:outline-none transition-all 
     focus:ring-2 focus:ring-blue-400 shadow-sm
     ${hasError ? "border-red-500" : "border-gray-300"}`;

  return (
    <div className="space-y-6 relative">
      {/* PARENT NAME */}
      <div className="space-y-1">
        <label className="block font-semibold text-lg">Parent Name</label>
        <input
          {...register("parentName", { required: "Parent name is required" })}
          className={inputStyles(errors.parentName)}
          placeholder="Enter parent's full name"
        />
        {errors.parentName && (
          <p className="text-red-500 text-sm">{errors.parentName.message}</p>
        )}
      </div>

      {/* EMAIL */}
      <div className="space-y-1">
        <label className="block font-semibold text-lg">Email Address</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
          type="email"
          className={inputStyles(errors.email)}
          placeholder="example@email.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div className="space-y-1 relative">
        <label className="block font-semibold text-lg">Password</label>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          type={showPassword ? "text" : "password"}
          className={inputStyles(errors.password)}
          placeholder="Enter a secure password"
        />
        {/* Toggle Button */}
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
        </button>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* CONFIRM PASSWORD */}
      <div className="space-y-1 relative">
        <label className="block font-semibold text-lg">Confirm Password</label>
        <input
          {...register("confirmPassword", {
            required: "Confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          type={showConfirmPassword ? "text" : "password"}
          className={inputStyles(errors.confirmPassword)}
          placeholder="Re-enter your password"
        />
        {/* Toggle Button */}
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 "
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
        </button>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
    </div>
  );
}
