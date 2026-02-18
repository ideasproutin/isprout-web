import React from "react";
import { useCancellationPolicy } from "../../hooks/useCancellationPolicy";
import { useMetaTags } from "../../hooks/useMetaTags";
import { COLORS } from "../../helpers/constants/Colors";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import type { CancellationPolicySection } from "../../services/cancellationPolicyApi";

const CancellationPolicy = () => {
	const {
		data: cancellationData,
		isLoading,
		isError,
	} = useCancellationPolicy();

	useMetaTags({
		title: "Cancellation Policy | iSprout",
		description:
			"Read iSprout's cancellation policy to understand our terms for cancellations, refunds, and modifications of bookings for coworking and managed office services.",
	});

	const renderSectionContent = (section: CancellationPolicySection) => {
		const elements: React.JSX.Element[] = [];

		// Render introduction if present
		if (section.introduction) {
			elements.push(
				<p
					key='intro'
					className='mb-4'
					style={{
						fontFamily: "Outfit, sans-serif",
						color: COLORS.textGray,
					}}
				>
					{section.introduction}
				</p>,
			);
		}

		// Render definitions
		if (section.definitions && section.definitions.length > 0) {
			elements.push(
				<ul key='definitions' className='list-disc pl-6 space-y-2'>
					{section.definitions.map((def, idx) => (
						<li
							key={idx}
							style={{
								fontFamily: "Outfit, sans-serif",
								color: COLORS.textGray,
							}}
						>
							<strong>{def.term}:</strong> {def.definition}
						</li>
					))}
				</ul>,
			);
		}

		// Render information types
		if (section.informationTypes && section.informationTypes.length > 0) {
			elements.push(
				<ul key='infoTypes' className='list-disc pl-6 space-y-1 mb-4'>
					{section.informationTypes.map((type, idx) => (
						<li
							key={idx}
							style={{
								fontFamily: "Outfit, sans-serif",
								color: COLORS.textGray,
							}}
						>
							{type}
						</li>
					))}
				</ul>,
			);
		}

		// Render collection methods
		if (section.collectionMethods && section.collectionMethods.length > 0) {
			elements.push(
				<div key='collectionMethods' className='mb-4'>
					<p
						className='mb-2'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.textGray,
						}}
					>
						We may collect this information:
					</p>
					<ul className='list-disc pl-6 space-y-1'>
						{section.collectionMethods.map((method, idx) => (
							<li
								key={idx}
								style={{
									fontFamily: "Outfit, sans-serif",
									color: COLORS.textGray,
								}}
							>
								{method}
							</li>
						))}
					</ul>
				</div>,
			);
		}

		// Render categories
		if (section.categories && section.categories.length > 0) {
			elements.push(
				<div key='categories' className='space-y-6'>
					{section.categories.map((cat, idx) => (
						<div
							key={idx}
							className='pl-4 border-l-2'
							style={{ borderColor: COLORS.brandBlue }}
						>
							<h4
								className='text-lg font-semibold mb-2'
								style={{
									fontFamily: "Outfit, sans-serif",
									color: COLORS.brandBlue,
								}}
							>
								{cat.categoryLabel}. {cat.categoryTitle}
							</h4>
							<p
								className='mb-3'
								style={{
									fontFamily: "Outfit, sans-serif",
									color: COLORS.textGray,
								}}
							>
								{cat.description}
							</p>
							{cat.dataPoints && cat.dataPoints.length > 0 && (
								<ul className='list-disc pl-6 space-y-2 mb-3'>
									{cat.dataPoints.map((dp, dpIdx) => (
										<li
											key={dpIdx}
											style={{
												fontFamily:
													"Outfit, sans-serif",
												color: COLORS.textGray,
											}}
										>
											<strong>{dp.type}:</strong>{" "}
											{dp.details}
										</li>
									))}
								</ul>
							)}
							{cat.usage && (
								<p
									className='mb-3'
									style={{
										fontFamily: "Outfit, sans-serif",
										color: COLORS.textGray,
									}}
								>
									{cat.usage}
								</p>
							)}
							{cat.cookieControl &&
								cat.cookieControl.length > 0 && (
									<div className='space-y-2'>
										{cat.cookieControl.map((cc, ccIdx) => (
											<p
												key={ccIdx}
												style={{
													fontFamily:
														"Outfit, sans-serif",
													color: COLORS.textGray,
												}}
											>
												{cc}
											</p>
										))}
									</div>
								)}
						</div>
					))}
				</div>,
			);
		}

		// Render commitment
		if (section.commitment) {
			elements.push(
				<p
					key='commitment'
					className='mb-4'
					style={{
						fontFamily: "Outfit, sans-serif",
						color: COLORS.textGray,
					}}
				>
					{section.commitment}
				</p>,
			);
		}

		// Render purposes
		if (section.purposes && section.purposes.length > 0) {
			elements.push(
				<ul key='purposes' className='list-disc pl-6 space-y-1 mb-4'>
					{section.purposes.map((purpose, idx) => (
						<li
							key={idx}
							style={{
								fontFamily: "Outfit, sans-serif",
								color: COLORS.textGray,
							}}
						>
							{purpose}
						</li>
					))}
				</ul>,
			);
		}

		// Render additional use
		if (section.additionalUse) {
			elements.push(
				<p
					key='additionalUse'
					className='mb-4'
					style={{
						fontFamily: "Outfit, sans-serif",
						color: COLORS.textGray,
					}}
				>
					{section.additionalUse}
				</p>,
			);
		}

		// Render retention policy
		if (section.retentionPolicy) {
			elements.push(
				<p
					key='retentionPolicy'
					className='mb-4'
					style={{
						fontFamily: "Outfit, sans-serif",
						color: COLORS.textGray,
					}}
				>
					{section.retentionPolicy}
				</p>,
			);
		}

		// Render disclosure types
		if (section.disclosureTypes && section.disclosureTypes.length > 0) {
			elements.push(
				<div key='disclosureTypes' className='space-y-4'>
					{section.disclosureTypes.map((dt, idx) => (
						<div
							key={idx}
							className='pl-4 border-l-2'
							style={{ borderColor: COLORS.brandBlue }}
						>
							<h4
								className='text-lg font-semibold mb-2'
								style={{
									fontFamily: "Outfit, sans-serif",
									color: COLORS.brandBlue,
								}}
							>
								{dt.category}
							</h4>
							{dt.description && (
								<p
									className='mb-2'
									style={{
										fontFamily: "Outfit, sans-serif",
										color: COLORS.textGray,
									}}
								>
									{dt.description}
								</p>
							)}
							{dt.recipients && dt.recipients.length > 0 && (
								<ul className='list-disc pl-6 space-y-1'>
									{dt.recipients.map((recipient, rIdx) => (
										<li
											key={rIdx}
											style={{
												fontFamily:
													"Outfit, sans-serif",
												color: COLORS.textGray,
											}}
										>
											{recipient}
										</li>
									))}
								</ul>
							)}
						</div>
					))}
				</div>,
			);
		}

		// Render simple content (string or array of strings)
		if (section.content) {
			if (Array.isArray(section.content)) {
				elements.push(
					<div key='content' className='space-y-3'>
						{section.content.map((paragraph, idx) => (
							<p
								key={idx}
								style={{
									fontFamily: "Outfit, sans-serif",
									color: COLORS.textGray,
								}}
							>
								{paragraph}
							</p>
						))}
					</div>,
				);
			} else {
				elements.push(
					<p
						key='content'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.textGray,
						}}
					>
						{section.content}
					</p>,
				);
			}
		}

		return elements;
	};

	if (isLoading) {
		return (
			<div
				className='min-h-screen flex items-center justify-center'
				style={{ backgroundColor: COLORS.white }}
			>
				<div className='text-center'>
					<p className='text-xl' style={{ color: COLORS.textGray }}>
						Loading Cancellation Policy...
					</p>
				</div>
			</div>
		);
	}

	if (isError || !cancellationData) {
		return (
			<div
				className='min-h-screen flex items-center justify-center'
				style={{ backgroundColor: COLORS.white }}
			>
				<div className='text-center'>
					<p className='text-xl' style={{ color: COLORS.textGray }}>
						Failed to load Cancellation Policy. Please try again
						later.
					</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<div
				className='min-h-screen pt-32 pb-16'
				style={{ backgroundColor: COLORS.white }}
			>
				<div className='max-w-6xl mx-auto px-8 md:px-12 lg:px-16'>
					{/* Main Heading */}
					<h1
						className='text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.brandBlue,
						}}
					>
						Cancellation Policy
					</h1>

					{/* Introduction Section */}
					{cancellationData.introduction && (
						<div className='mb-12'>
							<h2
								className='text-2xl font-semibold mb-4'
								style={{
									fontFamily: "Outfit, sans-serif",
									color: COLORS.brandBlue,
								}}
							>
								{cancellationData.introduction.heading}
							</h2>
							<div className='space-y-4'>
								{cancellationData.introduction.paragraphs?.map(
									(paragraph, idx) => (
										<p
											key={idx}
											style={{
												fontFamily:
													"Outfit, sans-serif",
												color: COLORS.textGray,
											}}
										>
											{paragraph}
										</p>
									),
								)}
							</div>
							{cancellationData.introduction.policyScope && (
								<div className='mt-4'>
									<p
										className='mb-2'
										style={{
											fontFamily: "Outfit, sans-serif",
											color: COLORS.textGray,
										}}
									>
										This Cancellation Policy contains:
									</p>
									<ul className='list-disc pl-6 space-y-1'>
										{cancellationData.introduction.policyScope.map(
											(item, idx) => (
												<li
													key={idx}
													style={{
														fontFamily:
															"Outfit, sans-serif",
														color: COLORS.textGray,
													}}
												>
													{item}
												</li>
											),
										)}
									</ul>
								</div>
							)}
							{cancellationData.introduction.applicability && (
								<p
									className='mt-4'
									style={{
										fontFamily: "Outfit, sans-serif",
										color: COLORS.textGray,
									}}
								>
									{
										cancellationData.introduction
											.applicability
									}
								</p>
							)}
							{cancellationData.introduction.consent && (
								<p
									className='mt-4'
									style={{
										fontFamily: "Outfit, sans-serif",
										color: COLORS.textGray,
									}}
								>
									{cancellationData.introduction.consent}
								</p>
							)}
						</div>
					)}

					{/* Sections */}
					<div className='space-y-8'>
						{cancellationData.sections?.map((section, index) => (
							<section key={index} className='space-y-4'>
								<h2
									className='text-2xl font-semibold'
									style={{
										fontFamily: "Outfit, sans-serif",
										color: COLORS.brandBlue,
									}}
								>
									{section.title}
								</h2>
								<div className='text-base leading-relaxed'>
									{renderSectionContent(section)}
								</div>
							</section>
						))}
					</div>

					{/* Contact Section */}
					<div
						className='mt-12 p-6 rounded-lg'
						style={{
							backgroundColor: "rgba(0, 39, 92, 0.05)",
							borderLeft: `4px solid ${COLORS.brandBlue}`,
						}}
					>
						<h3
							className='text-xl font-semibold mb-3'
							style={{
								fontFamily: "Outfit, sans-serif",
								color: COLORS.brandBlue,
							}}
						>
							Questions About Cancellation?
						</h3>
						<p
							className='text-base'
							style={{
								fontFamily: "Outfit, sans-serif",
								color: COLORS.textGray,
							}}
						>
							If you have any questions about our Cancellation
							Policy, please{" "}
							<a
								href='/contact'
								className='font-semibold hover:underline'
								style={{ color: COLORS.brandBlue }}
							>
								contact us
							</a>
							.
						</p>
					</div>
				</div>
			</div>
			<Footer />
			<ScrollToTop />
		</>
	);
};

export default CancellationPolicy;
