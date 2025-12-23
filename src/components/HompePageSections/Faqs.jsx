import React from "react";

const faqs = [
  {
    question: "How does IC support dyslexic learners?",
    answer:
      "IC uses low-stimulation visuals, chunked instructions, and hands-on tools like virtual abacuses to reduce cognitive load. Every task is broken into manageable steps, with progress tracked in real time.",
  },
  {
    question: "Is IC aligned with the UK GCSE syllabus?",
    answer:
      "Yes, all content is 100% aligned with the UK GCSE Maths curriculum. Topics include Number, Algebra, Geometry, and Statistics, tailored to both Foundation and Higher tiers.",
  },
  {
    question: "Can parents and teachers track progress?",
    answer:
      "Absolutely. IC provides secure dashboards for teachers and parents to monitor student progress, mastery levels, and task completion. Reports can be exported anytime.",
  },
  {
    question: "Is IC available outside school hours?",
    answer:
      "Yes, IC is accessible 24/7. Learners can log in from home or school, and tasks adapt to their pace and needs.",
  },
];

const Faqs = () => {
  return (
    <section className="relative py-28 overflow-hidden bg-white">
      {/* SOFT BACKGROUND ACCENT */}
      <div className="absolute top-20 -left-32 w-[420px] h-[420px] bg-purple-200 rounded-full blur-[160px] opacity-20" />
      <div className="absolute bottom-0 -right-32 w-[420px] h-[420px] bg-indigo-200 rounded-full blur-[160px] opacity-20" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about IC and how it supports dyslexic
            learners.
          </p>
        </div>

        <div className="flex flex-col gap-6 max-w-4xl mx-auto text-xl">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group rounded-3xl border border-purple-200 bg-white/80 backdrop-blur-md shadow-sm transition-all duration-300 "
            >
              <summary className="flex cursor-pointer list-none items-center justify-between px-8 py-6 text-lg md:text-xl font-medium text-gray-900">
                {faq.question}

                <span className="ml-4 text-purple-600 transition-transform duration-300 group-open:rotate-180">
                  ▼
                </span>
              </summary>

              <div className="px-8 pb-6 text-gray-600 text-base md:text-lg leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;
