"use client";
import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
const faqs = [
  {
    question: "What is Nolimit?",
    answer:
      "Nolimit is an AI-powered agentic IDE designed to accelerate product development. It lets you orchestrate autonomous AI agents for coding, testing, debugging, and deploying—directly from a collaborative workspace. Whether you're building apps, APIs, or automation workflows, Nolimit reduces development time from weeks to hours.",
  },
  {
    question: "How is Nolimit different from other AI tools?",
    answer:
      "Most AI tools give you code snippets—Nolimit gives you finished solutions. Our multi-agent system coordinates specialized AI agents that plan, execute, and iterate together. You can run parallel tasks, integrate with your tech stack, and deploy without leaving the IDE.",
  },
  {
    question: "What can I build with Nolimit?",
    answer:
      "Anything from full-stack web apps, AI-powered chatbots, and API services to internal dashboards, automation scripts, and data pipelines. With our plugin ecosystem, Nolimit can adapt to almost any tech stack you use.",
  },
  {
    question: "Does Nolimit replace developers?",
    answer:
      "No—Nolimit is a force multiplier, not a replacement. It automates repetitive coding and operational tasks so developers can focus on architecture, innovation, and problem-solving.",
  },
  {
    question: "How do I get started?",
    answer:
      "Sign up, choose a starter template or create a blank project, and invite your team. Nolimit agents will assist you through planning, building, and deploying your first project. You can also connect to your GitHub, Vercel, AWS, or other deployment targets instantly.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full py-10 md:py-10 flex flex-col items-center justify-center select-none">
      {/* FAQ Header */}
      <div className="space-y-6 text-center">
        <h2 className=" text-xl md:text-4xl font-extrabold ">
          Frequently Asked Questions
        </h2>
        <h2 className="text- font-normal  leading-relaxed">
          Some answers to some frequently asked questions.
        </h2>
      </div>

      {/* FAQ Items */}
      <div className="w-full max-w-[90%]  md:max-w-[50%] mt-6 space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b px-4shadow-sm border-white/10 ">
            <button
              className="w-full flex justify-between items-center py-4 text-sm md:text-lg font-semibold  text-[#e2e2e2] text-left"
              onClick={() => toggleFaq(index)}
              aria-expanded={openIndex === index}
            >
              {faq.question}
              <IoIosAdd
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-45" : ""
                }`}
                aria-label="Toggle FAQ answer"
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "max-h-96 opacity-100" // Increased max-height for longer answers
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-[#767676] text-[14px] pb-4 ">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
