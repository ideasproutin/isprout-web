import { useState } from "react";
import { COLORS } from "../../helpers/constants/Colors";
import faqsData from "../../content/faq's.json";

interface FAQItem {
	question: string;
	answer: string;
}

const faqData: FAQItem[] = faqsData;

const Questions = () => {
	const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

	const toggleQuestion = (id: number) => {
		setOpenQuestionId(openQuestionId === id ? null : id);
	};

	return (
		<section className='py-16 px-4 md:px-8 lg:px-16 bg-white'>
			<style>{`
        .faq-item-button {
          transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border-radius: 12px;
          padding: 20px 24px;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }

        .faq-item-button:focus {
          outline: none !important;
          background-color: rgba(0, 38, 92, 0.05);
          border: none !important;
          box-shadow: none !important;
        }

        .faq-item-button:hover {
          background-color: rgba(0, 38, 92, 0.03);
          border: none !important;
        }

        .faq-item-button.active {
          background-color: rgba(0, 38, 92, 0.08);
          border: none !important;
        }

        .faq-icon {
          transition: transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .faq-item-button.active .faq-icon {
          transform: rotate(180deg);
        }

        .faq-answer {
          overflow: hidden;
          transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border: none !important;
        }
      `}</style>

			<div className='max-w-7xl mx-auto'>
				<h2
					className="text-[36px] md:text-[42px] font-bold font-['Inter',sans-serif] mb-12"
					style={{ color: COLORS.textPrimary }}
				>
					Frequently Ask Questions
				</h2>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
					{/* Left Column - First Half of Questions */}
					<div className='space-y-3'>
						{faqData
							.slice(0, Math.ceil(faqData.length / 2))
							.map((faq, index) => (
								<div key={index}>
									<button
										onClick={() => toggleQuestion(index)}
										className={`faq-item-button w-full flex items-center justify-between text-left ${
											openQuestionId === index
												? "active"
												: ""
										}`}
										style={{
											backgroundColor:
												openQuestionId === index
													? "rgba(0, 38, 92, 0.08)"
													: "transparent",
										}}
									>
										{/* Question Text */}
										<p
											className="text-[16px] md:text-[18px] font-semibold font-['Inter',sans-serif] flex-1 pr-4"
											style={{
												color: COLORS.textPrimary,
											}}
										>
											{faq.question}
										</p>

										{/* Plus/Minus Icon */}
										<div className='faq-icon w-6 h-6 flex items-center justify-center shrink-0'>
											<svg
												width='20'
												height='20'
												viewBox='0 0 24 24'
												fill='none'
												stroke='#00275c'
												strokeWidth='2'
												strokeLinecap='round'
											>
												<line
													x1='12'
													y1='5'
													x2='12'
													y2='19'
												/>
												<line
													x1='5'
													y1='12'
													x2='19'
													y2='12'
												/>
											</svg>
										</div>
									</button>

									{/* Answer */}
									<div
										className={`faq-answer ${
											openQuestionId === index
												? "max-h-96 opacity-100"
												: "max-h-0 opacity-0"
										}`}
									>
										<p
											className="text-[14px] md:text-[16px] font-['Inter',sans-serif] px-6 py-4"
											style={{ color: COLORS.textGray }}
										>
											{faq.answer}
										</p>
									</div>
								</div>
							))}
					</div>

					{/* Right Column - Last Half of Questions */}
					<div className='space-y-3'>
						{faqData
							.slice(Math.ceil(faqData.length / 2))
							.map((faq, index) => {
								const actualIndex =
									Math.ceil(faqData.length / 2) + index;
								return (
									<div key={actualIndex}>
										<button
											onClick={() =>
												toggleQuestion(actualIndex)
											}
											className={`faq-item-button w-full flex items-center justify-between text-left ${
												openQuestionId === actualIndex
													? "active"
													: ""
											}`}
											style={{
												backgroundColor:
													openQuestionId ===
													actualIndex
														? "rgba(0, 38, 92, 0.08)"
														: "transparent",
											}}
										>
											{/* Question Text */}
											<p
												className="text-[16px] md:text-[18px] font-semibold font-['Inter',sans-serif] flex-1 pr-4"
												style={{
													color: COLORS.textPrimary,
												}}
											>
												{faq.question}
											</p>

											{/* Plus/Minus Icon */}
											<div className='faq-icon w-6 h-6 flex items-center justify-center shrink-0'>
												<svg
													width='20'
													height='20'
													viewBox='0 0 24 24'
													fill='none'
													stroke='#00275c'
													strokeWidth='2'
													strokeLinecap='round'
												>
													<line
														x1='12'
														y1='5'
														x2='12'
														y2='19'
													/>
													<line
														x1='5'
														y1='12'
														x2='19'
														y2='12'
													/>
												</svg>
											</div>
										</button>

										{/* Answer */}
										<div
											className={`faq-answer ${
												openQuestionId === actualIndex
													? "max-h-96 opacity-100"
													: "max-h-0 opacity-0"
											}`}
										>
											<p
												className="text-[14px] md:text-[16px] font-['Inter',sans-serif] px-6 py-4"
												style={{
													color: COLORS.textGray,
												}}
											>
												{faq.answer}
											</p>
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Questions;
