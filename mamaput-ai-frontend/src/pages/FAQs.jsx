import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const FAQS = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What exactly is Mamaput AI?",
      answer:
        "MamaPut AI is an AI-powered nutrition app that provides personalised African meal plans, calorie tracking, and diet tips to support healthy eating.",
    },
    {
      question: "How does it work?",
      answer:
        "You enter your dietary preferences, and MamaPut AI generates personalized meal plans based on your needs.",
    },
    {
      question: "Is it free to use?",
      answer:
        "There is a free version with limited features, and a premium version with more benefits.",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full px-16 lg:px-32 py-10 gap-5">
      <h3 className="text-2xl md:text-3xl font-bold tracking-wide font-instrument-sans text-center">
        Frequently Asked Questions
      </h3>
      <p className="text-trueGrey text-center">
        Find answers related to the design system, purchase, updates, and support.
      </p>

      <div className="flex flex-col gap-5 w-full md:w-1/2 mt-5">
        {faqs.map((detail, index) => (
          <div
            key={index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className={`cursor-pointer rounded-xl p-4 transition-all 
              ${openIndex === index ? "bg-primaryGreen text-white" : "bg-tertiaryGrey text-black"}`}
          >
            <h4 className="flex justify-between items-center">
              {detail.question} {openIndex === index ? <Minus /> : <Plus />}
            </h4>
            {openIndex === index && <p className="mt-2">{detail.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQS;
