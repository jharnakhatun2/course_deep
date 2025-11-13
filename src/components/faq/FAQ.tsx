import React, { useEffect, useRef, useState } from "react";
import FeatureCourse from "./FeatureCourse";
import SectionTitle from "../../ult/title/SectionTitle";

type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    id: 1,
    question: "What is Course Deep LMS and who can use it?",
    answer:
      "Course Deep LMS is a modern learning management system designed for students, instructors, and organizations. It helps manage online courses, track student progress, and deliver engaging learning experiences. Both individuals and institutions can use it to create and manage courses.",
  },
  {
    id: 2,
    question: "How do I enroll in a course?",
    answer:
      "Simply create a free account, browse the available courses, and click on the 'Enroll Now' button. If the course is paid, you will be redirected to the checkout page to complete your enrollment.",
  },
  {
    id: 3,
    question: "Can I access courses on mobile devices?",
    answer:
      "Yes, Course Deep LMS is fully responsive and works seamlessly on desktops, tablets, and smartphones. You can learn anytime and anywhere with an internet connection.",
  },
  {
    id: 4,
    question: "Do I get a certificate after completing a course?",
    answer:
      "Yes, once you successfully finish a course and meet all the requirements, you will receive a digital certificate of completion that you can download and share.",
  },
  {
    id: 5,
    question: "What payment methods do you accept for paid courses?",
    answer:
      "We accept major credit/debit cards, PayPal, and other secure online payment methods. All transactions are encrypted to ensure your payment safety.",
  },
  {
    id: 6,
    question: "Can instructors upload their own courses?",
    answer:
      "Yes, registered instructors can create, manage, and publish their own courses on Course Deep LMS. The platform provides tools for uploading videos, documents, quizzes, and assignments easily.",
  },
];

const Faq: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    if (openId !== null) {
      const el = contentRefs.current[openId];
      if (el) el.style.maxHeight = `${el.scrollHeight}px`;
    }

    Object.keys(contentRefs.current).forEach((key) => {
      const id = Number(key);
      const el = contentRefs.current[id];
      if (!el) return;
      if (id !== openId) el.style.maxHeight = "0px";
    });

    const onResize = () => {
      if (openId !== null) {
        const el = contentRefs.current[openId];
        if (el) el.style.maxHeight = `${el.scrollHeight}px`;
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [openId]);

  const toggleFaq = (id: number) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="bg-gray-100 py-8 lg:py-12">
      <div className="lg:max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 mt-10">
          <FeatureCourse />
          <div className="w-full lg:w-2/3">
            
            <SectionTitle title="FAQ" className="text-zinc-600" />
            <span className="flex justify-center text-xs uppercase text-teal-400 text-center pb-8">
              Still Confused?
            </span>

            <div className="space-y-4 max-w-full lg:max-w-3xl mx-auto border border-gray-100 p-5 shadow-xl">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={openId === faq.id}
                    className="w-full flex justify-between items-center p-4 text-left text-gray-800 font-medium hover:bg-gray-100 focus:outline-none"
                  >
                    <span className="font-garamond text-lg">{faq.question}</span>
                    <span
                      className={`ml-2 inline-block transform transition-transform duration-300 ${
                        openId === faq.id ? "rotate-45" : "rotate-0"
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>

                  <div
                    ref={(el) => {
                      contentRefs.current[faq.id] = el;
                    }}
                    className="max-h-0 overflow-hidden transition-[max-height] duration-500 ease-in-out bg-white text-gray-600"
                  >
                    <div className="p-4 text-zinc-500 text-sm">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
