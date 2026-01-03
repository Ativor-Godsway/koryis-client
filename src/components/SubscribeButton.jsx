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
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition ${
        loading ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Redirecting to Payment..." : "Subscribe Now"}
    </button>
  );
};

export default SubscribeButton;
