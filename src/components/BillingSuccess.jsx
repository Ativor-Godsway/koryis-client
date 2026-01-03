// BillingSuccess.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BillingSuccess = () => {
  const navigate = useNavigate();
  const [subscriptionConfirmed, setSubscriptionConfirmed] = useState(false);

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("student"));
    if (!student?._id) return;

    // Poll backend to check if subscription is active
    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/students/${student._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "prepAiStudentToken"
              )}`,
            },
          }
        );
        const data = await res.json();

        if (data.isSubscribed) {
          setSubscriptionConfirmed(true);
          clearInterval(interval);
          setTimeout(() => navigate("/student/dashboard"), 1500); // redirect shortly
        }
      } catch (err) {
        console.error("Error checking subscription:", err);
      }
    }, 2000); // check every 2s

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold mb-2 text-green-600">
          Payment Successful!
        </h1>
        <p className="text-gray-700 mb-6">
          {subscriptionConfirmed
            ? "Subscription confirmed! Redirecting to dashboard..."
            : "Waiting for subscription confirmation..."}
        </p>
      </div>
    </div>
  );
};

export default BillingSuccess;
