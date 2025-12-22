import { useState } from 'react';
import faqHero from '../../assets/faq/faq.png';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left gap-4 hover:text-[#204758] transition-colors"
      >
        <span className="text-base md:text-lg font-normal" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {question}
        </span>
        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-2xl font-light">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="mt-3 text-gray-600 text-sm md:text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [feedback, setFeedback] = useState('');

  const faqs = [
    {
      question: 'How long until we deliver your first blog post?',
      answer: 'We typically deliver your first blog post within 2-3 weeks of onboarding, depending on the complexity and requirements.'
    },
    {
      question: 'How long until we deliver your first blog post?',
      answer: 'We typically deliver your first blog post within 2-3 weeks of onboarding, depending on the complexity and requirements.'
    },
    {
      question: 'How long until we deliver your first blog post?',
      answer: 'We typically deliver your first blog post within 2-3 weeks of onboarding, depending on the complexity and requirements.'
    },
    {
      question: 'How long until we deliver your first blog post?',
      answer: 'We typically deliver your first blog post within 2-3 weeks of onboarding, depending on the complexity and requirements.'
    },
    {
      question: 'How long until we deliver your first blog post?',
      answer: 'We typically deliver your first blog post within 2-3 weeks of onboarding, depending on the complexity and requirements.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px] -mt-20">
        <img
          src={faqHero}
          alt="FAQs"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-8 left-8 md:left-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            FAQs
          </h1>
        </div>
      </div>

      {/* FAQ Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
          Frequently Ask Questions
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* FAQ List - Left Side (2 columns) */}
          <div className="lg:col-span-2">
            <div className="space-y-1">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          {/* Feedback Section - Right Side (1 column) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Black Blob with Question Mark */}
              <div className="relative mb-6 flex justify-center">
                <svg
                  className="w-40 h-40 md:w-48 md:h-48"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M140 50C160 70 165 95 160 115C155 135 140 150 120 155C100 160 75 155 55 145C35 135 20 115 15 90C10 65 15 40 35 25C55 10 85 5 105 15C125 25 120 30 140 50Z"
                    fill="#1a1a1a"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl md:text-7xl font-bold text-white">?</span>
                </div>
              </div>

              {/* Text and Input */}
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Any Question?
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  You can ask anything you want to know Feedback
                </p>

                {/* Input with Label */}
                <div className="text-left mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Let me know
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Enter Here"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#204758] focus:border-transparent"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    />
                    {feedback && (
                      <button
                        onClick={() => setFeedback('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
