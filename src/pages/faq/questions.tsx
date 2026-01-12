import { useState } from 'react';
import { COLORS } from '../../helpers/constants/Colors';
import questionIcon from '../../assets/faq/faq-blob.png';

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
  const [feedbackInput, setFeedbackInput] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const toggleQuestion = (id: number) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  const handleFeedbackSubmit = () => {
    if (feedbackInput.trim()) {
      console.log('Feedback submitted:', feedbackInput);
      setFeedbackInput('');
      setShowSuccessMessage(true);
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      // Add your feedback submission logic here
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - FAQ Questions */}
          <div className="space-y-6">
            <h2 className="text-[36px] md:text-[42px] font-bold font-['Inter',sans-serif] mb-12" style={{ color: COLORS.textPrimary }}>
              Frequently Ask Questions
            </h2>
            
            <div className="space-y-4">
              {faqData.map((faq) => (
                <div 
                  key={faq.id}
                  className="border-b border-gray-200 pb-4"
                >
                  <button
                    onClick={() => toggleQuestion(faq.id)}
                    className="w-full flex items-center justify-between text-left py-3 group"
                  >
                    {/* Question Text */}
                    <p className="text-[16px] md:text-[18px] font-medium font-['Inter',sans-serif] flex-1 pr-4" style={{ color: COLORS.textPrimary }}>
                      {faq.question}
                    </p>

                    {/* Plus/Minus Icon */}
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0 transition-transform duration-300">
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

          {/* Right Side - Question Icon and Feedback */}
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Question Mark Blob */}
            <div className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              <img 
                src={questionIcon} 
                alt="Question Mark" 
                className="w-full h-full object-contain"
              />
            </div>

            {/* Any Question Section */}
            <div className="w-full max-w-md space-y-4">
              <h3 className="text-[28px] md:text-[32px] font-bold font-['Inter',sans-serif] text-center" style={{ color: COLORS.textPrimary }}>
                Any Question?
              </h3>
              <p className="text-[14px] md:text-[16px] font-['Inter',sans-serif] text-center" style={{ color: COLORS.textGray }}>
                You can ask anything you want to know Feedback
              </p>

              {/* Feedback Input */}
              <div className="relative">
                <label className="block text-[14px] font-medium font-['Inter',sans-serif] mb-2" style={{ color: COLORS.textPrimary }}>
                  Let me know
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={feedbackInput}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleFeedbackSubmit();
                      }
                    }}
                    placeholder="Enter Here"
                    className="w-full h-12 border border-gray-300 rounded-lg pl-4 pr-14 focus:outline-none focus:ring-2 focus:ring-[#00275c] focus:border-transparent font-['Inter',sans-serif] text-[14px]"
                  />
                  <button
                    onClick={handleFeedbackSubmit}
                    disabled={!feedbackInput.trim()}
                    type="button"
                    className="absolute right-2 disabled:cursor-not-allowed cursor-pointer bg-transparent border-0 p-0 m-0"
                  >
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors">
                      <svg className="w-4 h-4 rotate-90 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                  </button>
                </div>
                {/* Success Message */}
                {showSuccessMessage && (
                  <p className="text-[12px] font-['Inter',sans-serif] text-green-600 mt-2 transition-opacity duration-300">
                    ✓ Message sent successfully!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questions;
