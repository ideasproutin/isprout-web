import { useState } from 'react';
import { COLORS } from '../../helpers/constants/Colors';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What types of workspace solutions does iSprout offer?",
    answer: "iSprout provides a variety of workspace solutions including coworking spaces, managed offices, virtual offices, and meeting rooms. Whether you're a freelancer, startup, or established enterprise, we have flexible workspace options tailored to meet your business needs."
  },
  {
    id: 2,
    question: "In which cities does iSprout have locations?",
    answer: "iSprout has workspace centers in major Indian cities including Hyderabad, Bangalore, Pune, Chennai, NCR and Vijayawada."
  },
  {
    id: 3,
    question: "What amenities are included in iSprout's workspaces?",
    answer: "Our workspaces feature high-speed internet, meeting rooms, 24/7 access, reception services, printing facilities, and many others."
  },
  {
    id: 4,
    question: "Can I book a workspace for a short term or do I need a long-term commitment?",
    answer: "iSprout offers flexible plans ranging from 1 month to long-term agreements, allowing you to choose what best suits your needs."
  },
  {
    id: 5,
    question: "How do I schedule a tour of an iSprout workspace?",
    answer: "You can easily schedule a tour by filling out the contact form on our website or calling our customer service number for the desired workspace location."
  },
  {
    id: 6,
    question: "What safety and hygiene measures does iSprout implement in its workspaces?",
    answer: "iSprout prioritizes member safety with regular sanitization, social distancing protocols, contactless entry systems, and enhanced air filtration in all our centers."
  },
  {
    id: 7,
    question: "Are iSprout's workspaces suitable for teams or just individuals?",
    answer: "iSprout caters to both individuals and teams of all sizes. We offer scalable solutions from single desks to entire floors that can accommodate growing teams."
  },
  {
    id: 8,
    question: "Is parking available at iSprout locations?",
    answer: "Most iSprout centers offer parking facilities. However, availability may vary by location. You can check the specific amenities listed for each center on our website or contact us for details."
  }
];

const Questions = () => {
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

  const toggleQuestion = (id: number) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[36px] md:text-[42px] font-bold font-['Inter',sans-serif] mb-12" style={{ color: COLORS.textPrimary }}>
          Frequently Ask Questions
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - First 4 Questions */}
          <div className="space-y-4">
            {faqData.slice(0, 4).map((faq) => (
              <div 
                key={faq.id}
                className="border-b border-gray-200 pb-4"
              >
                <button
                  onClick={() => toggleQuestion(faq.id)}
                  className="w-full flex items-center justify-between text-left py-3 group focus:outline-none"
                >
                  {/* Question Text */}
                  <p className="text-[16px] md:text-[18px] font-medium font-['Inter',sans-serif] flex-1 pr-4" style={{ color: COLORS.textPrimary }}>
                    {faq.question}
                  </p>

                  {/* Plus/Minus Icon */}
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300" style={{ backgroundColor: '#00275c' }}>
                    <span className="text-white text-xl font-light">
                      {openQuestionId === faq.id ? '−' : '+'}
                    </span>
                  </div>
                </button>
                
                {/* Answer */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openQuestionId === faq.id ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-[14px] md:text-[16px] font-['Inter',sans-serif] pr-4" style={{ color: COLORS.textGray }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Last 4 Questions */}
          <div className="space-y-4">
            {faqData.slice(4, 8).map((faq) => (
              <div 
                key={faq.id}
                className="border-b border-gray-200 pb-4"
              >
                <button
                  onClick={() => toggleQuestion(faq.id)}
                  className="w-full flex items-center justify-between text-left py-3 group focus:outline-none"
                >
                  {/* Question Text */}
                  <p className="text-[16px] md:text-[18px] font-medium font-['Inter',sans-serif] flex-1 pr-4" style={{ color: COLORS.textPrimary }}>
                    {faq.question}
                  </p>

                  {/* Plus/Minus Icon */}
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300" style={{ backgroundColor: '#00275c' }}>
                    <span className="text-white text-xl font-light">
                      {openQuestionId === faq.id ? '−' : '+'}
                    </span>
                  </div>
                </button>
                
                {/* Answer */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openQuestionId === faq.id ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-[14px] md:text-[16px] font-['Inter',sans-serif] pr-4" style={{ color: COLORS.textGray }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questions;
