import React, { useState } from "react";
import { X } from "lucide-react";

const TermsAndConditions = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("terms");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Modal */}
      <div className="relative w-full max-w-3xl mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
            {activeTab === "terms" ? "Terms & Conditions" : "Privacy Policy"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("terms")}
            className={`flex-1 py-3 text-sm font-semibold transition ${
              activeTab === "terms"
                ? "border-b-2 border-gray-900 text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Terms
          </button>

          <button
            onClick={() => setActiveTab("privacy")}
            className={`flex-1 py-3 text-sm font-semibold transition ${
              activeTab === "privacy"
                ? "border-b-2 border-gray-900 text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Privacy Policy
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-6 space-y-6 text-gray-700 text-sm md:text-base leading-relaxed">
          {/* TERMS */}
          {activeTab === "terms" && (
            <>
              <p className="text-sm text-gray-500">
                IC by Koryis — Last updated: <strong>11/11/2025</strong>
              </p>

              <Section title="1. Introduction">
                These Terms govern your use of IC (Intelligent Companion),
                provided by Koryis Ltd. By registering or using IC, you agree to
                these Terms.
              </Section>

              <Section title="2. Eligibility">
                IC is designed for students aged 11–16. Accounts must be created
                by a parent/guardian or an authorized school representative.
              </Section>

              <Section title="3. Subscriptions & Payments">
                <ul className="list-disc ml-5 space-y-1">
                  <li>Individual Plan: £5/month per child</li>
                  <li>Family Bundle: £16.99/month (up to 4 children)</li>
                  <li>School Licensing: Custom pricing</li>
                </ul>
                <p className="mt-2">
                  Subscriptions renew monthly unless cancelled.
                </p>
              </Section>

              <Section title="4. Cancellation & Refunds">
                You may cancel at any time via your dashboard. Access continues
                until the end of the billing cycle. No partial refunds.
              </Section>

              <Section title="5. Data Protection & Privacy">
                Koryis complies with UK GDPR and the Data Protection Act 2018.
                Student data is used only for learning delivery and tracking.
              </Section>

              <Section title="6. Use of Service">
                IC must be used for educational purposes only. Misuse may result
                in suspension.
              </Section>

              <Section title="7. Intellectual Property">
                All content, software, and materials remain the property of
                Koryis Ltd.
              </Section>

              <Section title="8. Liability">
                IC is an educational support tool and does not replace formal
                teaching. Koryis is not liable for exam outcomes.
              </Section>

              <Section title="9. Changes to Terms">
                Continued use of IC indicates acceptance of updated Terms.
              </Section>

              <Section title="10. Contact">
                <strong>Koryisresource@gmail.com</strong>
              </Section>
            </>
          )}

          {/* PRIVACY */}
          {activeTab === "privacy" && (
            <>
              <Section title="1. Scope">
                This Privacy Policy applies to all users of Koryis Intelligent
                Companion and explains how personal data is handled.
              </Section>

              <Section title="2. Information We Collect">
                <ul className="list-disc ml-5 space-y-1">
                  <li>Name, email, institution details</li>
                  <li>Uploaded learning content and responses</li>
                  <li>Device, IP, usage logs, cookies</li>
                  <li>Student progress and engagement data</li>
                </ul>
              </Section>

              <Section title="3. How We Use Information">
                <ul className="list-disc ml-5 space-y-1">
                  <li>Personalized learning experiences</li>
                  <li>Accessibility features</li>
                  <li>Platform improvement and analytics</li>
                  <li>Communication and support</li>
                </ul>
              </Section>

              <Section title="4. Sharing of Information">
                Data may be shared with educators, service providers, and AI
                services for functionality. Personal data is never sold or used
                to train external AI models.
              </Section>

              <Section title="5. Your Rights">
                You may access, correct, delete, or restrict processing of your
                data at any time.
              </Section>

              <Section title="6. Data Security">
                We use encryption, role-based access controls, and
                GDPR-compliant audits.
              </Section>

              <Section title="7. Retention">
                Data is retained only as long as necessary or required by law.
                Some data may be anonymized.
              </Section>

              <Section title="8. Policy Updates">
                Changes will be communicated via email or platform
                notifications.
              </Section>

              <Section title="9. Contact">
                <strong>Koryisresource@gmail.com</strong>
              </Section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* Reusable Section */
const Section = ({ title, children }) => (
  <div>
    <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
    <div>{children}</div>
  </div>
);

export default TermsAndConditions;
