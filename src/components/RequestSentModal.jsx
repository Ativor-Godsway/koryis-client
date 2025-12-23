import { motion, AnimatePresence } from "framer-motion";

export default function RequestSentModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal Box */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white w-[90%] max-w-md rounded-2xl p-8 shadow-xl"
          >
            <h2 className="text-xl font-semibold text-center mb-3">
              Request Sent
            </h2>

            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              Your request has been sent. An email will be sent to you shortly
              to discuss your plan in detail.
            </p>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-black text-white font-medium hover:opacity-90 transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
