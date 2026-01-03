// SubscribeButton.jsx
import React, { useState } from "react";

const SubscribeButton = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    const student = JSON.parse(localStorage.getItem("student"));
    if (!student?._id) return alert("Student info not found.");

    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/billing/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(
              "prepAiStudentToken"
            )}`,
          },
          body: JSON.stringify({ studentId: student._id }),
        }
      );

      const data = await res.json();

      if (!data.url) throw new Error("Checkout URL not returned");

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Could not start checkout. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center pt-3">
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`
    relative inline-flex items-center justify-center
    rounded-full px-7 py-1
    text-[15px] font-medium tracking-tight
    bg-black text-white
    shadow-[0_4px_12px_rgba(0,113,227,0.35)]
    transition-all duration-200 ease-out
    hover:bg-[#313131] hover:shadow-[0_6px_18px_rgba(0,113,227,0.45)]
    active:scale-[0.97]
    disabled:opacity-60 disabled:cursor-not-allowed
  `}
      >
        {loading && (
          <span className="absolute left-4 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        )}

        <span className={`${loading ? "ml-3" : ""}`}>
          {loading ? "Redirecting…" : "Subscribe Now"}
        </span>
      </button>
    </div>
  );
};

export default SubscribeButton;
