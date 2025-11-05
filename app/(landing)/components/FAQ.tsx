// "use client";
// import React, { useState } from "react";
// import { IoIosAdd } from "react-icons/io";

// const faqs = [
//   {
//     question: "What is AI-powered CMS development?",
//     answer:
//       "We use AI tools alongside expert developers to speed up CMS website development, optimize SEO, and create smarter websites that are faster, secure, and easy to manage.",
//   },
//   {
//     question: "Which CMS platforms do you work with?",
//     answer:
//       "We specialize in WordPress, Shopify, Webflow, WooCommerce, and custom CMS solutions — all enhanced with AI-powered optimizations for better performance and growth.",
//   },
//   {
//     question: "How fast can my website be ready?",
//     answer:
//       "Thanks to AI-assisted workflows, most websites can be ready in days instead of weeks, depending on complexity.",
//   },
//   {
//     question: "Can I manage my website myself?",
//     answer:
//       "Absolutely! All our CMS websites come with user-friendly dashboards, so you can edit content, add pages, or manage products without technical knowledge.",
//   },
//   {
//     question: "Do you provide SEO and content optimization?",
//     answer:
//       "Yes! Our AI tools help generate optimized content, structure pages for better SEO, and monitor analytics to boost traffic and conversions.",
//   },
//   {
//     question: "Can you migrate my existing website to a new CMS?",
//     answer:
//       "Yes. We handle full migration, including content, images, plugins, and SEO settings, with minimal downtime.",
//   },
//   {
//     question: "Do you offer ongoing support?",
//     answer:
//       "We offer maintenance, updates, and AI-based performance monitoring to ensure your website stays fast, secure, and effective.",
//   },
// ];

// const FAQ: React.FC = () => {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   const toggleFaq = (index: number) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div className="w-full py-10 md:py-10 flex flex-col items-center justify-center select-none">
//       {/* FAQ Header */}
//       <div className="space-y-6 text-center">
//         <h2 className="text-xl md:text-4xl font-semibold">
//           Frequently Asked Questions
//         </h2>
//         <p className="text-sm md:text-base font-normal leading-relaxed text-[#e2e2e2]">
//           Answers to common questions about our AI-powered CMS development
//           services.
//         </p>
//       </div>

//       {/* FAQ Items */}
//       <div className="w-full max-w-[90%] md:max-w-[50%] mt-6 space-y-4">
//         {faqs.map((faq, index) => (
//           <div key={index} className="border-b px-4 shadow-sm border-white/10">
//             <button
//               className="w-full flex justify-between items-center py-4 text-sm md:text-lg font-semibold text-[#e2e2e2] text-left"
//               onClick={() => toggleFaq(index)}
//               aria-expanded={openIndex === index}
//             >
//               {faq.question}
//               <IoIosAdd
//                 className={`transition-transform duration-300 ${
//                   openIndex === index ? "rotate-45" : ""
//                 }`}
//                 aria-label="Toggle FAQ answer"
//               />
//             </button>

//             <div
//               className={`overflow-hidden transition-all duration-300 ${
//                 openIndex === index
//                   ? "max-h-96 opacity-100"
//                   : "max-h-0 opacity-0"
//               }`}
//             >
//               <p className="text-[#767676] text-[14px] pb-4">{faq.answer}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FAQ;
"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoIosAdd } from "react-icons/io";

const faqs = [
  {
    question: "Do I need technical knowledge?",
    answer:
      "None. If you can send a text message or speak, you can use Webivus.",
  },
  {
    question: "How is this different from hiring a developer?",
    answer:
      "Developers charge $150-300 per task and take days. Webivus costs $49/month for unlimited tasks and works instantly, 24/7.",
  },
  {
    question: "Will it remember my preferences?",
    answer:
      "Yes! Webivus maintains your complete chat history. It remembers every conversation, every change, and learns your preferences over time.",
  },
  {
    question: "Can I really save thousands of dollars?",
    answer:
      "The average WordPress site owner spends $6,000-12,000 yearly on development and maintenance. Webivus costs $588/year. You do math.",
  },
  {
    question: "What about my site's security?",
    answer:
      "Webivus never stores passwords or sensitive data. All connections are encrypted. We only access what you explicitly approve.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, no contracts or cancellation fees. Export your data anytime.",
  },
 
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(faqs.length).fill(false)
  );
  const [headerVisible, setHeaderVisible] = useState(false);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;

            if (target.dataset.type === "header") {
              setHeaderVisible(true);
            } else if (target.dataset.index) {
              const index = parseInt(target.dataset.index);
              setVisibleItems((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe header
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    // Observe FAQ items
    faqRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full py-10 md:py-10 flex flex-col items-center justify-center select-none  ">
      {/* FAQ Header */}
      <div
        ref={headerRef}
        data-type="header"
        className={`space-y-6 text-center transform transition-all duration-1000 ease-out ${
          headerVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        <h2 className="text-xl md:text-4xl font-semibold text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-sm md:text-base font-normal leading-relaxed text-[#e2e2e2]">
        Straight Answers to Real Concerns
         
        </p>
      </div>

      {/* FAQ Items */}
      <div className="w-full max-w-[90%] md:max-w-[50%] mt-6 space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            ref={(el) => {
              faqRefs.current[index] = el;
            }}
            data-index={index}
            className={`border-b px-4 shadow-sm border-white/10 transform transition-all duration-700 ease-out ${
              visibleItems[index]
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            <button
              className="w-full flex justify-between items-center py-4 text-sm md:text-lg font-semibold text-[#e2e2e2] text-left hover:text-white transition-colors duration-300"
              onClick={() => toggleFaq(index)}
              aria-expanded={openIndex === index}
            >
              {faq.question}
              <IoIosAdd
                className={`transition-all duration-500 ease-out ${
                  openIndex === index
                    ? "rotate-45 text-white scale-110"
                    : "text-[#e2e2e2] hover:text-white hover:scale-105"
                }`}
                size={20}
                aria-label="Toggle FAQ answer"
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                openIndex === index
                  ? "max-h-96 opacity-100 pb-4"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div
                className={`transform transition-all duration-500 ${
                  openIndex === index ? "translate-y-0" : "-translate-y-4"
                }`}
              >
                <p className="text-[#767676] text-[14px] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
