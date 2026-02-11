import { usePrivacyPolicy } from "../../hooks/usePrivacyPolicy";
import { useMetaTags } from "../../hooks/useMetaTags";
import { COLORS } from "../../helpers/constants/Colors";

const PrivacyPolicy = () => {
	const { data: privacyData, isLoading, isError } = usePrivacyPolicy();

	useMetaTags({
		title: "Privacy Policy | iSprout",
		description: "Read iSprout's privacy policy to understand how we collect, use, and protect your personal information when you use our coworking and managed office services."
	});

	if (isLoading) {
		return (
			<div
				className='min-h-screen flex items-center justify-center'
				style={{ backgroundColor: COLORS.white }}
			>
				<div className='text-center'>
					<p className='text-xl' style={{ color: COLORS.textGray }}>
						Loading Privacy Policy...
					</p>
				</div>
			</div>
		);
	}

	if (isError || !privacyData) {
		return (
			<div
				className='min-h-screen flex items-center justify-center'
				style={{ backgroundColor: COLORS.white }}
			>
				<div className='text-center'>
					<p className='text-xl' style={{ color: COLORS.textGray }}>
						Failed to load Privacy Policy. Please try again later.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div
			className='min-h-screen py-16'
			style={{ backgroundColor: COLORS.white }}
		>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='text-center mb-12'>
					<h1
						className='text-4xl sm:text-5xl font-bold mb-4'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.brandBlue,
						}}
					>
						{privacyData.title}
					</h1>
					<p
						className='text-sm'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.textGray,
						}}
					>
						Last Updated:{" "}
						{new Date(privacyData.lastUpdated).toLocaleDateString(
							"en-US",
							{
								year: "numeric",
								month: "long",
								day: "numeric",
							},
						)}
					</p>
				</div>

				{/* Sections */}
				<div className='space-y-8'>
					{privacyData.sections.map((section, index) => (
						<section key={index} className='space-y-4'>
							<h2
								className='text-2xl font-semibold'
								style={{
									fontFamily: "Outfit, sans-serif",
									color: COLORS.brandBlue,
								}}
							>
								{section.heading}
							</h2>
							<div
								className='text-base leading-relaxed whitespace-pre-line'
								style={{
									fontFamily: "Outfit, sans-serif",
									color: COLORS.textGray,
								}}
								dangerouslySetInnerHTML={{
									__html: section.content,
								}}
							/>
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
						Questions About Privacy?
					</h3>
					<p
						className='text-base'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.textGray,
						}}
					>
						If you have any questions about our Privacy Policy,
						please{" "}
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
	);
};

export default PrivacyPolicy;
